/**
 * Centralized API service for DeepSearch backend communication.
 * All requests target the Railway backend via VITE_API_BASE_URL.
 */

const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const headers = { 'Content-Type': 'application/json' };

/**
 * Initialize a backend session when the chatbot widget opens.
 * Returns { session_id, created_at } or null on network failure.
 */
export async function initSession({ locale = 'it', sourceFlow = null } = {}) {
  try {
    const res = await fetch(`${BASE}/api/v1/sessions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ locale, source_flow: sourceFlow }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[api] initSession failed — proceeding without backend session:', err.message);
    return null;
  }
}

/**
 * Capture a qualified lead at form submission.
 * Returns the parsed response body, or throws on failure.
 */
export async function captureLead(payload) {
  const res = await fetch(`${BASE}/api/v1/leads/capture`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}

/**
 * Health check — useful for connectivity tests.
 */
export async function healthCheck() {
  const res = await fetch(`${BASE}/health`);
  return res.json();
}
