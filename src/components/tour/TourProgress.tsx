import React from 'react';

interface TourProgressProps {
  currentStep: number; // 0-indexed
  totalSteps: number;
  // Optional: Different display modes ('text', 'dots', 'bar')
  // displayMode?: 'text' | 'dots' | 'bar';
}

export const TourProgress: React.FC<TourProgressProps> = ({
  currentStep,
  totalSteps,
}) => {
  if (totalSteps <= 0) return null;

  // Textual progress
  const progressText = `Step ${currentStep + 1} of ${totalSteps}`;

  // Simple dot indicator - refined styling
  const renderDots = () => {
    return (
      <div className="tour-progress-dots">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentStep ? 'active' : ''}`}
            aria-label={`Step ${index + 1} ${index === currentStep ? 'current' : ''}`}
          ></span>
        ))}
      </div>
    );
  };

  // Simple progress bar - refined styling
  const renderBar = () => {
    const percentage = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;
    return (
      <div className="tour-progress-bar-container">
        <div
          className="tour-progress-bar-fill"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={currentStep + 1}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-label={`Tour progress: step ${currentStep + 1} of ${totalSteps}`}
        ></div>
      </div>
    );
  };

  return (
    <div className="tour-progress">
      <div className="tour-progress-text">{progressText}</div>
      {/* Choose one: renderDots() or renderBar() or both. Dots are often cleaner for step-based tours. */}
      {renderDots()}
      {/* {renderBar()} */}
      <style jsx>{`
        .tour-progress {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 5px 0; /* Reduced top/bottom padding as parent container has more */
          width: 100%; /* Take full width of its container */
        }
        .tour-progress-text {
          font-size: 13px; /* Slightly larger */
          color: #495057; /* Softer dark color */
          margin-bottom: 8px; /* Increased margin */
          font-weight: 500;
        }

        /* Dot Indicator Styling */
        .tour-progress-dots {
          display: flex;
          justify-content: center;
        }
        .dot {
          height: 10px; /* Maintained size */
          width: 10px;
          background-color: #ced4da; /* Inactive dot color - softer grey */
          border-radius: 50%;
          display: inline-block;
          margin: 0 4px; /* Slightly increased margin */
          transition: background-color 0.3s ease, transform 0.2s ease; /* Added transform transition */
        }
        .dot.active {
          background-color: #007bff; /* Active dot color - primary blue */
          transform: scale(1.2); /* Slightly larger when active */
        }

        /* Progress Bar Styling */
        .tour-progress-bar-container {
          width: 100%;
          max-width: 200px; /* Max width for the bar itself */
          background-color: #e9ecef; /* Lighter background for the bar track */
          border-radius: 5px; /* Consistent border radius */
          overflow: hidden;
          height: 10px; /* Maintained height */
          margin-top: 5px; /* Space if shown with text and dots */
        }
        .tour-progress-bar-fill {
          height: 100%;
          background-color: #007bff; /* Primary blue for fill */
          transition: width 0.3s ease-in-out;
          border-radius: 5px; /* Ensure fill also has radius if container does */
        }
      `}</style>
    </div>
  );
};
