import React from 'react';
import { X } from 'lucide-react';

interface ColorPickerProps {
  onSelect: (color: string) => void;
  onClose: () => void;
  type: 'text' | 'background';
}

const PRESET_COLORS = [
  '#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#FFFFFF',
  '#FF0000', '#FF6600', '#FFCC00', '#FFFF00', '#CCFF00', '#66FF00',
  '#00FF00', '#00FF66', '#00FFCC', '#00FFFF', '#00CCFF', '#0066FF',
  '#0000FF', '#6600FF', '#CC00FF', '#FF00FF', '#FF00CC', '#FF0066',
  '#8B0000', '#A0522D', '#D2691E', '#FF4500', '#FF8C00', '#FFA500',
  '#FFD700', '#FFFF00', '#ADFF2F', '#7FFF00', '#32CD32', '#00FF00',
  '#00FA9A', '#00CED1', '#00BFFF', '#1E90FF', '#0000FF', '#4169E1',
  '#8A2BE2', '#9400D3', '#FF1493', '#DC143C', '#B22222', '#800080'
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ onSelect, onClose, type }) => {
  return (
    <div className="absolute top-full left-0 z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-64">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">
          {type === 'text' ? 'Text Color' : 'Background Color'}
        </h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <X size={16} />
        </button>
      </div>

      <div className="grid grid-cols-6 gap-2 mb-4">
        {PRESET_COLORS.map((color) => (
          <button
            key={color}
            onClick={() => onSelect(color)}
            className="w-8 h-8 rounded-md border border-gray-300 hover:scale-110 transition-transform duration-200"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>

      <div className="border-t border-gray-200 pt-3">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Custom Color
        </label>
        <input
          type="color"
          onChange={(e) => onSelect(e.target.value)}
          className="w-full h-10 rounded-md border border-gray-300 cursor-pointer"
        />
      </div>
    </div>
  );
};