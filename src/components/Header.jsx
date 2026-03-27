import React from 'react';

export default function Header({ template, setTemplate, theme, toggleTheme, clearAll, showToast }) {
  const downloadPDF = () => {
    window.print();
    setTimeout(() => {
      showToast('PDF downloaded successfully!', 'success');
    }, 1000);
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="2" y="4" width="18" height="22" rx="3" stroke="url(#g1)" strokeWidth="2.2" />
            <path d="M8 10h8M8 14h8M8 18h5" stroke="url(#g1)" strokeWidth="1.8" strokeLinecap="round" />
            <rect x="8" y="2" width="18" height="22" rx="3" fill="rgba(139,92,246,.15)" stroke="url(#g1)" strokeWidth="2.2" />
            <path d="M14 8h8M14 12h8M14 16h5" stroke="url(#g1)" strokeWidth="1.8" strokeLinecap="round" />
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="28" y2="28">
                <stop stopColor="#a78bfa" />
                <stop offset="1" stopColor="#6d28d9" />
              </linearGradient>
            </defs>
          </svg>
          <h1>MyResumeBuilder</h1>
        </div>
      </div>
      <div className="header-right">
        <div className="template-selector">
          <label htmlFor="templateSelect">Template:</label>
          <select 
            id="templateSelect" 
            value={template} 
            onChange={(e) => setTemplate(e.target.value)}
          >
            <option value="classic">Classic</option>
            <option value="modern">Modern</option>
            <option value="minimal">Minimal</option>
            <option value="executive">Executive</option>
            <option value="creative">Creative</option>
            <option value="elegant">Elegant (Photo)</option>
            <option value="compact">Compact</option>
            <option value="bold">Bold</option>
          </select>
        </div>
        <button 
          className="btn btn-toggle-theme" 
          onClick={toggleTheme}
          title="Toggle light/dark theme"
        >
          <svg className="icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          <svg className="icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
        <button className="btn btn-clear" onClick={clearAll} title="Clear all data">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
          Clear All
        </button>
        <button className="btn btn-primary" onClick={downloadPDF}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download PDF
        </button>
      </div>
    </header>
  );
}
