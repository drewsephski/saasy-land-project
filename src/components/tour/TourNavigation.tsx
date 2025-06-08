import React from 'react';

interface TourNavigationProps {
  onNext: () => void;
  onPrev: () => void;
  onEnd: () => void;
  currentStep: number;
  totalSteps: number;
  // Optional: Custom labels for buttons
  // nextLabel?: string;
  // prevLabel?: string;
  // endLabel?: string;
}

export const TourNavigation: React.FC<TourNavigationProps> = ({
  onNext,
  onPrev,
  onEnd,
  currentStep,
  totalSteps,
}) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="tour-navigation" style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
      {/* Previous Button */}
      {!isFirstStep && (
        <button
          onClick={onPrev}
          disabled={isFirstStep}
          aria-label="Previous tour step"
          className="tour-button tour-button-prev"
          // Micro-interaction: Hover and active states are handled by CSS below
        >
          Previous
        </button>
      )}

      {/* Spacer or conditional rendering to manage layout if only one button is visible often */}
      {isFirstStep && <div style={{ flexGrow: 1 }}></div>}


      {/* Next/Finish Button */}
      {isLastStep ? (
        <button
          onClick={onEnd}
          aria-label="Finish tour"
          className="tour-button tour-button-finish"
          // Micro-interaction: Special styling for finish button, hover/active states handled by CSS
        >
          Finish
        </button>
      ) : (
        <button
          onClick={onNext}
          disabled={isLastStep}
          aria-label="Next tour step"
          className="tour-button tour-button-next"
          // Micro-interaction: Hover and active states are handled by CSS below
        >
          Next
        </button>
      )}

      {/* Optional: End Tour button always visible, or combined with Next/Finish logic */}
      {/* {!isLastStep && (
        <button
          onClick={onEnd}
          aria-label="End tour"
          style={{ marginLeft: 'auto' }} // Push to the right if "Previous" is not shown
          // Micro-interaction: Subtle styling for end tour, hover/active states
        >
          End Tour
        </button>
      )} */}

      {/* Basic styling for demonstration */}
      <style jsx>{`
        .tour-navigation {
          display: flex; /* Already set in parent, but good to ensure */
          justify-content: space-between; /* Distributes space */
          width: 100%; /* Ensure it takes full width of its container */
        }
        .tour-button {
          padding: 10px 18px; /* Increased padding for a better click target */
          border: 1px solid transparent;
          background-color: #007bff; /* Consistent primary blue */
          color: white;
          border-radius: 6px; /* Consistent with other elements */
          cursor: pointer;
          font-size: 14px;
          font-weight: 500; /* Medium weight for readability */
          line-height: 1.2; /* Ensure text is centered well */
          transition: background-color 0.15s ease-in-out, transform 0.1s ease-in-out, box-shadow 0.15s ease-in-out;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08); /* Subtle default shadow */
        }
        .tour-button:hover:not(:disabled) {
          background-color: #0069d9; /* Slightly darker blue on hover */
          box-shadow: 0 2px 5px rgba(0,0,0,0.12);
          transform: translateY(-1px);
        }
        .tour-button:active:not(:disabled) {
          background-color: #0056b3; /* Even darker blue on active */
          transform: translateY(0px);
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        .tour-button:focus-visible:not(:disabled) { /* Accessibility: focus state */
            outline: 2px solid #007bff;
            outline-offset: 2px;
        }
        .tour-button:disabled {
          background-color: #e9ecef; /* Lighter grey for disabled */
          border-color: #ced4da; /* Softer border for disabled */
          color: #6c757d; /* Muted text color for disabled */
          cursor: not-allowed;
          opacity: 0.75; /* Slightly more opaque */
          box-shadow: none; /* Remove shadow for disabled */
        }

        /* Specific styling for finish button */
        .tour-button-finish {
          background-color: #28a745; /* Green for finish */
          /* border-color: #28a745; */ /* Not needed if border is transparent and bg is set */
        }
        .tour-button-finish:hover:not(:disabled) {
          background-color: #218838;
          /* border-color: #1e7e34; */
        }
        .tour-button-finish:active:not(:disabled) {
          background-color: #1e7e34;
        }

        /* Previous button specific styling if needed (e.g., secondary style) */
        .tour-button-prev {
          background-color: #6c757d; /* Example: Grey for secondary action */
          /* border-color: #6c757d; */
        }
        .tour-button-prev:hover:not(:disabled) {
          background-color: #5a6268;
          /* border-color: #545b62; */
        }
        .tour-button-prev:active:not(:disabled) {
          background-color: #545b62;
        }

        /* Spacing:
           The layout is managed by the parent flex container in TourSetup.
           If a spacer div is used, it correctly pushes elements.
           If only one button is visible (e.g. "Finish" on last step, or "Next" on first if no prev),
           it will align to the start or end depending on the flex setup of its direct parent.
           The current TourNavigation.tsx uses a spacer div for the first step,
           and relies on margin-left: auto for the Next/Finish button if Previous is present.
           This should generally work.
        */
         .tour-navigation .tour-button-next, .tour-navigation .tour-button-finish {
           /* This margin is applied if a "Previous" button is also rendered in the same flex container */
           /* If the spacer div technique is used for the first step, this might need adjustment or be handled by flex properties */
         }

      `}</style>
    </div>
  );
};
