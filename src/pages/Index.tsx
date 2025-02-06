import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import StatsPanel from '../components/StatsPanel';
import DataVisualizer from '../components/DataVisualizer';

const Index = () => {
  const [data, setData] = useState<any>(null);

  const processData = (jsonData: any[]) => {
    // Convert ms_played to minutes and aggregate data
    const totalMinutes = jsonData.reduce((acc, curr) => acc + (curr.ms_played / 60000), 0);
    
    // Aggregate artists
    const artistCounts = jsonData.reduce((acc: any, curr) => {
      const artist = curr.master_metadata_album_artist_name;
      if (artist) {
        acc[artist] = (acc[artist] || 0) + 1;
      }
      return acc;
    }, {});

    // Aggregate tracks
    const trackCounts = jsonData.reduce((acc: any, curr) => {
      const track = curr.master_metadata_track_name;
      if (track) {
        acc[track] = (acc[track] || 0) + 1;
      }
      return acc;
    }, {});

    // Convert to arrays and sort
    const topArtists = Object.entries(artistCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a: any, b: any) => b.count - a.count);

    const topTracks = Object.entries(trackCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a: any, b: any) => b.count - a.count);

    // Prepare chart data
    const chartData = topTracks.slice(0, 10).map(track => ({
      name: track.name,
      value: track.count,
    }));

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
        <FileUpload onFileUpload={processData} />
      ) : (
        <div className="space-y-8">
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