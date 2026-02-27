/* =========================================================
   ResumeForge – Application Logic
   ========================================================= */

// ---- State ----
let currentStep = 0;
const totalSteps = 5;
const skills = [];
let educationCount = 0;
let experienceCount = 0;
let projectCount = 0;
let photoDataUrl = ''; // base64 data URL for uploaded photo

// ---- DOM References ----
const formSteps = () => document.querySelectorAll('.form-step');
const stepDots = () => document.querySelectorAll('.step-dot');
const stepLines = () => document.querySelectorAll('.step-line');

// ---- Initialization ----
document.addEventListener('DOMContentLoaded', () => {
    addEducation();
    addExperience();
    addProject();
    attachLivePreviewListeners();
    updatePreview();

    // Skill input handler
    const skillInput = document.getElementById('skillInput');
    skillInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const val = skillInput.value.replace(',', '').trim();
            if (val && !skills.includes(val)) {
                skills.push(val);
                renderSkillTags();
                updatePreview();
            }
            skillInput.value = '';
        }
    });

    // Click wrapper to focus input
    document.querySelector('.skill-input-wrapper')?.addEventListener('click', () => {
        skillInput.focus();
    });

    // Template selector
    document.getElementById('templateSelect').addEventListener('change', updatePreview);

    // Photo upload handler
    document.getElementById('photoInput').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            photoDataUrl = ev.target.result;
            // Update the preview circle in the form
            const photoPreview = document.getElementById('photoPreview');
            photoPreview.innerHTML = `<img src="${photoDataUrl}" alt="Profile photo">`;
            updatePreview();
        };
        reader.readAsDataURL(file);
    });
});

// ---- Step Navigation ----
function goToStep(step) {
    if (step < 0 || step >= totalSteps) return;
    currentStep = step;
    renderSteps();
    updatePreview();
}

function nextStep() {
    if (currentStep < totalSteps - 1) {
        currentStep++;
        renderSteps();
        updatePreview();
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        renderSteps();
        updatePreview();
    }
}

function renderSteps() {
    const steps = formSteps();
    const dots = stepDots();
    const lines = stepLines();

    steps.forEach((s, i) => s.classList.toggle('active', i === currentStep));

    dots.forEach((dot, i) => {
        dot.classList.remove('active', 'completed');
        if (i === currentStep) dot.classList.add('active');
        else if (i < currentStep) dot.classList.add('completed');
    });

    lines.forEach((line, i) => {
        line.classList.toggle('active', i < currentStep);
    });

    document.getElementById('backBtn').disabled = (currentStep === 0);
    const nextBtn = document.getElementById('nextBtn');
    if (currentStep === totalSteps - 1) {
        nextBtn.innerHTML = `Finish <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
    } else {
        nextBtn.innerHTML = `Next <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;
    }
}

// ---- Dynamic Entries ----

function addEducation() {
    educationCount++;
    const id = educationCount;
    const container = document.getElementById('educationEntries');
    const card = document.createElement('div');
    card.className = 'entry-card';
    card.id = `edu-${id}`;
    card.innerHTML = `
        <button class="btn-remove" onclick="removeEntry('edu-${id}')">✕ Remove</button>
        <div class="form-grid">
            <div class="form-group">
                <label>Degree / Program</label>
                <input type="text" data-field="edu-degree" placeholder="B.Sc. Computer Science">
            </div>
            <div class="form-group">
                <label>Institution</label>
                <input type="text" data-field="edu-institution" placeholder="MIT">
            </div>
            <div class="form-group">
                <label>Start Year</label>
                <input type="text" data-field="edu-start" placeholder="2018">
            </div>
            <div class="form-group">
                <label>End Year</label>
                <input type="text" data-field="edu-end" placeholder="2022">
            </div>
            <div class="form-group full-width">
                <label>Description (optional)</label>
                <textarea data-field="edu-desc" rows="2" placeholder="GPA, honours, relevant coursework…"></textarea>
            </div>
        </div>
    `;
    container.appendChild(card);
    attachLivePreviewListeners();
}

function addExperience() {
    experienceCount++;
    const id = experienceCount;
    const container = document.getElementById('experienceEntries');
    const card = document.createElement('div');
    card.className = 'entry-card';
    card.id = `exp-${id}`;
    card.innerHTML = `
        <button class="btn-remove" onclick="removeEntry('exp-${id}')">✕ Remove</button>
        <div class="form-grid">
            <div class="form-group">
                <label>Job Title</label>
                <input type="text" data-field="exp-title" placeholder="Software Engineer">
            </div>
            <div class="form-group">
                <label>Company</label>
                <input type="text" data-field="exp-company" placeholder="Google">
            </div>
            <div class="form-group">
                <label>Start Date</label>
                <input type="text" data-field="exp-start" placeholder="Jan 2022">
            </div>
            <div class="form-group">
                <label>End Date</label>
                <input type="text" data-field="exp-end" placeholder="Present">
            </div>
            <div class="form-group full-width">
                <label>Description</label>
                <textarea data-field="exp-desc" rows="3" placeholder="Key responsibilities and achievements…"></textarea>
            </div>
        </div>
    `;
    container.appendChild(card);
    attachLivePreviewListeners();
}

function addProject() {
    projectCount++;
    const id = projectCount;
    const container = document.getElementById('projectEntries');
    const card = document.createElement('div');
    card.className = 'entry-card';
    card.id = `proj-${id}`;
    card.innerHTML = `
        <button class="btn-remove" onclick="removeEntry('proj-${id}')">✕ Remove</button>
        <div class="form-grid">
            <div class="form-group">
                <label>Project Name</label>
                <input type="text" data-field="proj-name" placeholder="E-commerce Platform">
            </div>
            <div class="form-group">
                <label>Technologies</label>
                <input type="text" data-field="proj-tech" placeholder="React, Node.js, MongoDB">
            </div>
            <div class="form-group full-width">
                <label>Description</label>
                <textarea data-field="proj-desc" rows="3" placeholder="What the project does and your role…"></textarea>
            </div>
            <div class="form-group full-width">
                <label>Link (optional)</label>
                <input type="url" data-field="proj-link" placeholder="https://github.com/…">
            </div>
        </div>
    `;
    container.appendChild(card);
    attachLivePreviewListeners();
}

function removeEntry(id) {
    const el = document.getElementById(id);
    if (el) {
        el.style.animation = 'fadeSlideIn 0.25s ease reverse';
        setTimeout(() => {
            el.remove();
            updatePreview();
        }, 230);
    }
}

// ---- Skills ----
function renderSkillTags() {
    const container = document.getElementById('skillTags');
    container.innerHTML = skills.map((s, i) => `
        <span class="skill-tag">
            ${escapeHtml(s)}
            <button class="remove-skill" onclick="removeSkill(${i})">×</button>
        </span>
    `).join('');
}

function removeSkill(index) {
    skills.splice(index, 1);
    renderSkillTags();
    updatePreview();
}

// ---- Live Preview ----

function attachLivePreviewListeners() {
    document.querySelectorAll('#formPanel input, #formPanel textarea').forEach(el => {
        el.removeEventListener('input', updatePreview);
        el.addEventListener('input', updatePreview);
    });
}

function updatePreview() {
    const preview = document.getElementById('resumePreview');
    const template = document.getElementById('templateSelect').value;

    // Remove old template classes, add current
    preview.className = 'resume-preview template-' + template;

    const data = gatherFormData();
    const hasContent = data.fullName || data.email || data.education.length > 0 ||
        data.experience.length > 0 || data.skills.length > 0 || data.projects.length > 0;

    if (!hasContent) {
        preview.innerHTML = `
            <div class="resume-empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                <p>Start filling the form to see<br>your resume come to life!</p>
            </div>`;
        return;
    }

    // Executive template uses a two-column sidebar layout
    if (template === 'executive') {
        preview.innerHTML = renderExecutiveTemplate(data);
        return;
    }

    // All other templates use the standard single-column layout
    let html = '';

    // Header (with optional photo for Elegant)
    html += `<div class="resume-header">`;
    if (template === 'elegant' && photoDataUrl) {
        html += `<img class="resume-photo" src="${photoDataUrl}" alt="Profile photo">`;
        html += `<div>`;
    }
    if (data.fullName) html += `<h2 class="resume-name">${escapeHtml(data.fullName)}</h2>`;
    if (data.jobTitle) html += `<p class="resume-title">${escapeHtml(data.jobTitle)}</p>`;
    html += `<div class="resume-contact">`;
    if (data.email) html += `<span>✉ ${escapeHtml(data.email)}</span>`;
    if (data.phone) html += `<span>☎ ${escapeHtml(data.phone)}</span>`;
    if (data.location) html += `<span>📍 ${escapeHtml(data.location)}</span>`;
    if (data.website) html += `<span>🔗 ${escapeHtml(data.website)}</span>`;
    html += `</div>`;
    if (template === 'elegant' && photoDataUrl) {
        html += `</div>`;
    }
    html += `</div>`;

    // Summary
    if (data.summary) {
        html += `<div class="resume-summary">${escapeHtml(data.summary)}</div>`;
    }

    // Education
    html += renderEducationSection(data);

    // Experience
    html += renderExperienceSection(data);

    // Skills
    html += renderSkillsSection(data);

    // Projects
    html += renderProjectsSection(data);

    preview.innerHTML = html;
}

// ---- Executive Template (Sidebar) ----
function renderExecutiveTemplate(data) {
    let sidebar = `<div class="resume-sidebar">`;
    // Name & title in sidebar
    if (data.fullName) sidebar += `<h2 class="resume-name">${escapeHtml(data.fullName)}</h2>`;
    if (data.jobTitle) sidebar += `<p class="resume-title">${escapeHtml(data.jobTitle)}</p>`;

    // Contact in sidebar
    sidebar += `<div class="resume-section"><h3 class="resume-section-title">Contact</h3>`;
    sidebar += `<div class="resume-contact">`;
    if (data.email) sidebar += `<span>✉ ${escapeHtml(data.email)}</span>`;
    if (data.phone) sidebar += `<span>☎ ${escapeHtml(data.phone)}</span>`;
    if (data.location) sidebar += `<span>📍 ${escapeHtml(data.location)}</span>`;
    if (data.website) sidebar += `<span>🔗 ${escapeHtml(data.website)}</span>`;
    sidebar += `</div></div>`;

    // Skills in sidebar
    if (data.skills.length > 0) {
        sidebar += `<div class="resume-section"><h3 class="resume-section-title">Skills</h3>`;
        sidebar += `<div class="resume-skills">`;
        data.skills.forEach(s => {
            sidebar += `<span class="resume-skill-chip">${escapeHtml(s)}</span>`;
        });
        sidebar += `</div></div>`;
    }

    // Education in sidebar
    if (data.education.length > 0 && data.education.some(e => e.degree || e.institution)) {
        sidebar += `<div class="resume-section"><h3 class="resume-section-title">Education</h3>`;
        data.education.forEach(e => {
            if (!e.degree && !e.institution) return;
            sidebar += `<div class="resume-entry" style="margin-bottom:10px;">`;
            if (e.degree) sidebar += `<div class="resume-entry-title" style="font-size:12px;">${escapeHtml(e.degree)}</div>`;
            if (e.institution) sidebar += `<div class="resume-entry-sub" style="font-size:11px;">${escapeHtml(e.institution)}</div>`;
            const dates = [e.start, e.end].filter(Boolean).join(' – ');
            if (dates) sidebar += `<div class="resume-entry-date" style="font-size:10px;">${escapeHtml(dates)}</div>`;
            sidebar += `</div>`;
        });
        sidebar += `</div>`;
    }

    sidebar += `</div>`;

    // Main column
    let main = `<div class="resume-main-col">`;

    // Summary
    if (data.summary) {
        main += `<div class="resume-section"><h3 class="resume-section-title">Profile</h3>`;
        main += `<div class="resume-summary" style="margin-bottom:0;">${escapeHtml(data.summary)}</div></div>`;
    }

    // Experience
    main += renderExperienceSection(data);

    // Projects
    main += renderProjectsSection(data);

    main += `</div>`;

    return sidebar + main;
}

// ---- Shared Section Renderers ----
function renderEducationSection(data) {
    let html = '';
    if (data.education.length > 0 && data.education.some(e => e.degree || e.institution)) {
        html += `<div class="resume-section">`;
        html += `<h3 class="resume-section-title">Education</h3>`;
        data.education.forEach(e => {
            if (!e.degree && !e.institution) return;
            html += `<div class="resume-entry">`;
            html += `<div class="resume-entry-header">`;
            html += `<span class="resume-entry-title">${escapeHtml(e.degree || '')}</span>`;
            const dates = [e.start, e.end].filter(Boolean).join(' – ');
            if (dates) html += `<span class="resume-entry-date">${escapeHtml(dates)}</span>`;
            html += `</div>`;
            if (e.institution) html += `<div class="resume-entry-sub">${escapeHtml(e.institution)}</div>`;
            if (e.desc) html += `<div class="resume-entry-desc">${escapeHtml(e.desc)}</div>`;
            html += `</div>`;
        });
        html += `</div>`;
    }
    return html;
}

function renderExperienceSection(data) {
    let html = '';
    if (data.experience.length > 0 && data.experience.some(e => e.title || e.company)) {
        html += `<div class="resume-section">`;
        html += `<h3 class="resume-section-title">Experience</h3>`;
        data.experience.forEach(e => {
            if (!e.title && !e.company) return;
            html += `<div class="resume-entry">`;
            html += `<div class="resume-entry-header">`;
            html += `<span class="resume-entry-title">${escapeHtml(e.title || '')}</span>`;
            const dates = [e.start, e.end].filter(Boolean).join(' – ');
            if (dates) html += `<span class="resume-entry-date">${escapeHtml(dates)}</span>`;
            html += `</div>`;
            if (e.company) html += `<div class="resume-entry-sub">${escapeHtml(e.company)}</div>`;
            if (e.desc) html += `<div class="resume-entry-desc">${escapeHtml(e.desc)}</div>`;
            html += `</div>`;
        });
        html += `</div>`;
    }
    return html;
}

function renderSkillsSection(data) {
    let html = '';
    if (data.skills.length > 0) {
        html += `<div class="resume-section">`;
        html += `<h3 class="resume-section-title">Skills</h3>`;
        html += `<div class="resume-skills">`;
        data.skills.forEach(s => {
            html += `<span class="resume-skill-chip">${escapeHtml(s)}</span>`;
        });
        html += `</div></div>`;
    }
    return html;
}

function renderProjectsSection(data) {
    let html = '';
    if (data.projects.length > 0 && data.projects.some(p => p.name)) {
        html += `<div class="resume-section">`;
        html += `<h3 class="resume-section-title">Projects</h3>`;
        data.projects.forEach(p => {
            if (!p.name) return;
            html += `<div class="resume-entry">`;
            html += `<div class="resume-entry-header">`;
            html += `<span class="resume-entry-title">${escapeHtml(p.name)}</span>`;
            if (p.tech) html += `<span class="resume-entry-date">${escapeHtml(p.tech)}</span>`;
            html += `</div>`;
            if (p.desc) html += `<div class="resume-entry-desc">${escapeHtml(p.desc)}</div>`;
            if (p.link) html += `<div class="resume-entry-desc" style="margin-top:2px"><a href="${escapeHtml(p.link)}" style="color:#6d28d9;text-decoration:none;font-size:12px;">${escapeHtml(p.link)}</a></div>`;
            html += `</div>`;
        });
        html += `</div>`;
    }
    return html;
}

function gatherFormData() {
    const val = (id) => document.getElementById(id)?.value.trim() || '';

    const education = [];
    document.querySelectorAll('#educationEntries .entry-card').forEach(card => {
        education.push({
            degree: card.querySelector('[data-field="edu-degree"]')?.value.trim() || '',
            institution: card.querySelector('[data-field="edu-institution"]')?.value.trim() || '',
            start: card.querySelector('[data-field="edu-start"]')?.value.trim() || '',
            end: card.querySelector('[data-field="edu-end"]')?.value.trim() || '',
            desc: card.querySelector('[data-field="edu-desc"]')?.value.trim() || '',
        });
    });

    const experience = [];
    document.querySelectorAll('#experienceEntries .entry-card').forEach(card => {
        experience.push({
            title: card.querySelector('[data-field="exp-title"]')?.value.trim() || '',
            company: card.querySelector('[data-field="exp-company"]')?.value.trim() || '',
            start: card.querySelector('[data-field="exp-start"]')?.value.trim() || '',
            end: card.querySelector('[data-field="exp-end"]')?.value.trim() || '',
            desc: card.querySelector('[data-field="exp-desc"]')?.value.trim() || '',
        });
    });

    const projects = [];
    document.querySelectorAll('#projectEntries .entry-card').forEach(card => {
        projects.push({
            name: card.querySelector('[data-field="proj-name"]')?.value.trim() || '',
            tech: card.querySelector('[data-field="proj-tech"]')?.value.trim() || '',
            desc: card.querySelector('[data-field="proj-desc"]')?.value.trim() || '',
            link: card.querySelector('[data-field="proj-link"]')?.value.trim() || '',
        });
    });

    return {
        fullName: val('fullName'),
        jobTitle: val('jobTitle'),
        email: val('email'),
        phone: val('phone'),
        location: val('location'),
        website: val('website'),
        summary: val('summary'),
        education,
        experience,
        skills: [...skills],
        projects,
    };
}

// ---- PDF Download ----
function downloadPDF() {
    window.print();
}

// ---- Utility ----
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ---- Theme Toggle ----
function toggleTheme() {
    const root = document.documentElement;
    const current = root.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
}

// Apply saved theme on load
(function () {
    const saved = localStorage.getItem('theme');
    if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
    }
})();

