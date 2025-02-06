import React, { useState } from 'react';
import Lottie from 'lottie-react';
import FileUpload from '../components/FileUpload';
import StatsPanel from '../components/StatsPanel';
import DataVisualizer from '../components/DataVisualizer';
import AnalysisControls from '../components/AnalysisControls';
import musicAnimation from '../assets/music-animation.json';

const Index = () => {
  const [data, setData] = useState<any>(null);
  const [timeRange, setTimeRange] = useState(30);
  const [displayMode, setDisplayMode] = useState<'artists' | 'tracks' | 'time'>('artists');
  const [minPlayCount, setMinPlayCount] = useState(5);

  const processData = (jsonData: any[]) => {
    // Filter data based on time range (convert ms to days)
    const now = new Date();
    const filteredData = jsonData.filter(item => {
      const itemDate = new Date(item.ts);
      const diffTime = Math.abs(now.getTime() - itemDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= timeRange;
    });

    // Convert ms_played to minutes
    const totalMinutes = filteredData.reduce((acc, curr) => acc + (curr.ms_played / 60000), 0);
    
    // Aggregate artists with minimum play count filter
    const artistCounts = filteredData.reduce((acc: any, curr) => {
      const artist = curr.master_metadata_album_artist_name;
      if (artist) {
        acc[artist] = (acc[artist] || 0) + 1;
      }
      return acc;
    }, {});

    // Aggregate tracks with minimum play count filter
    const trackCounts = filteredData.reduce((acc: any, curr) => {
      const track = curr.master_metadata_track_name;
      if (track) {
        acc[track] = (acc[track] || 0) + 1;
      }
      return acc;
    }, {});

    // Convert to arrays and filter by minimum play count
    const topArtists = Object.entries(artistCounts)
      .map(([name, count]) => ({ name, count }))
      .filter(item => item.count >= minPlayCount)
      .sort((a: any, b: any) => b.count - a.count);

    const topTracks = Object.entries(trackCounts)
      .map(([name, count]) => ({ name, count }))
      .filter(item => item.count >= minPlayCount)
      .sort((a: any, b: any) => b.count - a.count);

    // Prepare chart data based on display mode
    let chartData;
    switch (displayMode) {
      case 'artists':
        chartData = topArtists.slice(0, 10).map(artist => ({
          name: artist.name,
          value: artist.count,
        }));
        break;
      case 'tracks':
        chartData = topTracks.slice(0, 10).map(track => ({
          name: track.name,
          value: track.count,
        }));
        break;
      case 'time':
        // Group by days for time-based visualization
        const timeData = filteredData.reduce((acc: any, curr) => {
          const date = new Date(curr.ts).toLocaleDateString();
          acc[date] = (acc[date] || 0) + (curr.ms_played / 60000);
          return acc;
        }, {});
        chartData = Object.entries(timeData).map(([date, minutes]) => ({
          name: date,
          value: Math.round(minutes as number),
        }));
        break;
    }

    setData({
      totalMinutes,
      topArtists,
      topTracks,
      chartData,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Spotify Listening Analysis
      </h1>
      
      {!data ? (
        <div className="space-y-8">
          <FileUpload onFileUpload={processData} />
          <div className="w-64 mx-auto">
            <Lottie animationData={musicAnimation} loop={true} />
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-fade-in">
          <AnalysisControls
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            displayMode={displayMode}
            setDisplayMode={setDisplayMode}
            minPlayCount={minPlayCount}
            setMinPlayCount={setMinPlayCount}
          />
          <StatsPanel
            totalMinutes={data.totalMinutes}
            topArtists={data.topArtists}
            topTracks={data.topTracks}
          />
          <DataVisualizer data={data.chartData} />
        </div>
      )}
    </div>
  );
};

export default Index;