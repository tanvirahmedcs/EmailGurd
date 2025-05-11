import React from 'react';
import { AlertTriangle, Bug, Database, Fish as Fishing, Link, Mail, Paperclip, UserCog, UserX } from 'lucide-react';
import { Threat } from '../types';

interface ThreatCardProps {
  threat: Threat;
}

const ThreatCard: React.FC<ThreatCardProps> = ({ threat }) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'investigating':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'false-positive':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };
  
  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-600 text-white';
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-amber-500 text-white';
      case 'low':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };
  
  const renderThreatIcon = (type: string) => {
    switch (type) {
      case 'phishing':
        return <Fishing className="h-5 w-5" />;
      case 'malware':
        return <Bug className="h-5 w-5" />;
      case 'spam':
        return <Mail className="h-5 w-5" />;
      case 'spoofing':
        return <UserX className="h-5 w-5" />;
      case 'suspicious_link':
        return <Link className="h-5 w-5" />;
      case 'suspicious_attachment':
        return <Paperclip className="h-5 w-5" />;
      case 'data_leak':
        return <Database className="h-5 w-5" />;
      case 'impersonation':
        return <UserCog className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${getSeverityClass(threat.severity)}`}>
              {renderThreatIcon(threat.type)}
            </div>
            <div className="ml-3">
              <h3 className="font-medium dark:text-white">
                {threat.type.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase())}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(threat.detectedAt).toLocaleString()}
              </p>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(threat.status)}`}>
            {threat.status.replace('-', ' ').replace(/\b\w/g, char => char.toUpperCase())}
          </div>
        </div>
        
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
          {threat.description}
        </p>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Details</h4>
          <div className="space-y-1">
            {Object.entries(threat.details).map(([key, value]) => (
              <div key={key} className="grid grid-cols-2 text-sm">
                <span className="text-gray-600 dark:text-gray-300">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace(/_/g, ' ')}:
                </span>
                <span className="text-gray-800 dark:text-gray-100 font-medium">
                  {typeof value === 'boolean' 
                    ? (value ? 'Yes' : 'No') 
                    : Array.isArray(value) 
                      ? value.join(', ') 
                      : String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-between">
        <button className="text-xs text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium">
          View Full Analysis
        </button>
        <button className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium">
          Mark as Resolved
        </button>
      </div>
    </div>
  );
};

export default ThreatCard;