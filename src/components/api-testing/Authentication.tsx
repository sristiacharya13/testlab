import React, { useState } from "react";

interface Props {
  onAuthChange: (auth: Record<string, string>) => void;
}

const Authentication: React.FC<Props> = ({ onAuthChange }) => {
  const [authType, setAuthType] = useState("None");
  const [authData, setAuthData] = useState({});

  const handleAuthChange = (type: string, key: string, value: string) => {
    setAuthData({ ...authData, [key]: value });
    onAuthChange({ ...authData, [key]: value });
  };

  return (
    <div>
      <h3 className="font-bold">Authentication</h3>
      <select onChange={(e) => setAuthType(e.target.value)} className="border p-2 rounded w-full">
        <option value="None">None</option>
        <option value="Bearer Token">Bearer Token</option>
        <option value="Basic Auth">Basic Auth</option>
      </select>
      {authType === "Bearer Token" && (
        <input
          type="text"
          placeholder="Token"
          onChange={(e) => handleAuthChange("Bearer Token", "Authorization", `Bearer ${e.target.value}`)}
          className="border p-2 rounded w-full mt-2"
        />
      )}
      {authType === "Basic Auth" && (
        <>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => handleAuthChange("Basic Auth", "Username", e.target.value)}
            className="border p-2 rounded w-full mt-2"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => handleAuthChange("Basic Auth", "Password", e.target.value)}
            className="border p-2 rounded w-full mt-2"
          />
        </>
      )}
    </div>
  );
};

export default Authentication;
