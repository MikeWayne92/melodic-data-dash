import React from 'react';
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface AnalysisControlsProps {
  timeRange: number;
  setTimeRange: (value: number) => void;
  displayMode: 'artists' | 'tracks' | 'time';
  setDisplayMode: (value: 'artists' | 'tracks' | 'time') => void;
  minPlayCount: number;
  setMinPlayCount: (value: number) => void;
}

const AnalysisControls = ({
  timeRange,
  setTimeRange,
  displayMode,
  setDisplayMode,
  minPlayCount,
  setMinPlayCount
}: AnalysisControlsProps) => {
  return (
    <div className="neomorph p-6 mb-6 space-y-6">
      <div className="space-y-2">
        <Label>Time Range (days)</Label>
        <Slider
          value={[timeRange]}
          onValueChange={(value) => setTimeRange(value[0])}
          max={365}
          min={1}
          step={1}
          className="w-full"
        />
        <span className="text-sm text-gray-600">{timeRange} days</span>
      </div>

      <div className="space-y-2">
        <Label>Minimum Play Count</Label>
        <Slider
          value={[minPlayCount]}
          onValueChange={(value) => setMinPlayCount(value[0])}
          max={50}
          min={1}
          step={1}
          className="w-full"
        />
        <span className="text-sm text-gray-600">Min. {minPlayCount} plays</span>
      </div>

      <div className="space-y-2">
        <Label>Display Mode</Label>
        <RadioGroup
          value={displayMode}
          onValueChange={(value: 'artists' | 'tracks' | 'time') => setDisplayMode(value)}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="artists" id="artists" />
            <Label htmlFor="artists">Artists</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="tracks" id="tracks" />
            <Label htmlFor="tracks">Tracks</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="time" id="time" />
            <Label htmlFor="time">Time</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default AnalysisControls;