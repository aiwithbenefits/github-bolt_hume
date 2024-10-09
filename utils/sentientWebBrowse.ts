import "server-only";

/**
 * Function which uses Sentient to browse the web based on a user's prompt
 * 
 * @param prompt The user's prompt for web browsing
 * @returns The result of the web browsing
 */
export const sentientWebBrowse = async (prompt: string): Promise<string> => {
  // This is a placeholder for the actual Sentient API call
  // You would replace this with the real Sentient API integration
  const sentientApiUrl = "https://api.sentient.io/web-browse";
  const sentientApiKey = process.env.SENTIENT_API_KEY;

  try {
    const response = await fetch(sentientApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sentientApiKey}`
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error(`Sentient API responded with status ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error calling Sentient API:', error);
    throw new Error('Failed to browse the web using Sentient');
  }
};