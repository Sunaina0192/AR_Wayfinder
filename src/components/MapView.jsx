import React from 'react';
import { campusLocations, pathGraph, getLocationById } from '../data/locations';

const MapView = ({ selectedLocation, activePath = [], onLocationSelect }) => {
  // SVG ViewBox settings
  const width = 400;
  const height = 300;

  // Render paths between locations
  const renderPathEdges = () => {
    const edges = [];
    const seen = new Set();

    Object.entries(pathGraph).forEach(([id, data]) => {
      const startLoc = getLocationById(id);
      if (!startLoc) return;

      data.neighbors.forEach(neighborId => {
        const endLoc = getLocationById(neighborId);
        if (!endLoc) return;

        const edgeKey = [id, neighborId].sort().join('-');
        
        if (!seen.has(edgeKey)) {
          seen.add(edgeKey);
          
          // Check if this edge is part of the active path
          let isActive = false;
          for (let i = 0; i < activePath.length - 1; i++) {
            if (
              (activePath[i] === id && activePath[i+1] === neighborId) ||
              (activePath[i] === neighborId && activePath[i+1] === id)
            ) {
              isActive = true;
              break;
            }
          }

          edges.push(
            <line
              key={edgeKey}
              x1={startLoc.coordinates.x}
              y1={startLoc.coordinates.y}
              x2={endLoc.coordinates.x}
              y2={endLoc.coordinates.y}
              stroke={isActive ? '#3B82F6' : '#E2E8F0'}
              strokeWidth={isActive ? 4 : 2}
              strokeDasharray={isActive ? "0" : "4 2"}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          );
        }
      });
    });

    return edges;
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 overflow-hidden relative">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">🗺️ Campus Interactive Map</h3>
          <p className="text-gray-500 text-sm">Click on any location to view details</p>
        </div>
        <div className="flex gap-4 text-xs font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full shadow-sm"></div>
            <span className="text-gray-600">Active Path</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-200 rounded-full shadow-sm"></div>
            <span className="text-gray-600">Routes</span>
          </div>
        </div>
      </div>

      <div className="relative aspect-[4/3] bg-linear-to-br from-gray-50 to-white rounded-2xl border border-gray-200 shadow-inner overflow-hidden">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-full"
        >
          {/* Background Grid */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1"/>
            </pattern>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
              <feOffset dx="0" dy="1" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Path Edges */}
          {renderPathEdges()}

          {/* Location Nodes */}
          {campusLocations.map((loc) => {
            const isSelected = selectedLocation === loc.id;
            const isPathNode = activePath.includes(loc.id);

            return (
              <g 
                key={loc.id} 
                className="cursor-pointer group"
                onClick={() => onLocationSelect && onLocationSelect(loc.id)}
              >
                {/* Selection Halo */}
                {isSelected && (
                  <circle
                    cx={loc.coordinates.x}
                    cy={loc.coordinates.y}
                    r="15"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    className="animate-pulse"
                  />
                )}
                
                {/* Node Circle */}
                <circle
                  cx={loc.coordinates.x}
                  cy={loc.coordinates.y}
                  r={isSelected ? 10 : 7}
                  fill={isSelected ? '#3B82F6' : isPathNode ? '#60A5FA' : '#CBD5E1'}
                  className="transition-all duration-300 group-hover:fill-blue-400 group-hover:scale-110"
                  filter="url(#shadow)"
                />
                
                {/* Label (Visible on hover or selection) */}
                <g className={`transition-all duration-300 pointer-events-none ${isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                  <rect
                    x={loc.coordinates.x - 45}
                    y={loc.coordinates.y - 35}
                    width="90"
                    height="22"
                    rx="6"
                    fill="rgba(30, 41, 56, 0.95)"
                    className="shadow-xl"
                  />
                  <text
                    x={loc.coordinates.x}
                    y={loc.coordinates.y - 19}
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    fontWeight="700"
                    className="select-none"
                  >
                    {loc.name}
                  </text>
                  <path
                    d={`M ${loc.coordinates.x - 4} ${loc.coordinates.y - 13} L ${loc.coordinates.x} ${loc.coordinates.y - 9} L ${loc.coordinates.x + 4} ${loc.coordinates.y - 13}`}
                    fill="rgba(30, 41, 56, 0.95)"
                  />
                </g>

                {/* Emoji Indicator */}
                {isSelected && (
                  <text
                    x={loc.coordinates.x}
                    y={loc.coordinates.y + 30}
                    textAnchor="middle"
                    fontSize="20"
                    className="select-none pointer-events-none animate-bounce"
                  >
                    {loc.icon}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Legend Overlay */}
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-2 rounded-xl border border-white/50 shadow-sm">
           <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-[10px] font-bold text-gray-700">DESTINATION</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                <span className="text-[10px] font-bold text-gray-500">BUILDING</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
