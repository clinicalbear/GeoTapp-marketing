/**
 * Google Analytics 4 wrapper
 */

declare global {
  interface Window {
    gtag: (command: string, ...args: (string | Record<string, unknown>)[]) => void;
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA4_ID;
export const isAnalyticsEnabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true' && GA_ID;

/**
 * Track page view
 */
export const pageview = (url: string) => {
  if (!isAnalyticsEnabled || !GA_ID) return;

  if (window.gtag) {
    window.gtag('config', GA_ID, {
      page_path: url,
    });
  }
};

/**
 * Track event
 */
export const event = (action: string, options?: Record<string, unknown>) => {
  if (!isAnalyticsEnabled) return;

  if (window.gtag) {
    window.gtag('event', action, options || {});
  }
};

/**
 * Track conversion
 */
export const trackConversion = (conversionType: string, value?: number) => {
  if (!isAnalyticsEnabled) return;

  event('conversion', {
    conversion_type: conversionType,
    value: value || 1,
  });
};

/**
 * Track CTA click
 */
export const trackCTAClick = (planName: string) => {
  event('cta_click', {
    plan: planName,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track form submission
 */
export const trackFormSubmission = (formType: string) => {
  event('form_submit', {
    form_type: formType,
    timestamp: new Date().toISOString(),
  });
};