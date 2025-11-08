/**
 * Form validation utilities
 */

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone format (international)
 */
export const validatePhone = (phone: string): boolean => {
  if (!phone) return true; // Phone is optional
  const phoneRegex = /^[\d\s\-\+\(\)\.]{6,}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate name (min 2 chars)
 */
export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

/**
 * Validate message (min 10 chars)
 */
export const validateMessage = (message: string): boolean => {
  return message.trim().length >= 10;
};

/**
 * Sanitize HTML input
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Check password strength
 */
export const checkPasswordStrength = (password: string): {
  score: number;
  feedback: string[];
} => {
  let score = 0;
  const feedback = [];

  if (!password) {
    return { score: 0, feedback: ['Password is required'] };
  }

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*]/.test(password)) score++;

  if (score < 2) feedback.push('Too weak');
  if (score === 2 || score === 3) feedback.push('Weak');
  if (score === 4 || score === 5) feedback.push('Strong');
  if (score >= 6) feedback.push('Very strong');

  return { score, feedback: feedback.length ? feedback : ['Weak'] };
};

/**
 * Format phone number
 */
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+39 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }
  return phone;
};

/**
 * Validate URL
 */
export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};