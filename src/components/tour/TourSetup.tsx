import React, { useEffect } from 'react';
import { TourStep } from './TourStep';
import { TourNavigation } from './TourNavigation';
import { TourProgress } from './TourProgress';
import { useTour } from './TourProvider';

// Hardcoded tour steps based on product_tour_flow.md
const tourStepsConfig = [
  {
    stepIndex: 0,
    targetSelector: '#dashboard-welcome-message', // Placeholder, ensure this exists in your layout
    title: 'Welcome to Your Dashboard!',
    content: 'This is your central hub where you can see important updates, key metrics, and quick links.',
    position: 'bottom' as const, // Explicitly type position
  },
  {
    stepIndex: 1,
    targetSelector: '#main-feature-button', // Placeholder, ensure this exists
    title: 'Explore Core Feature',
    content: 'This is where you can access our key functionality. Click here to start exploring.',
    position: 'right' as const,
  },
  {
    stepIndex: 2,
    targetSelector: '#user-profile-menu', // Placeholder, ensure this exists
    title: 'Manage Your Account',
    content: 'Access your profile information, account settings, and help resources from this menu.',
    position: 'left' as const,
  },
  {
    stepIndex: 3,
    targetSelector: '#settings-panel-link', // Placeholder, ensure this exists
    title: 'Customize Your Experience',
    content: 'Tailor the application to your needs by adjusting settings and preferences here.',
    position: 'bottom' as const,
  },
];

export const TourSetup: React.FC = () => {
  const {
    isActive,
    currentStep,
    goToStep,
    endTour,
    setTotalSteps,
    totalSteps, // Get totalSteps from provider
  } = useTour();

  useEffect(() => {
    setTotalSteps(tourStepsConfig.length);
  }, [setTotalSteps]);

  if (!isActive) return null;

  const currentConfig = tourStepsConfig.find(s => s.stepIndex === currentStep);

  // Ensure navigation/progress UI has high z-index and proper layout
  const tourControlsStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '30px', // Increased bottom spacing
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10005, // Ensure it's above tour step tooltip (10002) and overlay (10001)
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Slightly transparent white
    padding: '15px 20px', // Increased padding
    borderRadius: '12px', // More rounded
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', // More pronounced shadow
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px', // Space between progress and navigation
    minWidth: '280px', // Minimum width for better layout
  };

  return (
    <>
      {currentConfig && (
        // The TourStep component itself will be positioned relative to its target.
        // It already has a high z-index.
        <TourStep
          stepIndex={currentConfig.stepIndex}
          targetSelector={currentConfig.targetSelector}
          title={currentConfig.title}
          content={currentConfig.content}
          position={currentConfig.position || 'bottom'}
        >
          {/* If TourStep were designed to accept children for its main content area,
              you could pass more complex JSX here.
              For now, title and content props are used.
              The navigation is explicitly placed outside TourStep for this example.
           */}
        </TourStep>
      )}
      {/* Container for Navigation and Progress */}
      <div style={tourControlsStyle}>
        <TourProgress currentStep={currentStep} totalSteps={totalSteps} />
        <TourNavigation
          currentStep={currentStep}
          totalSteps={totalSteps}
          onNext={() => goToStep(currentStep + 1)}
          onPrev={() => goToStep(currentStep - 1)}
          onEnd={endTour}
        />
      </div>
    </>
  );
};
