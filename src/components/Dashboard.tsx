import Link from 'next/link';

const Dashboard = () => {
  const modules = [
    { name: "API Testing", path: "/api-testing" },
    { name: "Code Matrix Analysis", path: "/code-matrix" },
    { name: "Design Flow Testing", path: "/design-flow" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {modules.map((module) => (
        <Link key={module.path} href={module.path}>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition">
            <h2 className="text-lg font-semibold">{module.name}</h2>
            <p className="text-sm text-gray-600">Click to explore {module.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Dashboard;
