import React, { useState } from "react";

interface QueryParam {
  key: string;
  value: string;
}

interface Props {
  onParamsChange: (params: Record<string, string>) => void;
}

const QueryParamsInput: React.FC<Props> = ({ onParamsChange }) => {
  const [params, setParams] = useState<QueryParam[]>([{ key: "", value: "" }]);

  const handleChange = (index: number, field: keyof QueryParam, value: string) => {
    const updatedParams = [...params];
    updatedParams[index][field] = value;
    setParams(updatedParams);
    onParamsChange(Object.fromEntries(updatedParams.map(({ key, value }) => [key, value])));
  };

  const addParam = () => {
    setParams([...params, { key: "", value: "" }]);
  };

  return (
    <div>
      <h3 className="font-bold">Query Parameters</h3>
      {params.map((param, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Key"
            value={param.key}
            onChange={(e) => handleChange(index, "key", e.target.value)}
            className="border p-2 rounded w-1/2"
          />
          <input
            type="text"
            placeholder="Value"
            value={param.value}
            onChange={(e) => handleChange(index, "value", e.target.value)}
            className="border p-2 rounded w-1/2"
          />
        </div>
      ))}
      <button onClick={addParam} className="bg-blue-500 text-white px-2 py-1 rounded">
        + Add Parameter
      </button>
    </div>
  );
};

export default QueryParamsInput;
