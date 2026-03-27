import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import FormPanel from './components/FormPanel';
import PreviewPanel from './components/PreviewPanel';
import Toast from './components/Toast';

const DEFAULT_RESUME_DATA = {
  fullName: '',
  jobTitle: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  summary: '',
  education: [{ id: Date.now(), degree: '', institution: '', start: '', end: '', desc: '' }],
  experience: [{ id: Date.now() + 1, title: '', company: '', start: '', end: '', desc: '' }],
  skills: [],
  projects: [{ id: Date.now() + 2, name: '', tech: '', desc: '', link: '' }],
};

function loadFromStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [template, setTemplate] = useState(() => loadFromStorage('template', 'modern'));
  const [currentStep, setCurrentStep] = useState(0);
  const [photoDataUrl, setPhotoDataUrl] = useState(() => loadFromStorage('photoDataUrl', ''));
  const [resumeData, setResumeData] = useState(() => loadFromStorage('resumeData', DEFAULT_RESUME_DATA));
  const [toast, setToast] = useState(null);

  // Persist theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Persist resume data
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  // Persist photo
  useEffect(() => {
    localStorage.setItem('photoDataUrl', JSON.stringify(photoDataUrl));
  }, [photoDataUrl]);

  // Persist template
  useEffect(() => {
    localStorage.setItem('template', JSON.stringify(template));
  }, [template]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const updateField = (field, value) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  };

  const updateArrayEntry = (section, id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addArrayEntry = (section, template) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], { ...template, id: Date.now() }],
    }));
  };

  const removeArrayEntry = (section, id) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }));
  };

  const addSkill = (skill) => {
    if (skill && !resumeData.skills.includes(skill)) {
      setResumeData((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
    }
  };

  const removeSkill = (index) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      setResumeData({
        ...DEFAULT_RESUME_DATA,
        education: [{ id: Date.now(), degree: '', institution: '', start: '', end: '', desc: '' }],
        experience: [{ id: Date.now() + 1, title: '', company: '', start: '', end: '', desc: '' }],
        projects: [{ id: Date.now() + 2, name: '', tech: '', desc: '', link: '' }],
      });
      setPhotoDataUrl('');
      setCurrentStep(0);
      showToast('All data cleared successfully', 'info');
    }
  };

  return (
    <>
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        template={template}
        setTemplate={setTemplate}
        clearAll={clearAll}
        showToast={showToast}
      />
      <main className="app-main">
        <FormPanel
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          resumeData={resumeData}
          updateField={updateField}
          updateArrayEntry={updateArrayEntry}
          addArrayEntry={addArrayEntry}
          removeArrayEntry={removeArrayEntry}
          addSkill={addSkill}
          removeSkill={removeSkill}
          photoDataUrl={photoDataUrl}
          setPhotoDataUrl={setPhotoDataUrl}
          showToast={showToast}
        />
        <PreviewPanel
          template={template}
          resumeData={resumeData}
          photoDataUrl={photoDataUrl}
        />
      </main>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
