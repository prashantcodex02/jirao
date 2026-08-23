import React, { useEffect } from 'react';
import './Home.css';
import SEOHead from '../../components/SEOHead/SEOHead';
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

const homeSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.jirasoorganics.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Shop Wood-Pressed Oils',
      item: 'https://www.jirasoorganics.com/products',
    },
  ],
};

export default function Home() {
  return (
    <div className="home-page">
      <SEOHead
        title="Premium Wood-Pressed Oils | Natural, Chemical-Free Cooking Oils"
        description="Shop 100% pure wood-pressed & cold-pressed cooking oils online. JIRASO Organics — traditional kachi ghani mustard oil, sesame oil, coconut oil & groundnut oil. Chemical-free, no heat, no additives. Free delivery across India."
        canonical="https://www.jirasoorganics.com/"
        schemaJson={homeSchema}
      />
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