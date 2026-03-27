import React from 'react';

export default function Projects({ entries, updateEntry, addEntry, removeEntry }) {
  return (
    <>
      <h2 className="section-title">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
        Projects
      </h2>

      <div id="projectEntries">
        {entries.map((entry) => (
          <div className="entry-card" key={entry.id}>
            <button className="btn-remove" onClick={() => removeEntry(entry.id)}>✕ Remove</button>
            <div className="form-grid">
              <div className="form-group">
                <label>Project Name</label>
                <input type="text" placeholder="E-commerce Platform" value={entry.name}
                  onChange={(e) => updateEntry(entry.id, 'name', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Technologies</label>
                <input type="text" placeholder="React, Node.js, MongoDB" value={entry.tech}
                  onChange={(e) => updateEntry(entry.id, 'tech', e.target.value)} />
              </div>
              <div className="form-group full-width">
                <label>Description</label>
                <textarea rows="3" placeholder="What the project does and your role…" value={entry.desc}
                  onChange={(e) => updateEntry(entry.id, 'desc', e.target.value)} />
              </div>
              <div className="form-group full-width">
                <label>Link (optional)</label>
                <input type="url" placeholder="https://github.com/…" value={entry.link}
                  onChange={(e) => updateEntry(entry.id, 'link', e.target.value)} />
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
        Add Project
      </button>
    </>
  );
}
