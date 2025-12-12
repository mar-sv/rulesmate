/**
 * Analytics Service
 * 
 * TODO: Replace GA_MEASUREMENT_ID with your Google Analytics 4 Measurement ID
 * Format: G-XXXXXXXXXX
 */

const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // TODO: Replace with your GA4 ID

// Check if gtag is available
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Initialize Google Analytics
 * Call this once in your app entry point (main.tsx or App.tsx)
 */
export function initAnalytics(): void {
  if (GA_MEASUREMENT_ID === "G-XXXXXXXXXX") {
    console.log("[Analytics] Skipping - No GA_MEASUREMENT_ID configured");
    return;
  }

  // Load gtag script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);

  console.log("[Analytics] Initialized with ID:", GA_MEASUREMENT_ID);
}

/**
 * Track page view
 */
export function trackPageView(path: string, title?: string): void {
  if (!window.gtag) return;
  
  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title,
  });
}

/**
 * Track custom event
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (!window.gtag) return;
  
  window.gtag("event", eventName, params);
}

// ============================================
// PREDEFINED EVENTS FOR RULES MATE
// ============================================

export function trackGameSearch(query: string): void {
  trackEvent("game_search", { search_term: query });
}

export function trackGameSelected(gameName: string): void {
  trackEvent("game_selected", { game_name: gameName });
}

export function trackIntentSelected(intent: string): void {
  trackEvent("intent_selected", { intent });
}

export function trackChatStarted(game: string, intent: string): void {
  trackEvent("chat_started", { game, intent });
}

export function trackChatMessage(role: "user" | "assistant"): void {
  trackEvent("chat_message", { role });
}

export function trackFeedbackSubmitted(): void {
  trackEvent("feedback_submitted");
}
