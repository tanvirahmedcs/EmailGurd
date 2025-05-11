import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Statistic } from '../types';

interface StatisticsCardProps {
  stats: Statistic;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ stats }) => {
  const isPositiveChange = stats.change >= 0;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 transition-transform duration-200 hover:scale-105">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{stats.label}</h3>
        <div className={`flex items-center text-xs font-medium ${
          stats.label === 'Threats Detected' || stats.label === 'Quarantined Emails'
            ? (isPositiveChange ? 'text-red-500' : 'text-green-500')
            : (isPositiveChange ? 'text-green-500' : 'text-red-500')
        }`}>
          {isPositiveChange ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
          <span>{Math.abs(stats.change)}%</span>
        </div>
      </div>
      
      <div className="mt-2">
        <div className="text-2xl font-bold dark:text-white">
          {stats.label === 'Detection Rate' ? `${stats.value}%` : stats.value.toLocaleString()}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {stats.timeframe === 'today' ? 'Today' : 
           stats.timeframe === 'this week' ? 'This Week' : 'This Month'}
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;