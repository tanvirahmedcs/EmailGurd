import React, { useState } from 'react';
import { mockDetectionRates, mockThreatTimeline, mockThreatsByType } from '../data/mockData';

const ThreatChart: React.FC = () => {
  const [activeChart, setActiveChart] = useState<'timeline' | 'types' | 'detection'>('timeline');
  
  const renderTimelineChart = () => {
    const maxValue = Math.max(...mockThreatTimeline.map(item => item.value));
    
    // Group by date and category
    const groupedData: Record<string, Record<string, number>> = {};
    mockThreatTimeline.forEach(item => {
      if (!groupedData[item.date]) {
        groupedData[item.date] = {};
      }
      if (item.category) {
        groupedData[item.date][item.category] = item.value;
      }
    });
    
    const dates = Object.keys(groupedData).sort();
    
    return (
      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end">
          {dates.map((date, dateIndex) => (
            <div 
              key={date}
              className="flex-1 flex flex-col items-center justify-end h-full"
            >
              {['Detected', 'Quarantined'].map((category, i) => {
                const value = groupedData[date][category] || 0;
                const heightPercentage = (value / maxValue) * 100;
                
                return (
                  <div 
                    key={`${date}-${category}`}
                    className={`w-full ${i === 0 ? 'bg-cyan-500' : 'bg-cyan-700'} transition-all duration-300 ease-in-out cursor-pointer group relative`}
                    style={{ height: `${heightPercentage}%`, maxWidth: '80%' }}
                  >
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                      {category}: {value}
                    </div>
                  </div>
                );
              })}
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </div>
            </div>
          ))}
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between pointer-events-none">
          <div className="text-xs text-gray-500 dark:text-gray-400">{maxValue}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{Math.round(maxValue / 2)}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">0</div>
        </div>
      </div>
    );
  };
  
  const renderTypesChart = () => {
    const data = mockThreatsByType;
    const total = data.datasets[0].data.reduce((sum, value) => sum + value, 0);
    
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="w-full max-w-md grid grid-cols-2 gap-4">
          {data.labels.map((label, index) => {
            const value = data.datasets[0].data[index];
            const percentage = Math.round((value / total) * 100);
            const bgColor = data.datasets[0].backgroundColor?.[index] || 'bg-gray-500';
            
            return (
              <div key={label} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: bgColor.replace('0.7', '1') }}
                ></div>
                <div className="flex-1">
                  <div className="text-xs font-medium dark:text-white mb-1 flex justify-between">
                    <span>{label}</span>
                    <span>{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500 ease-out"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: bgColor.replace('0.7', '1') 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  const renderDetectionRateChart = () => {
    const maxValue = 100;
    const minValue = Math.min(...mockDetectionRates.map(item => item.value)) - 1;
    
    return (
      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end">
          <svg className="w-full h-full">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(6, 182, 212)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="rgb(6, 182, 212)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            
            {/* Background grid lines */}
            {[0, 25, 50, 75, 100].map((percent) => (
              <line 
                key={percent}
                x1="0" 
                y1={`${100 - (percent - minValue) / (maxValue - minValue) * 100}%`} 
                x2="100%" 
                y2={`${100 - (percent - minValue) / (maxValue - minValue) * 100}%`}
                stroke="#e5e7eb" 
                strokeWidth="1"
                strokeDasharray="4 4"
                className="dark:stroke-gray-700"
              />
            ))}
            
            {/* Line chart */}
            <polyline
              points={mockDetectionRates.map((item, index) => {
                const x = (index / (mockDetectionRates.length - 1)) * 100;
                const y = 100 - ((item.value - minValue) / (maxValue - minValue)) * 100;
                return `${x}% ${y}%`;
              }).join(' ')}
              fill="none"
              stroke="rgb(6, 182, 212)"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            
            {/* Area under the line */}
            <polygon
              points={`
                0 100%
                ${mockDetectionRates.map((item, index) => {
                  const x = (index / (mockDetectionRates.length - 1)) * 100;
                  const y = 100 - ((item.value - minValue) / (maxValue - minValue)) * 100;
                  return `${x}% ${y}%`;
                }).join(' ')}
                100% 100%
              `}
              fill="url(#gradient)"
            />
            
            {/* Data points */}
            {mockDetectionRates.map((item, index) => {
              const x = (index / (mockDetectionRates.length - 1)) * 100;
              const y = 100 - ((item.value - minValue) / (maxValue - minValue)) * 100;
              
              return (
                <g key={index} className="group">
                  <circle
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="4"
                    fill="white"
                    stroke="rgb(6, 182, 212)"
                    strokeWidth="2"
                  />
                  <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <rect
                      x={`${x}%`}
                      y={`${y - 8}%`}
                      width="40"
                      height="20"
                      rx="4"
                      transform="translate(-20, -25)"
                      fill="rgb(17, 24, 39)"
                      opacity="0.9"
                    />
                    <text
                      x={`${x}%`}
                      y={`${y - 8}%`}
                      textAnchor="middle"
                      transform="translate(0, -17)"
                      fill="white"
                      fontSize="10"
                    >
                      {item.value}%
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>
        
        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 dark:text-gray-400 px-2">
          {mockDetectionRates.map((item, index) => (
            <div key={index}>
              {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </div>
          ))}
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute left-2 top-0 bottom-5 flex flex-col justify-between pointer-events-none">
          <div className="text-xs text-gray-500 dark:text-gray-400">{maxValue}%</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{Math.round((maxValue + minValue) / 2)}%</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{Math.round(minValue)}%</div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium dark:text-white">Threat Analytics</h2>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeChart === 'timeline'
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            onClick={() => setActiveChart('timeline')}
          >
            Timeline
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeChart === 'types'
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            onClick={() => setActiveChart('types')}
          >
            By Type
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeChart === 'detection'
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            onClick={() => setActiveChart('detection')}
          >
            Detection Rate
          </button>
        </div>
      </div>
      
      <div className="pt-4">
        {activeChart === 'timeline' && renderTimelineChart()}
        {activeChart === 'types' && renderTypesChart()}
        {activeChart === 'detection' && renderDetectionRateChart()}
      </div>
      
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        {activeChart === 'timeline' && 'Threats detected vs. quarantined over the past week'}
        {activeChart === 'types' && 'Distribution of threats by type over the past month'}
        {activeChart === 'detection' && 'Email threat detection rate over the past week'}
      </div>
    </div>
  );
};

export default ThreatChart;