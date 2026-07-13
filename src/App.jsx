import React from 'react';
import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero';
import Problems from './components/problems/Problems'; // NEW
import Workflow from './components/workflow/Workflow';
import Modules from './components/modules/Modules';
import Journey from './components/journey/Journey';
import Industries from './components/industries/Industries';
import Implementation from './components/implementation/Implementation';
import ProductTour from './components/productTour/ProductTour';
import FeatureHighlights from './components/featureHighlights/FeatureHighlights'; // NEW
import Transformation from './components/transformation/Transformation'; // NEW
import Testimonials from './components/testimonials/Testimonials'; // NEW
import FAQ from './components/faq/Faq'; // NEW
import Footer from './components/footer/Footer';


function App() {
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
        <Implementation />
        <ProductTour />
        <FeatureHighlights />
        <Transformation />
        <Testimonials />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}

export default App;