import React from 'react';

export default function Education({ entries, updateEntry, addEntry, removeEntry }) {
  return (
    <>
      <h2 className="section-title">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
        </svg>
        Education
      </h2>

      <div id="educationEntries">
        {entries.map((entry) => (
          <div className="entry-card" key={entry.id}>
            <button className="btn-remove" onClick={() => removeEntry(entry.id)}>✕ Remove</button>
            <div className="form-grid">
              <div className="form-group">
                <label>Degree / Program</label>
                <input type="text" placeholder="B.Sc. Computer Science" value={entry.degree}
                  onChange={(e) => updateEntry(entry.id, 'degree', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Institution</label>
                <input type="text" placeholder="MIT" value={entry.institution}
                  onChange={(e) => updateEntry(entry.id, 'institution', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Start Year</label>
                <input type="text" placeholder="2018" value={entry.start}
                  onChange={(e) => updateEntry(entry.id, 'start', e.target.value)} />
              </div>
              <div className="form-group">
                <label>End Year</label>
                <input type="text" placeholder="2022" value={entry.end}
                  onChange={(e) => updateEntry(entry.id, 'end', e.target.value)} />
              </div>
              <div className="form-group full-width">
                <label>Description (optional)</label>
                <textarea rows="2" placeholder="GPA, honours, relevant coursework…" value={entry.desc}
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
        Add Education
      </button>
    </>
  );
}
