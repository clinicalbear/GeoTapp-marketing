/**
 * API Service Layer
 * Handles all communication with Django backend
 *
 * NOTE:
 * - In produzione usiamo il proxy di Cloudflare Pages: "/api/*"
 * - In locale puoi sovrascrivere con .env.local: NEXT_PUBLIC_BACKEND_API=http://127.0.0.1:8000/api
 */

const API_BASE =
  (process.env.NEXT_PUBLIC_BACKEND_API?.replace(/\/$/, "") || "/api");

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode: number;
}

interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}

interface NewsletterSubscription {
  email: string;
  name?: string;
  company?: string;
}

/**
 * Generic fetch wrapper with error handling (senza `any`)
 */
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = (API_BASE.endsWith("/") ? API_BASE.slice(0, -1) : API_BASE) + endpoint;

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    const ct = response.headers.get("content-type") || "";
    let parsed: unknown;

    if (ct.includes("application/json")) {
      parsed = await response.json();
    } else {
      const text = await response.text();
      parsed = { detail: text } as const;
    }

    if (!response.ok) {
      let message: string | undefined;
      if (parsed && typeof parsed === "object") {
        const obj = parsed as Record<string, unknown>;
        if (typeof obj.detail === "string") message = obj.detail;
        else if (typeof obj.error === "string") message = obj.error;
      }
      return {
        success: false,
        error: message ?? `HTTP ${response.status.toString()}`,
        statusCode: response.status,
      };
    }

    return {
      success: true,
      data: parsed as T,
      statusCode: response.status,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Network error";
    return {
      success: false,
      error: errorMessage,
      statusCode: 0,
    };
  }
}

/**
 * Send contact message
 * (su Pages verrà proxato a https://geotapp-backend.onrender.com/api/contact/)
 */
export async function sendContactMessage(
  message: ContactMessage
): Promise<ApiResponse<{ id?: number; message?: string }>> {
  return apiCall("/contact/", {
    method: "POST",
    body: JSON.stringify({
      name: message.name,
      email: message.email,
      subject: message.subject,
      message: message.message,
      phone: message.phone ?? "",
    }),
  });
}

/**
 * Subscribe to newsletter
 */
export async function subscribeNewsletter(
  subscription: NewsletterSubscription
): Promise<ApiResponse<{ email: string; subscribed: boolean }>> {
  return apiCall("/newsletter-subscribe/", {
    method: "POST",
    body: JSON.stringify({
      email: subscription.email,
      name: subscription.name ?? "",
      company: subscription.company ?? "",
    }),
  });
}

/**
 * Get checkout session URL for plan (proxy Pages)
 */
export function getCheckoutUrl(plan: "basic" | "pro"): string {
  return `/api/checkout/?plan=${encodeURIComponent(plan)}`;
}

/**
 * Get platform stats
 */
export async function getPlatformStats() {
  return apiCall("/platform-stats/");
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Check API health (proxy → /api/health/)
 */
export async function checkApiHealth(): Promise<boolean> {
  const res = await apiCall("/health/", { method: "GET", cache: "no-store" });
  return res.success;
}

/**
 * Get testimonials/reviews
 */
export async function getTestimonials() {
  return apiCall("/testimonials/");
}

/**
 * Get blog posts
 */
export async function getBlogPosts(limit?: number) {
  const url = limit ? `/blog/?limit=${limit}` : "/blog/";
  return apiCall(url);
}

/**
 * Get case studies
 */
export async function getCaseStudies() {
  return apiCall("/case-studies/");
}

/**
 * Get pricing information with dynamic values
 */
export async function getPricingInfo() {
  return apiCall("/pricing-info/");
}
