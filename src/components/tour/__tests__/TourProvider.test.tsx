import React, { ReactNode } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TourProvider, useTour, TourState } from '../TourProvider';

// Mock consumer component to test context propagation
const TestConsumer: React.FC<{ onRender?: (context: TourState) => void }> = ({ onRender }) => {
  const tourContext = useTour();
  if (onRender) {
    onRender(tourContext);
  }
  return (
    <div>
      <span>Current Step: {tourContext.currentStep}</span>
      <span>Is Active: {tourContext.isActive.toString()}</span>
      <span>Total Steps: {tourContext.totalSteps}</span>
      <button onClick={() => tourContext.startTour({ totalStepsOverride: 3 })}>Start</button>
      <button onClick={tourContext.endTour}>End</button>
      <button onClick={() => tourContext.goToStep(1)}>Go To Step 1</button>
      <button onClick={() => tourContext.setTotalSteps(5)}>Set Total Steps</button>
    </div>
  );
};

describe('TourProvider', () => {
  it('provides initial state correctly', () => {
    let contextState: TourState | null = null;
    render(
      <TourProvider initialTotalSteps={0}>
        <TestConsumer onRender={(context) => { contextState = context; }} />
      </TourProvider>
    );

    expect(contextState?.isActive).toBe(false);
    expect(contextState?.currentStep).toBe(0);
    expect(contextState?.totalSteps).toBe(0); // Initialized via prop
  });

  it('allows setting totalSteps via prop', () => {
    let contextState: TourState | null = null;
    render(
      <TourProvider initialTotalSteps={10}>
        <TestConsumer onRender={(context) => { contextState = context; }} />
      </TourProvider>
    );
    expect(contextState?.totalSteps).toBe(10);
  });


  it('startTour function activates the tour and sets steps', () => {
    let contextState: TourState | null = null;
    render(
      <TourProvider>
        <TestConsumer onRender={(context) => { contextState = context; }} />
      </TourProvider>
    );

    act(() => {
      // Simulate calling startTour, e.g., from a button click in TestConsumer or directly
      contextState?.startTour({ totalStepsOverride: 5, initialStep: 0 });
    });

    expect(contextState?.isActive).toBe(true);
    expect(contextState?.currentStep).toBe(0);
    expect(contextState?.totalSteps).toBe(5);
  });

  it('startTour function can start at a specific step', () => {
    let contextState: TourState | null = null;
    render(
      <TourProvider initialTotalSteps={5}>
        <TestConsumer onRender={(context) => { contextState = context; }} />
      </TourProvider>
    );

    act(() => {
      contextState?.startTour({ initialStep: 2 });
    });

    expect(contextState?.isActive).toBe(true);
    expect(contextState?.currentStep).toBe(2);
    expect(contextState?.totalSteps).toBe(5); // Remains from initialTotalSteps
  });


  it('endTour function deactivates the tour and resets step', () => {
    let contextState: TourState | null = null;
    render(
      <TourProvider>
        <TestConsumer onRender={(context) => { contextState = context; }} />
      </TourProvider>
    );

    act(() => {
      contextState?.startTour({ totalStepsOverride: 3 }); // Start tour first
    });
    act(() => {
      contextState?.endTour();
    });

    expect(contextState?.isActive).toBe(false);
    expect(contextState?.currentStep).toBe(0); // Resets to 0
  });

  it('goToStep function updates currentStep within bounds', () => {
    let contextState: TourState | null = null;
    render(
      <TourProvider initialTotalSteps={3}> {/* Important: set totalSteps for bounds checking */}
        <TestConsumer onRender={(context) => { contextState = context; }} />
      </TourProvider>
    );

    act(() => {
      contextState?.startTour(); // Start tour, totalSteps is 3
    });
    act(() => {
      contextState?.goToStep(1);
    });
    expect(contextState?.currentStep).toBe(1);

    act(() => {
      contextState?.goToStep(2);
    });
    expect(contextState?.currentStep).toBe(2);

    // Test boundaries
    act(() => {
      contextState?.goToStep(3); // Out of bounds (0, 1, 2 are valid)
    });
    // goToStep includes logic to endTour if out of bounds
    expect(contextState?.isActive).toBe(false);
    expect(contextState?.currentStep).toBe(0); // Resets due to endTour

    // Restart and test lower bound
     act(() => {
      contextState?.startTour({totalStepsOverride: 3});
    });
    act(() => {
      contextState?.goToStep(1); // Back to a valid step
    });
     expect(contextState?.currentStep).toBe(1);
    act(() => {
      contextState?.goToStep(-1); // Out of bounds
    });
    expect(contextState?.isActive).toBe(false);
    expect(contextState?.currentStep).toBe(0);
  });

  it('setTotalSteps function updates totalSteps', () => {
    let contextState: TourState | null = null;
    render(
      <TourProvider>
        <TestConsumer onRender={(context) => { contextState = context; }} />
      </TourProvider>
    );

    act(() => {
      contextState?.setTotalSteps(7);
    });
    expect(contextState?.totalSteps).toBe(7);
  });

  it('propagates context correctly to a consumer component via useTour', () => {
    render(
      <TourProvider initialTotalSteps={3}>
        <TestConsumer />
      </TourProvider>
    );

    expect(screen.getByText('Is Active: false')).toBeInTheDocument();
    expect(screen.getByText('Current Step: 0')).toBeInTheDocument();
    expect(screen.getByText('Total Steps: 3')).toBeInTheDocument();

    // Test updates through UI interaction on TestConsumer
    fireEvent.click(screen.getByText('Start'));
    expect(screen.getByText('Is Active: true')).toBeInTheDocument();
    // totalStepsOverride in TestConsumer's start button is 3
    expect(screen.getByText('Total Steps: 3')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Go To Step 1'));
    expect(screen.getByText('Current Step: 1')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Set Total Steps'));
    expect(screen.getByText('Total Steps: 5')).toBeInTheDocument();

    fireEvent.click(screen.getByText('End'));
    expect(screen.getByText('Is Active: false')).toBeInTheDocument();
    expect(screen.getByText('Current Step: 0')).toBeInTheDocument();
  });
});
