"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const modules = [
  { id: "api-testing", title: "API Testing", description: "Test and debug your APIs efficiently." },
  { id: "code-matrix", title: "Code Matrix Analysis", description: "Analyze code complexity and quality." },
  { id: "design-flow", title: "Design Flow Testing", description: "Validate software design flow and test cases." },
];

export default function HomePage() {
  const router = useRouter();
  const [selectedModule, setSelectedModule] = useState<string | null>(null); // Explicitly define state type

  // ✅ Fix: Explicitly define `moduleId` type as `string`
  const handleModuleClick = (moduleId: string) => {
    setSelectedModule(moduleId);
    router.push(`/${moduleId}`); // Navigates to the respective module page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Testing Tool</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {modules.map((module) => (
          <div
            key={module.id}
            onClick={() => handleModuleClick(module.id)}
            className="cursor-pointer p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold">{module.title}</h2>
            <p className="text-gray-600">{module.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
