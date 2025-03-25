'use client';

import { useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

const JSONViewer = dynamic(() => import('react-json-view'), { ssr: false });

export default function Home() {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>('GET');
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([]);
  const [body, setBody] = useState('{}');
  const [response, setResponse] = useState<any>(null);
  const [history, setHistory] = useState<
    { url: string; method: string; headers: { key: string; value: string }[]; body: string }[]
  >([]);

  const sendRequest = async () => {
    try {
      let parsedBody = {};
      try {
        parsedBody = JSON.parse(body);
      } catch (err) {
        setResponse({ error: 'Invalid JSON body' });
        return;
      }
  
      const res = await axios.post('/api/proxy', {
        url,
        method,
        headers,
        body: method !== 'GET' ? parsedBody : null,
      });
  
      setResponse(res.data);
      setHistory([{ url, method, headers, body }, ...history]);
    } catch (error: any) {
      setResponse({ error: error.message });
    }
  };  

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6">API Tester</h1>

        <div className="flex gap-3 mb-4">
          <select 
            className="border p-2 rounded-md bg-gray-50"
            value={method} 
            onChange={(e) => setMethod(e.target.value as 'GET' | 'POST' | 'PUT' | 'DELETE')}
          >
            {['GET', 'POST', 'PUT', 'DELETE'].map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Enter API URL"
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200"
            onClick={sendRequest}
          >
            Send
          </button>
        </div>

        <textarea
          className="border p-2 w-full h-24 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Enter JSON Body (for POST/PUT)"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <h2 className="text-lg font-bold mt-6">Response</h2>
        <div className="border p-4 bg-gray-50 rounded-md mt-2">
          {response ? <JSONViewer src={response} collapsed={2} /> : 'No response yet'}
        </div>

        <h2 className="text-lg font-bold mt-6">Request History</h2>
        <ul className="border p-4 bg-gray-50 rounded-md mt-2">
          {history.map((h, idx) => (
            <li key={idx} className="border-b p-2 last:border-none">
              <strong className="text-blue-600">{h.method}</strong>: {h.url}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
