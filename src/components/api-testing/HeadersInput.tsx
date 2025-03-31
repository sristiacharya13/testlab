import React, { useState } from "react";

interface Header {
  key: string;
  value: string;
}

interface Props {
  onHeadersChange: (headers: Record<string, string>) => void;
}

const HeadersInput: React.FC<Props> = ({ onHeadersChange }) => {
  const [headers, setHeaders] = useState<Header[]>([{ key: "", value: "" }]);

  const handleChange = (index: number, field: keyof Header, value: string) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index][field] = value;
    setHeaders(updatedHeaders);
    onHeadersChange(Object.fromEntries(updatedHeaders.map(({ key, value }) => [key, value])));
  };

  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  return (
    <div>
      <h3 className="font-bold">Headers</h3>
      {headers.map((header, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Key"
            value={header.key}
            onChange={(e) => handleChange(index, "key", e.target.value)}
            className="border p-2 rounded w-1/2"
          />
          <input
            type="text"
            placeholder="Value"
            value={header.value}
            onChange={(e) => handleChange(index, "value", e.target.value)}
            className="border p-2 rounded w-1/2"
          />
        </div>
      ))}
      <button onClick={addHeader} className="bg-blue-500 text-white px-2 py-1 rounded">
        + Add Header
      </button>
    </div>
  );
};

export default HeadersInput;