'use client';

interface ExcuseCardProps {
  excuse: {
    id: string;
    situation: string;
    audience: string;
    severity: string;
    content: string;
    timestamp: string;
  };
  onCopy: (content: string) => void;
  onDelete: (id: string) => void;
}

export default function ExcuseCard({ excuse, onCopy, onDelete }: ExcuseCardProps) {
  const formatAudience = (audience: string) => {
    const audienceMap: Record<string, string> = {
      boss: 'Boss/Manager',
      coworker: 'Coworker',
      friend: 'Friend',
      family: 'Family Member',
      partner: 'Partner/Spouse',
      teacher: 'Teacher/Professor',
      client: 'Client'
    };
    
    return audienceMap[audience] || audience.charAt(0).toUpperCase() + audience.slice(1);
  };

  // Format severity for display
  const formatSeverity = (severity: string) => {
    const severityMap: Record<string, string> = {
      mild: 'Simple',
      medium: 'Detailed',
      elaborate: 'Elaborate'
    };
    
    return severityMap[severity] || severity.charAt(0).toUpperCase() + severity.slice(1);
  };

  return (
    <div className="excuse-card">
      <div className="excuse-header">
        <div className="excuse-info">
          <div className="excuse-situation">{excuse.situation}</div>
          <div className="excuse-meta">
            For: {formatAudience(excuse.audience)} • {formatSeverity(excuse.severity)} • {excuse.timestamp}
          </div>
        </div>
        <div className="excuse-actions">
          <button 
            onClick={() => onCopy(excuse.content)}
            className="icon-btn btn-ghost"
            title="Copy to clipboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
          <button 
            onClick={() => onDelete(excuse.id)}
            className="icon-btn btn-ghost text-destructive"
            title="Delete excuse"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="excuse-content max-h-[150px] overflow-y-auto">
        {excuse.content}
      </div>
    </div>
  );
} 