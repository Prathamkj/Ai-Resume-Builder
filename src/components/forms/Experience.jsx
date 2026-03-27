import React from 'react';

export default function Experience({ entries, updateEntry, addEntry, removeEntry }) {
  return (
    <>
      <h2 className="section-title">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        </svg>
        Work Experience
      </h2>

      <div id="experienceEntries">
        {entries.map((entry) => (
          <div className="entry-card" key={entry.id}>
            <button className="btn-remove" onClick={() => removeEntry(entry.id)}>✕ Remove</button>
            <div className="form-grid">
              <div className="form-group">
                <label>Job Title</label>
                <input type="text" placeholder="Software Engineer" value={entry.title}
                  onChange={(e) => updateEntry(entry.id, 'title', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input type="text" placeholder="Google" value={entry.company}
                  onChange={(e) => updateEntry(entry.id, 'company', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Start Date</label>
                <input type="text" placeholder="Jan 2022" value={entry.start}
                  onChange={(e) => updateEntry(entry.id, 'start', e.target.value)} />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input type="text" placeholder="Present" value={entry.end}
                  onChange={(e) => updateEntry(entry.id, 'end', e.target.value)} />
              </div>
              <div className="form-group full-width">
                <label>Description</label>
                <textarea rows="3" placeholder="Key responsibilities and achievements…" value={entry.desc}
                  onChange={(e) => updateEntry(entry.id, 'desc', e.target.value)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-add" onClick={addEntry}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add Experience
      </button>
    </>
  );
}
