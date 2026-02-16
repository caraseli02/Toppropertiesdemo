/**
 * Escape HTML content to prevent XSS attacks.
 * Uses DOM-based escaping for security.
 *
 * @param text - The text to escape
 * @returns HTML-safe string
 */
export function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Validate that a string contains only safe characters.
 * Returns false if potentially dangerous characters are present.
 *
 * @param text - The text to validate
 * @returns true if safe, false if potentially dangerous
 */
export function isSafeText(text: string): boolean {
  // Check for common XSS patterns
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,  // Events like onclick=
    /<iframe/i,
    /<object/i,
  ];

  return !dangerousPatterns.some(pattern => pattern.test(text));
}
