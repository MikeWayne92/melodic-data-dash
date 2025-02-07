
import React from 'react';
import { Clock, Music, User } from 'lucide-react';

interface StatsPanelProps {
  totalMinutes: number;
  topArtists: { name: string; count: number }[];
  topTracks: { name: string; count: number; trackId?: string }[];
  onTrackSelect?: (trackId: string) => void;
}

const StatsPanel = ({ totalMinutes, topArtists, topTracks, onTrackSelect }: StatsPanelProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="neomorph p-6">
        <div className="flex items-center mb-4">
          <Clock className="w-6 h-6 text-mint-dark mr-2" />
          <h3 className="text-lg font-semibold">Total Listening Time</h3>
        </div>
        <p className="text-3xl font-bold text-mint-dark">
          {Math.round(totalMinutes)} mins
        </p>
      </div>

      <div className="neomorph p-6">
        <div className="flex items-center mb-4">
          <User className="w-6 h-6 text-mint-dark mr-2" />
          <h3 className="text-lg font-semibold">Top Artists</h3>
        </div>
        <ul className="space-y-2">
          {topArtists.slice(0, 3).map((artist, index) => (
            <li key={index} className="flex justify-between">
              <span>{artist.name}</span>
              <span className="text-mint-dark">{artist.count} plays</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="neomorph p-6">
        <div className="flex items-center mb-4">
          <Music className="w-6 h-6 text-mint-dark mr-2" />
          <h3 className="text-lg font-semibold">Top Tracks</h3>
        </div>
        <ul className="space-y-2">
          {topTracks.slice(0, 3).map((track, index) => (
            <li 
              key={index} 
              className="flex justify-between cursor-pointer hover:bg-neogray-dark p-2 rounded transition-colors"
              onClick={() => track.trackId && onTrackSelect?.(track.trackId)}
            >
              <span>{track.name}</span>
              <span className="text-mint-dark">{track.count} plays</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StatsPanel;
