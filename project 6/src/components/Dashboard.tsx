import React from 'react';
import StatisticsCard from './StatisticsCard';
import ThreatCard from './ThreatCard';
import EmailList from './EmailList';
import { mockEmails, mockStatistics, mockThreats } from '../data/mockData';
import ThreatChart from './ThreatChart';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Threat Intelligence Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {mockStatistics.map((stat) => (
          <StatisticsCard key={stat.label} stats={stat} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <ThreatChart />
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-medium dark:text-white mb-3">Active Threats</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {mockThreats.filter(threat => threat.status !== 'resolved').slice(0, 3).map((threat) => (
              <ThreatCard key={threat.id} threat={threat} />
            ))}
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <EmailList emails={mockEmails} />
      </div>
    </div>
  );
};

export default Dashboard;