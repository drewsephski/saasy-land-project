import React, { createContext, useState, useContext, ReactNode } from 'react';

interface TourState {
  currentStep: number;
  isActive: boolean;
  totalSteps: number;
  startTour: (options?: { initialStep?: number; totalStepsOverride?: number }) => void;
  endTour: () => void;
  goToStep: (stepIndex: number) => void;
  setTotalSteps: (count: number) => void;
}

const TourContext = createContext<TourState | undefined>(undefined);

export const useTour = (): TourState => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};

interface TourProviderProps {
  children: ReactNode;
  initialTotalSteps?: number; // Allow setting total steps via prop
  // Optional: onTourStart, onTourEnd callbacks
}

export const TourProvider: React.FC<TourProviderProps> = ({ children, initialTotalSteps = 0 }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [totalSteps, setTotalStepsState] = useState<number>(initialTotalSteps);

  // Placeholder: Integrate with global state management (e.g., Redux, Zustand) if needed
  // For example, to dispatch actions or select global state that might affect the tour.

  const startTour = (options?: { initialStep?: number; totalStepsOverride?: number }) => {
    const startStep = options?.initialStep ?? 0;
    if (options?.totalStepsOverride !== undefined) {
      setTotalStepsState(options.totalStepsOverride);
    }
    // Ensure totalSteps is set if not provided via override or prop,
    // TourSetup component is expected to call setTotalSteps as well.
    if (totalSteps === 0 && options?.totalStepsOverride === undefined && initialTotalSteps === 0) {
        console.warn("TourProvider: totalSteps is 0. Ensure it's set via prop or TourSetup.");
    }

    setCurrentStep(startStep);
    setIsActive(true);
    console.log(`Tour started at step ${startStep}. Total steps: ${options?.totalStepsOverride ?? totalSteps}`);
    // Micro-interaction: Animate the appearance of the first tour step
  };

  const endTour = () => {
    setIsActive(false);
    setCurrentStep(0); // Reset step
    console.log('Tour ended');
    // Micro-interaction: Animate the disappearance of the tour UI
    // Placeholder: Remove any highlighting overlays
  };

  const setTotalSteps = (count: number) => {
    setTotalStepsState(count);
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex < 0 || stepIndex >= totalSteps) {
      console.warn(`goToStep: stepIndex ${stepIndex} is out of bounds (0-${totalSteps -1}). Ending tour.`);
      endTour();
      return;
    }

    // For smoother transitions between steps, especially if TourStep components
    // have exit/entry animations, consider the following:
    // 1. If using a library like react-transition-group or Framer Motion,
    //    the library would handle the animation states. `currentStep` would
    //    just update, and the components would animate in/out.
    // 2. Manual approach:
    //    a. Set an intermediate state like `isTransitioningOut` to true.
    //    b. The current TourStep uses this to play an exit animation.
    //    c. After the animation duration (e.g., via setTimeout or onAnimationEnd),
    //       update `currentStep` to `stepIndex`.
    //    d. Set `isTransitioningOut` to false. The new TourStep then plays its entry animation.
    // This adds complexity. For simpler cases, direct `currentStep` update is fine,
    // and CSS on TourStep handles its own appearance.
    // The `TourStep.tsx` current implementation uses a simple boolean `isVisible`
    // which is fine for entry but doesn't explicitly handle exit animations before unmounting.
    // A library would be better for robust enter/exit sequences.

    setCurrentStep(stepIndex);
    console.log(`Navigated to step: ${stepIndex}`);
    // Micro-interaction: The actual smooth transition is visually handled by
    // TourStep's appearance/disappearance animations based on `currentStep` change.
  };

  const value = {
    currentStep,
    isActive,
    totalSteps,
    startTour,
    endTour,
    goToStep,
    setTotalSteps,
  };

  return <TourContext.Provider value={value}>{children}</TourContext.Provider>;
};
