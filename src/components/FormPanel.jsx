import React, { useEffect } from 'react';
import StepIndicator from './StepIndicator';
import PersonalInfo from './forms/PersonalInfo';
import Education from './forms/Education';
import Experience from './forms/Experience';
import Skills from './forms/Skills';
import Projects from './forms/Projects';

const TOTAL_STEPS = 5;

export default function FormPanel({
  currentStep,
  setCurrentStep,
  resumeData,
  updateField,
  updateArrayEntry,
  addArrayEntry,
  removeArrayEntry,
  addSkill,
  removeSkill,
  photoDataUrl,
  setPhotoDataUrl,
}) {
  const nextStep = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      showToast('Resume complete! Your data is saved.', 'success');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    document.getElementById('formPanel')?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const steps = [
    <PersonalInfo
      key="personal"
      resumeData={resumeData}
      updateField={updateField}
      photoDataUrl={photoDataUrl}
      setPhotoDataUrl={setPhotoDataUrl}
    />,
    <Education
      key="education"
      entries={resumeData.education}
      updateEntry={(id, field, value) => updateArrayEntry('education', id, field, value)}
      addEntry={() =>
        addArrayEntry('education', { degree: '', institution: '', start: '', end: '', desc: '' })
      }
      removeEntry={(id) => removeArrayEntry('education', id)}
    />,
    <Experience
      key="experience"
      entries={resumeData.experience}
      updateEntry={(id, field, value) => updateArrayEntry('experience', id, field, value)}
      addEntry={() =>
        addArrayEntry('experience', { title: '', company: '', start: '', end: '', desc: '' })
      }
      removeEntry={(id) => removeArrayEntry('experience', id)}
    />,
    <Skills
      key="skills"
      skills={resumeData.skills}
      addSkill={addSkill}
      removeSkill={removeSkill}
    />,
    <Projects
      key="projects"
      entries={resumeData.projects}
      updateEntry={(id, field, value) => updateArrayEntry('projects', id, field, value)}
      addEntry={() =>
        addArrayEntry('projects', { name: '', tech: '', desc: '', link: '' })
      }
      removeEntry={(id) => removeArrayEntry('projects', id)}
    />,
  ];

  return (
    <section className="form-panel" id="formPanel">
      <StepIndicator currentStep={currentStep} goToStep={setCurrentStep} />

      <div className="form-step active" key={currentStep}>
        {steps[currentStep]}
      </div>

      <div className="form-nav">
        <button
          className="btn btn-back"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>
        <button className="btn btn-next" onClick={nextStep}>
          {currentStep === TOTAL_STEPS - 1 ? 'Finish' : 'Next'}
          {currentStep === TOTAL_STEPS - 1 ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
}
