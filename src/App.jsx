import React, { useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';

import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero';
import Problems from './components/problems/Problems';
import Workflow from './components/workflow/Workflow';
import Modules from './components/modules/Modules';
import Journey from './components/journey/Journey';
import Industries from './components/industries/Industries';
import Implementation from './components/implementation/Implementation';
import ProductTour from './components/productTour/ProductTour';
import FeatureHighlights from './components/featureHighlights/FeatureHighlights';
import DemoVideo from './components/demoVideo/DemoVideo'; // IMPORT IT HERE
import Pricing from  './components/pricing/Pricing';
import Transformation from './components/transformation/Transformation';
import Testimonials from './components/testimonials/Testimonials';
import FAQ from './components/faq/Faq';
import Footer from './components/footer/Footer';

// IMPORT YOUR DEMO DIALOG
import DemoDialog from './components/demo/DemoDialog';

function App() {
  // --- SCROLL POPUP STATE ---
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  
  // FIX: Added the missing 30% state variable here!
  const [hasTriggered30, setHasTriggered30] = useState(false);
  const [hasTriggered50, setHasTriggered50] = useState(false);
  const [hasTriggered75, setHasTriggered75] = useState(false);

  // Track the total scroll progress of the entire webpage (0.0 to 1.0)
  const { scrollYProgress } = useScroll();

  // Listen to the scroll position efficiently
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    
    // 30% Trigger
    if (latest >= 0.3 && !hasTriggered30) {
      setIsDemoOpen(true);
      setHasTriggered30(true);
    }

    // 50% Trigger
    if (latest >= 0.5 && !hasTriggered50) {
      setIsDemoOpen(true);
      setHasTriggered50(true);
    }

    // 75% Trigger
    if (latest >= 0.75 && !hasTriggered75) {
      setIsDemoOpen(true);
      setHasTriggered75(true);
    }
  });

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problems />
        <Workflow />
        <Modules />
        <Journey />
        <Industries />
        <DemoVideo />
        <Implementation />
        <ProductTour />
        <FeatureHighlights />
        <Pricing />
        <Transformation />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />

      {/* 
        This is the Global Scroll-Triggered Dialog.
        It sits at the root level so it covers the whole screen when triggered!
      */}
      <DemoDialog 
        isOpen={isDemoOpen} 
        onClose={() => setIsDemoOpen(false)} 
      />
      <Analytics />
    </>
  );
}

export default App;