import React, { useState } from 'react';
import { Bell, Moon, Sun } from 'lucide-react';
import { mockAlerts } from '../data/mockData';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  
  const unreadAlerts = mockAlerts.filter(alert => !alert.read).length;
  
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center px-6 justify-between">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Security Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button 
            className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} className="dark:text-gray-300" />
            {unreadAlerts > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {unreadAlerts}
              </span>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 z-10 mt-2 w-80 max-h-96 overflow-y-auto rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold dark:text-white">Notifications</h3>
                  <button className="text-xs text-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400">
                    Mark all as read
                  </button>
                </div>
              </div>
              <div>
                {mockAlerts.map((alert) => (
                  <div 
                    key={alert.id}
                    className={`p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      !alert.read ? 'bg-cyan-50 dark:bg-gray-700' : ''
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`w-2 h-2 mt-1 rounded-full mr-2 ${
                        alert.severity === 'critical' ? 'bg-red-600' :
                        alert.severity === 'high' ? 'bg-red-500' :
                        alert.severity === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                      }`}></div>
                      <div>
                        <p className="text-sm font-medium dark:text-white">{alert.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{alert.message}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {new Date(alert.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 text-center">
                <button className="text-sm text-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
        
        <button 
          className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
          onClick={toggleDarkMode}
        >
          {darkMode ? (
            <Sun size={20} className="dark:text-gray-300" />
          ) : (
            <Moon size={20} />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;