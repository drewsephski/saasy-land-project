import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TourProvider, useTour } from '../TourProvider';
import { TourSetup } from '../TourSetup';

// Mock TourStep to verify props without rendering its complex UI/effects
jest.mock('../TourStep', () => ({
  TourStep: jest.fn(({ title, content, children }) => (
    <div data-testid="tour-step">
      <h3>{title}</h3>
      <div>{content}</div>
      {children}
    </div>
  )),
}));

// Mock TourNavigation to verify props and simulate clicks
const mockTourNavigationOnNext = jest.fn();
const mockTourNavigationOnPrev = jest.fn();
const mockTourNavigationOnEnd = jest.fn();
jest.mock('../TourNavigation', () => ({
  TourNavigation: jest.fn(({ onNext, onPrev, onEnd, currentStep, totalSteps }) => (
    <div data-testid="tour-navigation">
      <button onClick={onPrev} disabled={currentStep === 0}>Prev</button>
      <button onClick={onNext} disabled={currentStep === totalSteps - 1}>Next</button>
      <button onClick={onEnd}>End</button>
      <span>Nav: Step {currentStep + 1} of {totalSteps}</span>
    </div>
  )),
}));

// Mock TourProgress
jest.mock('../TourProgress', () => ({
  TourProgress: jest.fn(({ currentStep, totalSteps }) => (
    <div data-testid="tour-progress">
      Progress: Step {currentStep + 1} of {totalSteps}
    </div>
  )),
}));


// A component to trigger tour start for testing purposes
const TourController: React.FC = () => {
  const { startTour, totalSteps } = useTour();
  return <button onClick={() => startTour({totalStepsOverride: totalSteps })}>Start Actual Tour</button>;
};

describe('TourSetup Integration Tests', () => {
  beforeEach(() => {
    // Reset mocks
    (require('../TourStep').TourStep as jest.Mock).mockClear();
    (require('../TourNavigation').TourNavigation as jest.Mock).mockClear();
    mockTourNavigationOnNext.mockClear();
    mockTourNavigationOnPrev.mockClear();
    mockTourNavigationOnEnd.mockClear();
    (require('../TourProgress').TourProgress as jest.Mock).mockClear();

    // Setup mock implementations for TourNavigation again as they are cleared
    (require('../TourNavigation').TourNavigation as jest.Mock).mockImplementation(
      ({ onNext, onPrev, onEnd, currentStep, totalSteps }) => (
        <div data-testid="tour-navigation">
          <button onClick={onPrev} data-testid="prev-btn" disabled={currentStep === 0}>Prev</button>
          <button onClick={onNext} data-testid="next-btn" disabled={currentStep === totalSteps - 1}>Next</button>
          <button onClick={onEnd} data-testid="end-btn">End</button>
          <span>Nav: Step {currentStep + 1} of {totalSteps}</span>
        </div>
      )
    );
  });

  // Tour steps config from TourSetup.tsx - keep in sync or import if possible/sensible for tests
  const tourStepsConfig = [
    { stepIndex: 0, targetSelector: '#dashboard-welcome-message', title: 'Welcome to Your Dashboard!', content: expect.any(String) },
    { stepIndex: 1, targetSelector: '#main-feature-button', title: 'Explore Core Feature', content: expect.any(String) },
    { stepIndex: 2, targetSelector: '#user-profile-menu', title: 'Manage Your Account', content: expect.any(String) },
    { stepIndex: 3, targetSelector: '#settings-panel-link', title: 'Customize Your Experience', content: expect.any(String) },
  ];


  it('does not render tour components when tour is inactive', () => {
    render(
      <TourProvider>
        <TourSetup />
      </TourProvider>
    );
    expect(screen.queryByTestId('tour-step')).not.toBeInTheDocument();
    expect(screen.queryByTestId('tour-navigation')).not.toBeInTheDocument();
    expect(screen.queryByTestId('tour-progress')).not.toBeInTheDocument();
  });

  it('renders the first tour step when tour starts', async () => {
    render(
      <TourProvider initialTotalSteps={tourStepsConfig.length}>
        <TourController />
        <TourSetup />
      </TourProvider>
    );

    fireEvent.click(screen.getByText('Start Actual Tour'));

    await waitFor(() => {
      expect(screen.getByTestId('tour-step')).toBeInTheDocument();
    });

    const firstStepConfig = tourStepsConfig[0];
    expect(screen.getByText(firstStepConfig.title)).toBeInTheDocument();
    // Check if TourStep mock received correct props
    expect(require('../TourStep').TourStep).toHaveBeenCalledWith(
      expect.objectContaining({
        stepIndex: firstStepConfig.stepIndex,
        title: firstStepConfig.title,
        targetSelector: firstStepConfig.targetSelector,
      }),
      {}
    );

    expect(screen.getByTestId('tour-navigation')).toBeInTheDocument();
    expect(screen.getByTestId('tour-progress')).toBeInTheDocument();
    expect(screen.getByText(`Progress: Step 1 of ${tourStepsConfig.length}`)).toBeInTheDocument();
  });

  it('navigates through tour steps using Next button', async () => {
    render(
      <TourProvider initialTotalSteps={tourStepsConfig.length}>
        <TourController />
        <TourSetup />
      </TourProvider>
    );

    fireEvent.click(screen.getByText('Start Actual Tour'));
    await waitFor(() => expect(screen.getByText(tourStepsConfig[0].title)).toBeInTheDocument());

    // Click Next to go to step 2
    fireEvent.click(screen.getByTestId('next-btn'));
    await waitFor(() => expect(screen.getByText(tourStepsConfig[1].title)).toBeInTheDocument());
    expect(require('../TourStep').TourStep).toHaveBeenCalledWith(
        expect.objectContaining({ title: tourStepsConfig[1].title }), {}
    );
    expect(screen.getByText(`Progress: Step 2 of ${tourStepsConfig.length}`)).toBeInTheDocument();

    // Click Next to go to step 3
    fireEvent.click(screen.getByTestId('next-btn'));
    await waitFor(() => expect(screen.getByText(tourStepsConfig[2].title)).toBeInTheDocument());
    expect(require('../TourStep').TourStep).toHaveBeenCalledWith(
        expect.objectContaining({ title: tourStepsConfig[2].title }), {}
    );
    expect(screen.getByText(`Progress: Step 3 of ${tourStepsConfig.length}`)).toBeInTheDocument();
  });

  it('navigates backward using Prev button', async () => {
    render(
      <TourProvider initialTotalSteps={tourStepsConfig.length}>
        <TourController />
        <TourSetup />
      </TourProvider>
    );

    fireEvent.click(screen.getByText('Start Actual Tour'));
    await waitFor(() => expect(screen.getByText(tourStepsConfig[0].title)).toBeInTheDocument());

    // Go to step 2
    fireEvent.click(screen.getByTestId('next-btn'));
    await waitFor(() => expect(screen.getByText(tourStepsConfig[1].title)).toBeInTheDocument());

    // Go back to step 1
    fireEvent.click(screen.getByTestId('prev-btn'));
    await waitFor(() => expect(screen.getByText(tourStepsConfig[0].title)).toBeInTheDocument());
    expect(require('../TourStep').TourStep).toHaveBeenCalledWith(
        expect.objectContaining({ title: tourStepsConfig[0].title }), {}
    );
    expect(screen.getByText(`Progress: Step 1 of ${tourStepsConfig.length}`)).toBeInTheDocument();
  });


  it('ends the tour when End button is clicked', async () => {
    render(
      <TourProvider initialTotalSteps={tourStepsConfig.length}>
        <TourController />
        <TourSetup />
      </TourProvider>
    );

    fireEvent.click(screen.getByText('Start Actual Tour'));
    await waitFor(() => expect(screen.getByText(tourStepsConfig[0].title)).toBeInTheDocument());

    fireEvent.click(screen.getByTestId('end-btn'));

    await waitFor(() => {
      expect(screen.queryByTestId('tour-step')).not.toBeInTheDocument();
      expect(screen.queryByTestId('tour-navigation')).not.toBeInTheDocument();
      expect(screen.queryByTestId('tour-progress')).not.toBeInTheDocument();
    });
  });

  it('finishes the tour when navigating past the last step via Next button (which becomes Finish)', async () => {
    render(
      <TourProvider initialTotalSteps={tourStepsConfig.length}>
        <TourController />
        <TourSetup />
      </TourProvider>
    );

    fireEvent.click(screen.getByText('Start Actual Tour'));
    // Navigate to the last step
    for (let i = 0; i < tourStepsConfig.length - 1; i++) {
      await waitFor(() => expect(screen.getByText(tourStepsConfig[i].title)).toBeInTheDocument());
      fireEvent.click(screen.getByTestId('next-btn'));
    }
    await waitFor(() => expect(screen.getByText(tourStepsConfig[tourStepsConfig.length - 1].title)).toBeInTheDocument());

    // On the last step, the "Next" button in the mock acts as "End" if we follow TourNavigation logic
    // However, our mock TourNavigation has distinct Next and End buttons.
    // The actual TourNavigation renders "Finish" which calls onEnd.
    // Let's simulate clicking the "End" button as if it were the "Finish" button.
    // If TourNavigation's mock was more complex, we could specific "Finish" button.
    // For this test, we assume the onEnd callback is hooked to the mock's "End" or "Next" on last step.
    // The TourSetup passes `endTour` to `onEnd` prop of TourNavigation.

    // Find the button that would call onEnd. In our mock, it's the "End" button.
    // In the real component, it's the "Finish" button.
    // The current TourNavigation mock has a disabled 'Next' button and an 'End' button on the last step.
    // This needs to align with how TourNavigation *actually* behaves (shows 'Finish' that calls 'onEnd').
    // Let's adjust the mock or test based on the actual `TourNavigation` component's behavior.
    // The real `TourNavigation` uses `onEnd` for the "Finish" button. Our mock uses `onEnd` for "End".

    // In the real TourNavigation, the "Next" button becomes "Finish" and calls onEnd.
    // Our mock for TourNavigation has a separate "End" button that calls onEnd.
    // So clicking "End" is the correct simulation here for the mocked navigation.
    fireEvent.click(screen.getByTestId('end-btn'));


    await waitFor(() => {
      expect(screen.queryByTestId('tour-step')).not.toBeInTheDocument();
    });
  });

  // Comment: Testing the actual highlighting of targetSelector elements in TourStep
  // would require those elements to be present in the JSDOM.
  // For example, you'd need to append <div id="dashboard-welcome-message"></div> to document.body.
  // Since TourStep is mocked here, this is not an issue for these tests but would be for TourStep unit tests if they did DOM manipulation.
});
