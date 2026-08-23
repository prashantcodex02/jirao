import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'JIRASO Organics';
const DEFAULT_OG_IMAGE = 'https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/hero.png?_a=BAMCr6WO0';
const BASE_URL = 'https://www.jirasoorganics.com';

/**
 * SEOHead - Reusable SEO component for dynamic per-page meta tags.
 * @param {string} title - Page title (will be appended with " | JIRASO Organics" if not home)
 * @param {string} description - Meta description (max ~160 chars for best results)
 * @param {string} canonical - Full canonical URL for this page
 * @param {string} ogImage - Open Graph image URL (optional, defaults to hero)
 * @param {string} ogType - OG type, default "website"
 * @param {object|Array} schemaJson - Structured data (JSON-LD) object or array of objects
 */
export default function SEOHead({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  schemaJson = null,
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} – Premium Wood-Pressed Oils | Natural & Chemical-Free | India`;

  const schemaArray = schemaJson
    ? Array.isArray(schemaJson)
      ? schemaJson
      : [schemaJson]
    : [];

  return (
    <Helmet>
      {/* ── Primary ── */}
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* ── Open Graph ── */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:locale" content="en_IN" />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage} />

      {/* ── Structured Data (JSON-LD) ── */}
      {schemaArray.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
