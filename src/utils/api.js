/**
 * API utility for communicating with the backend
 * Update VITE_API_URL in .env file to point to your backend
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Send a message to the backend
 * @param {string} message - The user message
 * @returns {Promise<string>} - The bot response
 */
export async function sendMessage(message) {
  try {
    const response = await fetch(`${API_URL}/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.reply || data.response || 'No response received';
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * Optional: Clear chat history on backend
 */
export async function clearHistory() {
  try {
    const response = await fetch(`${API_URL}/api/history`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Clear history error:', error);
    throw error;
  }
}

/**
 * Optional: Get chat history
 */
export async function getHistory() {
  try {
    const response = await fetch(`${API_URL}/api/history`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Get history error:', error);
    throw error;
  }
}
