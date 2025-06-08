import React, { useEffect, useRef, ReactNode, useState } from 'react';
import { useTour } from './TourProvider'; // Assuming TourProvider.tsx is in the same directory

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'center';

interface TourStepProps {
  stepIndex: number;
  targetSelector: string; // CSS selector for the element to highlight
  title: string;
  content: ReactNode;
  position?: TooltipPosition; // For tooltip/modal positioning
  // Optional: onShow, onHide callbacks for this specific step
}

export const TourStep: React.FC<TourStepProps> = ({
  stepIndex,
  targetSelector,
  title,
  content,
  position = 'bottom',
}) => {
  const { currentStep, isActive } = useTour();
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let targetElement: Element | null = null;
    if (isActive && currentStep === stepIndex) {
      targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        targetElement.classList.add('tour-highlight');
        // Micro-interaction: Animate the highlighting effect (e.g., pulse, smooth border)
        // Consider a dedicated library for more complex highlighting/overlay features.
        console.log(`Highlighting target: ${targetSelector}`);

        // Trigger appearance animation
        setIsVisible(true);

        // Placeholder: Advanced positioning logic for the tooltip/modal
        // This might involve calculating targetElement's position and dimensions.
        // Libraries like 'Popper.js' or 'Floating UI' are excellent for this.
        // For now, basic CSS handles positioning.
        if (tooltipRef.current) {
          // Apply basic position class - actual styling in CSS
          tooltipRef.current.className = `tour-tooltip tour-tooltip-${position} tour-tooltip-visible`;
        }
      } else {
        console.warn(`TourStep: Target element not found for selector: ${targetSelector}`);
        setIsVisible(false); // Ensure tooltip is not shown if target is missing
      }
    } else {
      setIsVisible(false); // Hide if not active step
    }

    return () => {
      // Cleanup: Remove highlighting when step changes or tour ends
      if (targetElement) {
        targetElement.classList.remove('tour-highlight');
        console.log(`Removed highlight from target: ${targetSelector}`);
      }
      // Hide tooltip on cleanup if it was visible for this step
      // setIsVisible(false); // This might cause a flicker if next step shows immediately.
                           // Animation out could be handled by CSS on class removal.
    };
  }, [currentStep, stepIndex, isActive, targetSelector, position]);

  if (!isActive || currentStep !== stepIndex) {
    // Allow CSS to handle exit animation if isVisible was true and becomes false
    // The component still needs to render briefly for the exit animation to play.
    // A more robust solution might use react-transition-group or Framer Motion here.
    if (!isVisible && tooltipRef.current?.classList.contains('tour-tooltip-visible')) {
      // If we want an explicit exit animation managed by isVisible
    } else if (!isVisible) {
        return null;
    }
  }

  // Apply isVisible to control the animation classes
  const tooltipClasses = `
    tour-tooltip
    tour-tooltip-${position}
    ${isVisible ? 'tour-tooltip-entering' : 'tour-tooltip-exiting'}
  `;

  // Basic JSX structure for the tooltip/modal
  // Actual styling and advanced positioning would be handled via CSS and potentially a positioning library
  return (
    <div ref={tooltipRef} className={tooltipClasses}>
      {/* Placeholder for a pulsating hotspot or attention-grabbing animation on the tooltip itself */}
      {/* This could be a ::before or ::after pseudo-element with a CSS animation */}
      <div className="tour-tooltip-attention-grabber"></div>
      <h3>{title}</h3>
      <div>{content}</div>
      {/* TourNavigation component will be typically rendered here or passed by parent */}
      {/* <TourNavigation onNext={...} onPrev={...} onEnd={...} /> */}
      <style jsx global>{`
        /* Global styles for tour elements - consider moving to a tour.css if extensive */

        /* Highlighting for the target element */
        .tour-highlight {
          outline: 3px solid #007bff; /* Brighter blue, slightly thicker */
          /* Using box-shadow for the overlay effect to punch a hole */
          box-shadow: 0 0 0 5000px rgba(0, 0, 0, 0.55); /* Increased alpha for darker overlay */
          position: relative; /* Needed for z-index to work correctly with the overlay */
          z-index: 10001 !important; /* High z-index to be above other page content */
          border-radius: 6px; /* Softer radius */
          transition: outline 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }

        /* Tour Tooltip/Modal Styling */
        .tour-tooltip {
          position: fixed; /* Fixed position relative to viewport; JS needed for target-relative */
          background-color: #ffffff; /* Clean white background */
          color: #333333; /* Dark grey text for good contrast */
          border: 1px solid #e0e0e0; /* Softer border color */
          border-radius: 8px;
          padding: 20px; /* Increased padding */
          z-index: 10002 !important; /* Above highlight and overlay */
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15); /* Softer, more diffused shadow */
          width: 320px;
          max-width: calc(100vw - 40px); /* Ensure it doesn't overflow viewport */
          opacity: 0;
          transform: scale(0.95) translateY(15px);
          transition: opacity 0.25s ease-out, transform 0.25s ease-out;
          font-size: 15px; /* Base font size */
          line-height: 1.6; /* Improved readability */
        }

        .tour-tooltip h3 { /* Title styling */
          margin-top: 0;
          margin-bottom: 12px;
          font-size: 18px;
          color: #1a1a1a; /* Darker title */
        }

        .tour-tooltip.tour-tooltip-entering {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
        .tour-tooltip.tour-tooltip-exiting {
          opacity: 0;
          transform: scale(0.95) translateY(15px);
          /* Proper exit animation handling would ideally use react-transition-group or similar */
        }

        /* Pulsating hotspot for the tooltip itself - more subtle */
        .tour-tooltip-attention-grabber {
          position: absolute;
          top: 8px; /* Adjusted position */
          right: 8px; /* Adjusted position */
          width: 12px; /* Smaller */
          height: 12px; /* Smaller */
          background-color: #007bff;
          border-radius: 50%;
          opacity: 0.8; /* Slightly more opaque */
          animation: pulse-grabber 1.8s infinite ease-in-out;
        }
        @keyframes pulse-grabber { /* Renamed and refined animation */
          0% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.5); }
          50% { transform: scale(1.1); box-shadow: 0 0 0 8px rgba(0, 123, 255, 0); }
          100% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(0, 123, 255, 0); }
        }

        /* Basic Positioning (these are class stubs, actual positioning is complex) */
        /* For accurate dynamic positioning relative to targetSelector, JavaScript is essential.
           Libraries like Popper.js or Floating UI are recommended.
           The CSS below provides fallback/default fixed positions if JS isn't fully implemented. */
        .tour-tooltip-bottom { margin-top: 15px; /* Default spacing if JS positions at target's bottom edge */ }
        .tour-tooltip-top { margin-bottom: 15px; /* Default spacing */ }
        .tour-tooltip-left { margin-right: 15px; /* Default spacing */ }
        .tour-tooltip-right { margin-left: 15px; /* Default spacing */ }
        .tour-tooltip-center {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.95); /* Initial transform for animation */
        }
        .tour-tooltip-center.tour-tooltip-entering {
            transform: translate(-50%, -50%) scale(1); /* Final transform for animation */
        }
      `}</style>
    </div>
  );
};
