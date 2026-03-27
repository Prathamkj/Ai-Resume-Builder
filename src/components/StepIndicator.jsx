import React from 'react';

const STEP_LABELS = ['Personal', 'Education', 'Experience', 'Skills', 'Projects'];

export default function StepIndicator({ currentStep, goToStep }) {
  return (
    <div className="step-indicator">
      {STEP_LABELS.map((label, i) => (
        <React.Fragment key={i}>
          <button
            className={`step-dot ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'completed' : ''}`}
            onClick={() => goToStep(i)}
          >
            <span>
              {i < currentStep ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                i + 1
              )}
            </span>
            <small>{label}</small>
          </button>
          {i < STEP_LABELS.length - 1 && (
            <div className={`step-line ${i < currentStep ? 'active' : ''}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
