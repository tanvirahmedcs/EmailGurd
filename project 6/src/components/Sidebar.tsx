import React from 'react';
import { 
  BarChart3, 
  Mail, 
  Shield, 
  AlertTriangle, 
  Settings, 
  User, 
  Search,
  Home,
  Server,
  FileText,
  Users
} from 'lucide-react';

type SidebarItemProps = {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  alert?: number;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, active, alert }) => {
  return (
    <li className={`flex items-center p-3 mb-1 rounded-lg cursor-pointer ${
      active ? 'bg-cyan-500 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
    }`}>
      <div className="mr-3">
        {icon}
      </div>
      <span className="font-medium">{text}</span>
      {alert && (
        <div className="ml-auto bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
          {alert}
        </div>
      )}
    </li>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4 flex items-center justify-center">
        <Shield className="h-8 w-8 text-cyan-500" />
        <span className="text-xl font-bold ml-2 dark:text-white">EmailGuard</span>
      </div>
      
      <div className="p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        <ul>
          <SidebarItem icon={<Home size={20} />} text="Dashboard" active />
          <SidebarItem icon={<Mail size={20} />} text="Email Monitoring" alert={3} />
          <SidebarItem icon={<AlertTriangle size={20} />} text="Threats & Alerts" />
          <SidebarItem icon={<BarChart3 size={20} />} text="Analytics" />
          <SidebarItem icon={<Server size={20} />} text="Quarantine" />
          <SidebarItem icon={<FileText size={20} />} text="Reports" />
          <SidebarItem icon={<Users size={20} />} text="User Activity" />
        </ul>
        
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4">
          <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Administration
          </h3>
          <ul className="mt-2">
            <SidebarItem icon={<Settings size={20} />} text="Settings" />
            <SidebarItem icon={<User size={20} />} text="User Profile" />
          </ul>
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-cyan-500 flex items-center justify-center text-white">
            <span className="font-medium">JS</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium dark:text-white">John Smith</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Security Analyst</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;