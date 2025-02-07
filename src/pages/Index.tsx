
import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import StatsPanel from '../components/StatsPanel';
import MusicPlayer from '../components/MusicPlayer';
import AnalysisControls from '../components/AnalysisControls';

interface SpotifyData {
  ts: string;
  ms_played: number;
  master_metadata_album_artist_name: string;
  master_metadata_track_name: string;
  spotify_track_uri?: string;
}

interface ProcessedData {
  totalMinutes: number;
  topArtists: { name: string; count: number }[];
  topTracks: { name: string; count: number; trackId?: string }[];
}

const Index = () => {
  const [data, setData] = useState<ProcessedData | null>(null);
  const [timeRange, setTimeRange] = useState(30);
  const [displayMode, setDisplayMode] = useState<'artists' | 'tracks' | 'time'>('artists');
  const [minPlayCount, setMinPlayCount] = useState(5);
  const [selectedTrackId, setSelectedTrackId] = useState<string>();

  const processData = (jsonData: SpotifyData[]) => {
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
    
    // Aggregate artists
    const artistCounts = filteredData.reduce((acc: Record<string, number>, curr) => {
      const artist = curr.master_metadata_album_artist_name;
      if (artist) {
        acc[artist] = (acc[artist] || 0) + 1;
      }
      return acc;
    }, {});

    // Aggregate tracks
    const trackData = filteredData.reduce((acc: Record<string, { count: number; trackId?: string }>, curr) => {
      const track = curr.master_metadata_track_name;
      if (track) {
        if (!acc[track]) {
          acc[track] = {
            count: 0,
            trackId: curr.spotify_track_uri?.split(':')[2], // Extract track ID from URI
          };
        }
        acc[track].count += 1;
      }
      return acc;
    }, {});

    // Convert to arrays and filter by minimum play count
    const topArtists = Object.entries(artistCounts)
      .map(([name, count]) => ({ name, count }))
      .filter(item => item.count >= minPlayCount)
      .sort((a, b) => b.count - a.count);

    const topTracks = Object.entries(trackData)
      .map(([name, data]) => ({ 
        name, 
        count: data.count,
        trackId: data.trackId 
      }))
      .filter(item => item.count >= minPlayCount)
      .sort((a, b) => b.count - a.count);

    setData({
      totalMinutes,
      topArtists,
      topTracks,
    });

    // Set the first track as selected if available
    if (topTracks.length > 0 && topTracks[0].trackId) {
      setSelectedTrackId(topTracks[0].trackId);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Spotify Listening Analysis
      </h1>
      
      {!data ? (
        <div className="space-y-8">
          <FileUpload onFileUpload={processData} />
          <div className="w-64 mx-auto animate-pulse bg-neogray-dark h-64 rounded-full" />
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
            onTrackSelect={(trackId) => setSelectedTrackId(trackId)}
          />
          <MusicPlayer trackId={selectedTrackId} />
        </div>
      )}
    </div>
  );
};

export default Index;
