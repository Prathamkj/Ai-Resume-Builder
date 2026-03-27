import React, { useState } from 'react';

export default function Skills({ skills, addSkill, removeSkill }) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = input.replace(',', '').trim();
      if (val) {
        addSkill(val);
        setInput('');
      }
    }
  };

  return (
    <>
      <h2 className="section-title">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        Skills
      </h2>

      <div className="form-group">
        <label htmlFor="skillInput">Add skills (press Enter or comma)</label>
        <div className="skill-input-wrapper" onClick={() => document.getElementById('skillInput').focus()}>
          <div className="skill-tags" id="skillTags">
            {skills.map((skill, i) => (
              <span className="skill-tag" key={i}>
                {skill}
                <button className="remove-skill" onClick={() => removeSkill(i)}>×</button>
              </span>
            ))}
          </div>
          <input
            type="text"
            id="skillInput"
            placeholder="e.g. JavaScript, React, Node.js…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </>
  );
}
