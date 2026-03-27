import React from 'react';

export default function PersonalInfo({ resumeData, updateField, photoDataUrl, setPhotoDataUrl }) {
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoDataUrl(ev.target.result);
    reader.readAsDataURL(file);
  };

  const hasAnyData = resumeData.fullName || resumeData.jobTitle || resumeData.email || resumeData.phone || resumeData.location || resumeData.website || resumeData.summary;
  const missingName = hasAnyData && !resumeData.fullName;
  const missingEmail = hasAnyData && !resumeData.email;

  return (
    <>
      <h2 className="section-title">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        Personal Information
      </h2>

      <div className="photo-upload-area">
        <div className="photo-preview" id="photoPreview">
          {photoDataUrl ? (
            <img src={photoDataUrl} alt="Profile photo" />
          ) : (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          )}
        </div>
        <div className="photo-upload-info">
          <label className="btn btn-photo" htmlFor="photoInput">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Upload Photo
          </label>
          <input type="file" id="photoInput" accept="image/*" hidden onChange={handlePhotoUpload} />
          <small>Used in the Elegant template</small>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="fullName">Full Name *</label>
          <input type="text" id="fullName" placeholder="John Doe" value={resumeData.fullName}
            className={missingName ? 'input-warning' : ''}
            onChange={(e) => updateField('fullName', e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="jobTitle">Job Title</label>
          <input type="text" id="jobTitle" placeholder="Software Engineer" value={resumeData.jobTitle}
            onChange={(e) => updateField('jobTitle', e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input type="email" id="email" placeholder="john@example.com" value={resumeData.email}
            className={missingEmail ? 'input-warning' : ''}
            onChange={(e) => updateField('email', e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" placeholder="+1 234 567 890" value={resumeData.phone}
            onChange={(e) => updateField('phone', e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input type="text" id="location" placeholder="New York, NY" value={resumeData.location}
            onChange={(e) => updateField('location', e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="website">Website / LinkedIn</label>
          <input type="url" id="website" placeholder="https://linkedin.com/in/johndoe" value={resumeData.website}
            onChange={(e) => updateField('website', e.target.value)} />
        </div>
        <div className="form-group full-width">
          <label htmlFor="summary">Professional Summary</label>
          <textarea id="summary" rows="4"
            placeholder="A brief summary of your professional background and career goals…"
            value={resumeData.summary}
            onChange={(e) => updateField('summary', e.target.value)} />
        </div>
      </div>
    </>
  );
}
