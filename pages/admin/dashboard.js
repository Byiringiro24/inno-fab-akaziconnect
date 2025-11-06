import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  Building,
  Users,
  FileText,
  Tag,
  BarChart3,
  Bell,
  CreditCard,
  Settings,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    jobs: 0,
    employers: 0,
    seekers: 0,
    pending: 0,
  });

  useEffect(() => {
    // TODO: Replace with real API calls
    setStats({
      jobs: 128,
      employers: 45,
      seekers: 890,
      pending: 7,
    });
  }, []);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard Overview", id: "overview" },
    { icon: Briefcase, label: "Manage Jobs", id: "jobs" },
    { icon: Building, label: "Manage Employers", id: "employers" },
    { icon: Users, label: "Manage Job Seekers", id: "seekers" },
    { icon: FileText, label: "Job Applications", id: "applications" },
    { icon: Tag, label: "Categories & Tags", id: "categories" },
    { icon: BarChart3, label: "Reports & Analytics", id: "reports" },
    { icon: Bell, label: "Notifications & Emails", id: "notifications" },
    { icon: CreditCard, label: "Payments / Subscriptions", id: "payments" },
    { icon: Settings, label: "System Settings", id: "settings" },
    { icon: ShieldCheck, label: "Security & Logs", id: "security" },
    { icon: MessageSquare, label: "Feedback & Support", id: "feedback" },
  ];

  const [active, setActive] = useState("overview");

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm p-4 flex flex-col">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Admin Panel
        </h2>
        <nav className="flex flex-col gap-2">
          {menuItems.map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-left ${
                active === id
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </nav>
        <div className="mt-auto text-sm text-gray-500 text-center border-t pt-4">
          InnoFab © 2025
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {active === "overview" && (
          <section>
            <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatCard title="Total Jobs" value={stats.jobs} color="blue" />
              <StatCard
                title="Employers"
                value={stats.employers}
                color="green"
              />
              <StatCard
                title="Job Seekers"
                value={stats.seekers}
                color="yellow"
              />
              <StatCard
                title="Pending Jobs"
                value={stats.pending}
                color="red"
              />
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">
                Recent Job Activity
              </h2>
              <div className="bg-white rounded-lg shadow p-4 text-gray-600">
                <p>📊 Graphs and recent updates will appear here...</p>
              </div>
            </div>
          </section>
        )}

        {active !== "overview" && (
          <section>
            <h1 className="text-3xl font-bold mb-6">
              {menuItems.find((i) => i.id === active)?.label}
            </h1>
            <div className="bg-white rounded-lg shadow p-6 text-gray-600">
              <p>
                This section will display all functionality related to{" "}
                <strong>{menuItems.find((i) => i.id === active)?.label}</strong>.
              </p>
              <p className="mt-2">
                You can later connect real APIs, data tables, or charts here.
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function StatCard({ title, value, color }) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
  };
  return (
    <div className={`rounded-xl p-5 shadow ${colorMap[color]} font-semibold`}>
      <h3 className="text-sm">{title}</h3>
      <p className="text-3xl mt-2">{value}</p>
    </div>
  );
}
