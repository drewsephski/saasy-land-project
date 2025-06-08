import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TourNavigation } from '../TourNavigation';

describe('TourNavigation', () => {
  const mockOnNext = jest.fn();
  const mockOnPrev = jest.fn();
  const mockOnEnd = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    mockOnNext.mockClear();
    mockOnPrev.mockClear();
    mockOnEnd.mockClear();
  });

  it('renders Previous, Next, and End Tour buttons correctly on intermediate steps', () => {
    render(
      <TourNavigation
        currentStep={1}
        totalSteps={3}
        onNext={mockOnNext}
        onPrev={mockOnPrev}
        onEnd={mockOnEnd}
      />
    );

    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    // The current TourNavigation component shows "Finish" on the last step, not "End Tour" alongside "Next".
    // If an "End Tour" button was always visible, this test would change.
    // Let's assume the current logic: "Next" or "Finish".
    expect(screen.queryByRole('button', { name: /finish/i })).not.toBeInTheDocument();
  });

  it('disables Previous button on the first step (step 0)', () => {
    render(
      <TourNavigation
        currentStep={0}
        totalSteps={3}
        onNext={mockOnNext}
        onPrev={mockOnPrev}
        onEnd={mockOnEnd}
      />
    );
    // The Previous button is not rendered on the first step due to conditional rendering
    expect(screen.queryByRole('button', { name: /previous/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeEnabled();
  });

  it('renders Finish button instead of Next button on the last step', () => {
    render(
      <TourNavigation
        currentStep={2} // Last step
        totalSteps={3}
        onNext={mockOnNext}
        onPrev={mockOnPrev}
        onEnd={mockOnEnd}
      />
    );

    expect(screen.getByRole('button', { name: /previous/i })).toBeEnabled();
    expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /finish/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /finish/i })).toBeEnabled();
  });

  it('handles a tour with only one step correctly', () => {
    render(
      <TourNavigation
        currentStep={0} // First and last step
        totalSteps={1}
        onNext={mockOnNext}
        onPrev={mockOnPrev}
        onEnd={mockOnEnd}
      />
    );
    expect(screen.queryByRole('button', { name: /previous/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /finish/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /finish/i })).toBeEnabled();
  });


  it('calls onPrev when Previous button is clicked', () => {
    render(
      <TourNavigation
        currentStep={1}
        totalSteps={3}
        onNext={mockOnNext}
        onPrev={mockOnPrev}
        onEnd={mockOnEnd}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /previous/i }));
    expect(mockOnPrev).toHaveBeenCalledTimes(1);
  });

  it('calls onNext when Next button is clicked', () => {
    render(
      <TourNavigation
        currentStep={1}
        totalSteps={3}
        onNext={mockOnNext}
        onPrev={mockOnPrev}
        onEnd={mockOnEnd}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });

  it('calls onEnd when Finish button is clicked (on last step)', () => {
    render(
      <TourNavigation
        currentStep={2} // Last step
        totalSteps={3}
        onNext={mockOnNext}
        onPrev={mockOnPrev}
        onEnd={mockOnEnd}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /finish/i }));
    expect(mockOnEnd).toHaveBeenCalledTimes(1);
  });

  it('does not render Previous button if totalSteps is 0 or 1', () => {
    const { rerender } = render(
      <TourNavigation currentStep={0} totalSteps={0} onNext={mockOnNext} onPrev={mockOnPrev} onEnd={mockOnEnd} />
    );
    expect(screen.queryByRole('button', { name: /previous/i })).not.toBeInTheDocument();

    rerender(
      <TourNavigation currentStep={0} totalSteps={1} onNext={mockOnNext} onPrev={mockOnPrev} onEnd={mockOnEnd} />
    );
    expect(screen.queryByRole('button', { name: /previous/i })).not.toBeInTheDocument();
  });
});
