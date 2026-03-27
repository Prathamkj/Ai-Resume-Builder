import React from 'react';

function EmptyState() {
  return (
    <div className="resume-empty-state">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
      <p>Start filling the form to see<br />your resume come to life!</p>
    </div>
  );
}

function ResumeHeader({ data, template, photoDataUrl }) {
  return (
    <div className="resume-header">
      {template === 'elegant' && photoDataUrl && (
        <img className="resume-photo" src={photoDataUrl} alt="Profile photo" />
      )}
      {(template === 'elegant' && photoDataUrl) ? (
        <div>
          {data.fullName && <h2 className="resume-name">{data.fullName}</h2>}
          {data.jobTitle && <p className="resume-title">{data.jobTitle}</p>}
          <ContactInfo data={data} />
        </div>
      ) : (
        <>
          {data.fullName && <h2 className="resume-name">{data.fullName}</h2>}
          {data.jobTitle && <p className="resume-title">{data.jobTitle}</p>}
          <ContactInfo data={data} />
        </>
      )}
    </div>
  );
}

function ContactInfo({ data }) {
  return (
    <div className="resume-contact">
      {data.email && <span>✉ {data.email}</span>}
      {data.phone && <span>☎ {data.phone}</span>}
      {data.location && <span>📍 {data.location}</span>}
      {data.website && <span>🔗 {data.website}</span>}
    </div>
  );
}

function EducationSection({ education }) {
  const filtered = education.filter((e) => e.degree || e.institution);
  if (filtered.length === 0) return null;
  return (
    <div className="resume-section">
      <h3 className="resume-section-title">Education</h3>
      {filtered.map((e) => {
        const dates = [e.start, e.end].filter(Boolean).join(' – ');
        return (
          <div className="resume-entry" key={e.id}>
            <div className="resume-entry-header">
              <span className="resume-entry-title">{e.degree}</span>
              {dates && <span className="resume-entry-date">{dates}</span>}
            </div>
            {e.institution && <div className="resume-entry-sub">{e.institution}</div>}
            {e.desc && <div className="resume-entry-desc">{e.desc}</div>}
          </div>
        );
      })}
    </div>
  );
}

function ExperienceSection({ experience }) {
  const filtered = experience.filter((e) => e.title || e.company);
  if (filtered.length === 0) return null;
  return (
    <div className="resume-section">
      <h3 className="resume-section-title">Experience</h3>
      {filtered.map((e) => {
        const dates = [e.start, e.end].filter(Boolean).join(' – ');
        return (
          <div className="resume-entry" key={e.id}>
            <div className="resume-entry-header">
              <span className="resume-entry-title">{e.title}</span>
              {dates && <span className="resume-entry-date">{dates}</span>}
            </div>
            {e.company && <div className="resume-entry-sub">{e.company}</div>}
            {e.desc && <div className="resume-entry-desc">{e.desc}</div>}
          </div>
        );
      })}
    </div>
  );
}

function SkillsSection({ skills }) {
  if (skills.length === 0) return null;
  return (
    <div className="resume-section">
      <h3 className="resume-section-title">Skills</h3>
      <div className="resume-skills">
        {skills.map((s, i) => (
          <span className="resume-skill-chip" key={i}>{s}</span>
        ))}
      </div>
    </div>
  );
}

function ProjectsSection({ projects }) {
  const filtered = projects.filter((p) => p.name);
  if (filtered.length === 0) return null;
  return (
    <div className="resume-section">
      <h3 className="resume-section-title">Projects</h3>
      {filtered.map((p) => (
        <div className="resume-entry" key={p.id}>
          <div className="resume-entry-header">
            <span className="resume-entry-title">{p.name}</span>
            {p.tech && <span className="resume-entry-date">{p.tech}</span>}
          </div>
          {p.desc && <div className="resume-entry-desc">{p.desc}</div>}
          {p.link && (
            <div className="resume-entry-desc" style={{ marginTop: 2 }}>
              <a href={p.link} style={{ color: '#6d28d9', textDecoration: 'none', fontSize: '12px' }}>{p.link}</a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ExecutiveTemplate({ data }) {
  return (
    <>
      <div className="resume-sidebar">
        {data.fullName && <h2 className="resume-name">{data.fullName}</h2>}
        {data.jobTitle && <p className="resume-title">{data.jobTitle}</p>}
        <div className="resume-section">
          <h3 className="resume-section-title">Contact</h3>
          <ContactInfo data={data} />
        </div>
        <SkillsSection skills={data.skills} />
        {(() => {
          const filtered = data.education.filter((e) => e.degree || e.institution);
          if (filtered.length === 0) return null;
          return (
            <div className="resume-section">
              <h3 className="resume-section-title">Education</h3>
              {filtered.map((e) => {
                const dates = [e.start, e.end].filter(Boolean).join(' – ');
                return (
                  <div className="resume-entry" key={e.id} style={{ marginBottom: 10 }}>
                    {e.degree && <div className="resume-entry-title" style={{ fontSize: 12 }}>{e.degree}</div>}
                    {e.institution && <div className="resume-entry-sub" style={{ fontSize: 11 }}>{e.institution}</div>}
                    {dates && <div className="resume-entry-date" style={{ fontSize: 10 }}>{dates}</div>}
                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>
      <div className="resume-main-col">
        {data.summary && (
          <div className="resume-section">
            <h3 className="resume-section-title">Profile</h3>
            <div className="resume-summary" style={{ marginBottom: 0 }}>{data.summary}</div>
          </div>
        )}
        <ExperienceSection experience={data.experience} />
        <ProjectsSection projects={data.projects} />
      </div>
    </>
  );
}

export default function PreviewPanel({ template, resumeData, photoDataUrl }) {
  const data = resumeData;
  const hasContent =
    data.fullName || data.email ||
    data.education.some((e) => e.degree || e.institution) ||
    data.experience.some((e) => e.title || e.company) ||
    data.skills.length > 0 ||
    data.projects.some((p) => p.name);

  return (
    <section className="preview-panel" id="previewPanel">
      <div className="preview-label">Live Preview</div>
      <div className={`resume-preview template-${template}`} id="resumePreview">
        {!hasContent ? (
          <EmptyState />
        ) : template === 'executive' ? (
          <ExecutiveTemplate data={data} />
        ) : (
          <>
            <ResumeHeader data={data} template={template} photoDataUrl={photoDataUrl} />
            {data.summary && <div className="resume-summary">{data.summary}</div>}
            <EducationSection education={data.education} />
            <ExperienceSection experience={data.experience} />
            <SkillsSection skills={data.skills} />
            <ProjectsSection projects={data.projects} />
          </>
        )}
      </div>
    </section>
  );
}
