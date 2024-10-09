"use client";

import { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';

export default function WebBrowse() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleWebBrowse = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/sentientWebBrowse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (data.success) {
        setResult(data.data);
      } else {
        setResult('Error: ' + data.error);
      }
    } catch (error) {
      setResult('An error occurred while browsing the web.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-card border border-border rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter web browsing prompt"
          className="flex-grow p-2 border border-border rounded"
        />
        <Button onClick={handleWebBrowse} disabled={isLoading}>
          <Search className="mr-2 h-4 w-4" />
          {isLoading ? 'Browsing...' : 'Browse'}
        </Button>
      </div>
      {result && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Web Browsing Result:</h3>
          <p className="text-sm">{result}</p>
        </div>
      )}
    </div>
  );
}