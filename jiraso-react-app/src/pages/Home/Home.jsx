import React, { useEffect } from 'react';
import './Home.css';
import Hero from '../../components/Hero/Hero';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import Editorial from '../../components/Editorial/Editorial';
import StripGallery from '../../components/StripGallery/StripGallery';
import Stats from '../../components/Stats/Stats';
import Spotlight from '../../components/Spotlight/Spotlight';
import Comparison from '../../components/Comparison/Comparison';
import Testimonial from '../../components/Testimonial/Testimonial';
import FAQ from '../../components/FAQ/FAQ';
import Education from '../../components/Education/Education';

export default function Home() {
  return (
    <div className="home-page">
      <Hero />
      <ProductGrid />
      <Editorial />
      <StripGallery />
      <Stats />
      <Spotlight />
      <Comparison />
      <Testimonial />
      <FAQ />
      <Education />
    </div>
  );
}