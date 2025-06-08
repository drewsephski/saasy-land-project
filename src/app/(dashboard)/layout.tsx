"use client"; // Required for context and hooks

import React, { ReactNode } from 'react';
import { TourProvider, useTour } from '../../components/tour/TourProvider'; // Adjust path as needed
import { TourSetup } from '../../components/tour/TourSetup'; // Adjust path as needed

// A small component to consume the tour context for the button
const StartTourButton: React.FC = () => {
  const { startTour, isActive } = useTour();

  if (isActive) return null; // Optionally hide button if tour is active

  const handleStartTour = () => {
    // Pass totalSteps when starting the tour, or ensure TourSetup calls setTotalSteps
    // For this setup, TourSetup calls setTotalSteps via useEffect.
    startTour();
  };

  return (
    <button
      onClick={handleStartTour}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '10px 15px',
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        zIndex: 9999, // Ensure it's above most content but below tour UI if active
      }}
    >
      Start Tour
    </button>
  );
};

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  // These are placeholder elements that the tour steps will target.
  // In a real application, these would be part of your actual dashboard UI.
  const MockDashboardElements: React.FC = () => (
    <>
      <div id="dashboard-welcome-message" style={{ padding: '20px', margin: '20px 0', background: '#f0f0f0' }}>
        <h2>Welcome to the Dashboard! (Placeholder for Tour)</h2>
        <p>This is a placeholder for #dashboard-welcome-message.</p>
      </div>
      <button id="main-feature-button" style={{ padding: '10px', margin: '10px' }}>
        Core Feature Action (Placeholder for Tour)
      </button>
      <div id="user-profile-menu" style={{ position: 'absolute', top: '70px', right: '20px', padding: '10px', background: 'lightgray' }}>
        User Profile (Placeholder for Tour)
      </div>
      <a href="#" id="settings-panel-link" style={{ display: 'block', margin: '10px', color: 'blue' }}>
        Settings Panel Link (Placeholder for Tour)
      </a>
    </>
  );


  return (
    <TourProvider initialTotalSteps={4}>
      {/* TourProvider needs to wrap everything that will use the tour context
          or be part of the tourable UI (for overlays etc.) */}
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        {/* This button needs to be a child of TourProvider to use useTour hook */}
        <StartTourButton />

        {/* Mock elements for the tour to target. Remove in a real app. */}
        <MockDashboardElements />

        <main>{children}</main>

        {/* TourSetup renders the active TourStep and navigation */}
        <TourSetup />
      </div>
    </TourProvider>
  );
};

export default DashboardLayout;
