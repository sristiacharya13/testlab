"use client";
import { useState, useEffect } from "react";
import Authentication from "@/components/api-testing/Authentication";
import HeadersInput from "@/components/api-testing/HeadersInput";
import QueryParamsInput from "@/components/api-testing/QueryParamsInput";
import BodyInput from "@/components/api-testing/BodyInput";
import RequestBuilder from "@/components/api-testing/RequestBuilder";
import ResponseViewer from "@/components/api-testing/ResponseViewer";
import HistoryLogs from "@/components/api-testing/HistoryLogs";

interface HistoryItem {
  id: number;
  method: string;
  url: string;
  timestamp: string;
}

export default function ApiTestingPage() {
  const [authData, setAuthData] = useState<Record<string, string>>({});
  const [headers, setHeaders] = useState<Record<string, string>>({});
  const [queryParams, setQueryParams] = useState<Record<string, string>>({});
  const [body, setBody] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<string>("GET");
  const [apiUrl, setApiUrl] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("apiHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("apiHistory", JSON.stringify(history));
  }, [history]);

  const addHistoryItem = (method: string, url: string) => {
    const newHistoryItem: HistoryItem = {
      id: Date.now(),
      method,
      url,
      timestamp: new Date().toLocaleString(),
    };
    setHistory((prev) => [newHistoryItem, ...prev].slice(0, 10));
  };

  const handleAuthChange = (auth: Record<string, string>) => setAuthData(auth);
  const handleHeadersChange = (newHeaders: Record<string, string>) => setHeaders(newHeaders);
  const handleParamsChange = (params: Record<string, string>) => setQueryParams(params);

  const handleRequestSelect = (method: string, url: string) => {
    setSelectedMethod(method);
    setApiUrl(url);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">API Testing</h1>
      <p className="text-gray-600 mb-4">Perform API testing and debugging.</p>

      <div className="space-y-4">
        <Authentication onAuthChange={handleAuthChange} />
        <HeadersInput onHeadersChange={handleHeadersChange} />
        <QueryParamsInput onParamsChange={handleParamsChange} />
        <BodyInput body={body} setBody={setBody} />
        <RequestBuilder 
          authData={authData} 
          headers={headers} 
          queryParams={queryParams} 
          body={body} 
          apiUrl={apiUrl}
          selectedMethod={selectedMethod}
          setApiUrl={setApiUrl}
          setSelectedMethod={setSelectedMethod}
        />
        <ResponseViewer />
        <HistoryLogs onRequestSelect={handleRequestSelect} addHistoryItem={addHistoryItem} />
      </div>
    </div>
  );
}