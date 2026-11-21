import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Updates per-page <title> and <meta name="description"> for SEO
 * and scrolls window to top on route navigation.
 */
export default function SEOHead({ title, description }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (title) {
      document.title = title;
    }
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }
  }, [title, description]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
