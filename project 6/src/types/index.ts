export interface Email {
  id: string;
  sender: string;
  subject: string;
  receivedAt: string;
  threatLevel: ThreatLevel;
  status: 'clean' | 'quarantined' | 'reviewing';
  threatTypes: ThreatType[];
  attachments: number;
  hasLinks: boolean;
}

export interface Threat {
  id: string;
  emailId: string;
  type: ThreatType;
  severity: ThreatLevel;
  detectedAt: string;
  description: string;
  status: 'new' | 'investigating' | 'resolved' | 'false-positive';
  details: Record<string, any>;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: ThreatLevel;
  timestamp: string;
  read: boolean;
  emailId?: string;
}

export interface Statistic {
  label: string;
  value: number;
  change: number;
  timeframe: 'today' | 'this week' | 'this month';
}

export type ThreatLevel = 'low' | 'medium' | 'high' | 'critical';

export type ThreatType = 
  | 'phishing' 
  | 'malware' 
  | 'spam' 
  | 'spoofing'
  | 'suspicious_link'
  | 'suspicious_attachment'
  | 'data_leak'
  | 'impersonation';

export interface TimeSeriesData {
  date: string;
  value: number;
  category?: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string;
    borderWidth?: number;
  }[];
}