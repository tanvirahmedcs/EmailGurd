import { Alert, Email, Statistic, Threat, TimeSeriesData } from '../types';

export const mockEmails: Email[] = [
  {
    id: 'e1',
    sender: 'suspicious@example.com',
    subject: 'Urgent: Your Account Needs Verification',
    receivedAt: '2025-03-15T08:23:15',
    threatLevel: 'high',
    status: 'quarantined',
    threatTypes: ['phishing', 'suspicious_link'],
    attachments: 0,
    hasLinks: true
  },
  {
    id: 'e2',
    sender: 'newsletter@company.com',
    subject: 'Weekly Newsletter: Latest Updates',
    receivedAt: '2025-03-15T09:15:00',
    threatLevel: 'low',
    status: 'clean',
    threatTypes: [],
    attachments: 0,
    hasLinks: true
  },
  {
    id: 'e3',
    sender: 'hr@organization.net',
    subject: 'New Employee Benefits Package',
    receivedAt: '2025-03-15T10:42:30',
    threatLevel: 'medium',
    status: 'reviewing',
    threatTypes: ['suspicious_attachment'],
    attachments: 1,
    hasLinks: false
  },
  {
    id: 'e4',
    sender: 'ceo-spoofed@company.com',
    subject: 'Urgent Wire Transfer Required',
    receivedAt: '2025-03-15T11:05:22',
    threatLevel: 'critical',
    status: 'quarantined',
    threatTypes: ['spoofing', 'impersonation'],
    attachments: 0,
    hasLinks: false
  },
  {
    id: 'e5',
    sender: 'partner@legitimate-business.com',
    subject: 'Contract Renewal Documents',
    receivedAt: '2025-03-15T13:18:45',
    threatLevel: 'medium',
    status: 'reviewing',
    threatTypes: ['suspicious_attachment'],
    attachments: 2,
    hasLinks: true
  },
  {
    id: 'e6',
    sender: 'security@microsoft.com',
    subject: 'Critical Security Update Required',
    receivedAt: '2025-03-15T14:27:10',
    threatLevel: 'high',
    status: 'quarantined',
    threatTypes: ['phishing', 'suspicious_link'],
    attachments: 1,
    hasLinks: true
  },
  {
    id: 'e7',
    sender: 'colleague@company.com',
    subject: 'Meeting Notes from Yesterday',
    receivedAt: '2025-03-15T15:44:28',
    threatLevel: 'low',
    status: 'clean',
    threatTypes: [],
    attachments: 1,
    hasLinks: false
  }
];

export const mockThreats: Threat[] = [
  {
    id: 't1',
    emailId: 'e1',
    type: 'phishing',
    severity: 'high',
    detectedAt: '2025-03-15T08:23:18',
    description: 'Email contains suspicious URL attempting to steal credentials',
    status: 'new',
    details: {
      url: 'http://fake-bank-login.com/secure',
      targetedBrand: 'Major Bank',
      redirectChain: ['bit.ly/shortened', 'intermediate-site.net', 'fake-bank-login.com']
    }
  },
  {
    id: 't2',
    emailId: 'e3',
    type: 'suspicious_attachment',
    severity: 'medium',
    detectedAt: '2025-03-15T10:42:33',
    description: 'Attachment contains obfuscated JavaScript',
    status: 'investigating',
    details: {
      fileName: 'benefits_doc.pdf.js',
      fileSize: '28KB',
      hashValue: 'a1b2c3d4e5f6',
      obfuscationTechnique: 'String encoding and eval usage'
    }
  },
  {
    id: 't3',
    emailId: 'e4',
    type: 'spoofing',
    severity: 'critical',
    detectedAt: '2025-03-15T11:05:25',
    description: 'Email sender is impersonating company CEO',
    status: 'new',
    details: {
      actualSender: 'attacker@malicious-domain.com',
      spoofedSender: 'ceo@company.com',
      spoofingTechnique: 'Display name manipulation and lookalike domain',
      similarityScore: '87%'
    }
  },
  {
    id: 't4',
    emailId: 'e4',
    type: 'impersonation',
    severity: 'critical',
    detectedAt: '2025-03-15T11:05:26',
    description: 'Content analysis indicates CEO impersonation with urgent financial request',
    status: 'new',
    details: {
      impersonatedPerson: 'Company CEO',
      urgencyIndicators: ['immediate', 'urgent', 'wire transfer'],
      confidentialityMarkers: ['discrete', 'confidential', 'do not discuss'],
      previouslySeenPatterns: true
    }
  },
  {
    id: 't5',
    emailId: 'e5',
    type: 'suspicious_attachment',
    severity: 'medium',
    detectedAt: '2025-03-15T13:18:50',
    description: 'Attachment contains macro code with suspicious behavior',
    status: 'investigating',
    details: {
      fileName: 'contract_2025.docx',
      fileSize: '157KB',
      macroDetected: true,
      suspiciousBehaviors: ['Attempts to access shell', 'Network connection initiation']
    }
  },
  {
    id: 't6',
    emailId: 'e6',
    type: 'phishing',
    severity: 'high',
    detectedAt: '2025-03-15T14:27:15',
    description: 'Brand impersonation of Microsoft with credential harvesting page',
    status: 'new',
    details: {
      url: 'http://microsoft-security-update.com/login',
      brandImpersonated: 'Microsoft',
      signInPageCloneScore: '92%',
      previouslyReported: true
    }
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'a1',
    title: 'Critical Threat Detected',
    message: 'CEO spoofing attempt identified with urgent wire transfer request',
    severity: 'critical',
    timestamp: '2025-03-15T11:05:30',
    read: false,
    emailId: 'e4'
  },
  {
    id: 'a2',
    title: 'Multiple Phishing Attempts',
    message: 'Increase in phishing emails targeting accounting department',
    severity: 'high',
    timestamp: '2025-03-15T14:30:00',
    read: false,
    emailId: 'e6'
  },
  {
    id: 'a3',
    title: 'Suspicious Attachment Quarantined',
    message: 'Document with obfuscated JavaScript automatically quarantined',
    severity: 'medium',
    timestamp: '2025-03-15T10:45:12',
    read: true,
    emailId: 'e3'
  },
  {
    id: 'a4',
    title: 'New Malware Signature Detected',
    message: 'Previously unknown malware variant identified in attachment',
    severity: 'high',
    timestamp: '2025-03-15T08:25:45',
    read: true
  },
  {
    id: 'a5',
    title: 'Potential Data Exfiltration Attempt',
    message: 'Email with sensitive data attempting to reach external domain',
    severity: 'high',
    timestamp: '2025-03-14T16:12:30',
    read: true
  }
];

export const mockStatistics: Statistic[] = [
  {
    label: 'Emails Scanned',
    value: 1467,
    change: 12,
    timeframe: 'today'
  },
  {
    label: 'Threats Detected',
    value: 42,
    change: 8,
    timeframe: 'today'
  },
  {
    label: 'Quarantined Emails',
    value: 38,
    change: 5,
    timeframe: 'today'
  },
  {
    label: 'Detection Rate',
    value: 98.7,
    change: 0.5,
    timeframe: 'this week'
  }
];

export const mockThreatsByType: ChartData = {
  labels: ['Phishing', 'Malware', 'Spoofing', 'Suspicious Links', 'Suspicious Attachments', 'Data Leak', 'Impersonation'],
  datasets: [
    {
      label: 'Threats by Type',
      data: [35, 27, 12, 22, 16, 8, 14],
      backgroundColor: [
        'rgba(239, 68, 68, 0.7)',
        'rgba(245, 158, 11, 0.7)',
        'rgba(6, 182, 212, 0.7)',
        'rgba(124, 58, 237, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(234, 88, 12, 0.7)',
        'rgba(59, 130, 246, 0.7)'
      ],
      borderWidth: 1
    }
  ]
};

export const mockThreatTimeline: TimeSeriesData[] = [
  { date: '2025-03-09', value: 18, category: 'Detected' },
  { date: '2025-03-10', value: 22, category: 'Detected' },
  { date: '2025-03-11', value: 30, category: 'Detected' },
  { date: '2025-03-12', value: 25, category: 'Detected' },
  { date: '2025-03-13', value: 28, category: 'Detected' },
  { date: '2025-03-14', value: 35, category: 'Detected' },
  { date: '2025-03-15', value: 42, category: 'Detected' },
  { date: '2025-03-09', value: 16, category: 'Quarantined' },
  { date: '2025-03-10', value: 20, category: 'Quarantined' },
  { date: '2025-03-11', value: 27, category: 'Quarantined' },
  { date: '2025-03-12', value: 22, category: 'Quarantined' },
  { date: '2025-03-13', value: 25, category: 'Quarantined' },
  { date: '2025-03-14', value: 30, category: 'Quarantined' },
  { date: '2025-03-15', value: 38, category: 'Quarantined' }
];

export const mockDetectionRates: TimeSeriesData[] = [
  { date: '2025-03-09', value: 96.2 },
  { date: '2025-03-10', value: 97.1 },
  { date: '2025-03-11', value: 97.5 },
  { date: '2025-03-12', value: 97.8 },
  { date: '2025-03-13', value: 98.0 },
  { date: '2025-03-14', value: 98.2 },
  { date: '2025-03-15', value: 98.7 }
];

export const getThreatColor = (level: string): string => {
  switch (level) {
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

export const getThreatTypeIcon = (type: string): string => {
  switch (type) {
    case 'phishing':
      return 'Shield';
    case 'malware':
      return 'Bug';
    case 'spam':
      return 'AlertTriangle';
    case 'spoofing':
      return 'AlertTriangle';
    case 'suspicious_link':
      return 'AlertTriangle';
    case 'suspicious_attachment':
      return 'AlertTriangle';
    case 'data_leak':
      return 'AlertTriangle';
    case 'impersonation':
      return 'AlertTriangle';
    default:
      return 'AlertTriangle';
  }
};