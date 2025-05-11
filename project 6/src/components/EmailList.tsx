import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Paperclip, Link as LinkIcon, Search, AlertTriangle, Shield, Brush as Virus, Bug } from 'lucide-react';
import { Email } from '../types';
import { getThreatColor, getThreatTypeIcon } from '../data/mockData';

interface EmailListProps {
  emails: Email[];
}

const iconMap = {
  'AlertTriangle': AlertTriangle,
  'Shield': Shield,
  'Virus': Virus,
  'Bug': Bug
};

const EmailList: React.FC<EmailListProps> = ({ emails }) => {
  const [sortField, setSortField] = useState<keyof Email>('receivedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSort = (field: keyof Email) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  const filteredEmails = emails.filter(email => 
    email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedEmails = [...filteredEmails].sort((a, b) => {
    if (sortField === 'receivedAt') {
      return sortDirection === 'asc' 
        ? new Date(a.receivedAt).getTime() - new Date(b.receivedAt).getTime()
        : new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime();
    }
    
    if (sortField === 'threatLevel') {
      const threatLevels = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
      return sortDirection === 'asc'
        ? threatLevels[a.threatLevel as keyof typeof threatLevels] - threatLevels[b.threatLevel as keyof typeof threatLevels]
        : threatLevels[b.threatLevel as keyof typeof threatLevels] - threatLevels[a.threatLevel as keyof typeof threatLevels];
    }
    
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return 0;
  });
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium dark:text-white">Recent Email Analysis</h2>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('sender')}
                >
                  <div className="flex items-center">
                    Sender
                    {sortField === 'sender' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('subject')}
                >
                  <div className="flex items-center">
                    Subject
                    {sortField === 'subject' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('receivedAt')}
                >
                  <div className="flex items-center">
                    Received
                    {sortField === 'receivedAt' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('threatLevel')}
                >
                  <div className="flex items-center">
                    Threat Level
                    {sortField === 'threatLevel' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    Status
                    {sortField === 'status' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Threats
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {sortedEmails.map((email) => (
                <tr key={email.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{email.sender}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="text-sm text-gray-900 dark:text-white truncate max-w-xs">{email.subject}</div>
                      <div className="flex ml-2">
                        {email.attachments > 0 && (
                          <span className="mr-1 text-gray-500 dark:text-gray-400">
                            <Paperclip size={16} />
                          </span>
                        )}
                        {email.hasLinks && (
                          <span className="text-gray-500 dark:text-gray-400">
                            <LinkIcon size={16} />
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(email.receivedAt).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getThreatColor(email.threatLevel)}`}>
                      {email.threatLevel.charAt(0).toUpperCase() + email.threatLevel.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      email.status === 'clean' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : email.status === 'quarantined'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {email.status.charAt(0).toUpperCase() + email.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-1">
                      {email.threatTypes.map((type, index) => {
                        const iconName = getThreatTypeIcon(type);
                        const IconComponent = iconMap[iconName as keyof typeof iconMap] || AlertTriangle;
                        
                        return (
                          <div 
                            key={`${email.id}-${type}-${index}`}
                            className="h-6 w-6 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700"
                            title={type.replace('_', ' ')}
                          >
                            <IconComponent className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                          </div>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400">
        Showing {sortedEmails.length} of {emails.length} emails
      </div>
    </div>
  );
};

export default EmailList;