'use client';

import { useState } from 'react';

interface ExcuseFormProps {
  onSubmit: (situation: string, audience: string, severity: string) => void;
  isGenerating: boolean;
}

export default function ExcuseForm({ onSubmit, isGenerating }: ExcuseFormProps) {
  const [situation, setSituation] = useState('');
  const [audience, setAudience] = useState('boss');
  const [severity, setSeverity] = useState('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (situation.trim()) {
      onSubmit(situation, audience, severity);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Generate an Excuse</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="situation" className="form-label">
            What situation do you need an excuse for?
          </label>
          <input
            id="situation"
            type="text"
            className="form-input"
            placeholder="e.g., missing a deadline, being late to a meeting"
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="audience" className="form-label">
            Who will hear this excuse?
          </label>
          <select
            id="audience"
            className="form-select"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
          >
            <option value="boss">Boss</option>
            <option value="coworker">Coworker</option>
            <option value="client">Client</option>
            <option value="friend">Friend</option>
            <option value="family">Family</option>
            <option value="partner">Partner</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="severity" className="form-label">
            How detailed should the excuse be?
          </label>
          <select
            id="severity"
            className="form-select"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
          >
            <option value="mild">Simple (1-2 sentences)</option>
            <option value="medium">Detailed (3-4 sentences)</option>
            <option value="elaborate">Elaborate (5+ sentences)</option>
          </select>
        </div>

        <button
          type="submit"
          className="form-button form-button-primary"
          disabled={isGenerating || !situation.trim()}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate Excuse'
          )}
        </button>
      </form>
    </div>
  );
} 