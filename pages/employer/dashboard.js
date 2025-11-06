// pages/employer/dashboard.js
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function EmployerDashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    // Fetch dashboard data from API
    fetch('/api/employer/dashboard')
      .then((res) => res.json())
      .then((data) => setDashboard(data))
      .catch(console.error);
  }, []);

  if (!dashboard) return <div className="p-6">Loading dashboard...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow p-6">
        <h2 className="text-xl font-bold mb-6">Employer Dashboard</h2>
        <nav className="flex flex-col gap-3">
          <Link href="/employer/dashboard">🏠 Dashboard</Link>
          <Link href="/employer/jobs">💼 My Jobs</Link>
          <Link href="/employer/applicants">👥 Applicants</Link>
          <Link href="/employer/analytics">📈 Analytics</Link>
          <Link href="/employer/company-profile">🏢 Company Profile</Link>
          <Link href="/employer/settings">⚙️ Settings</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Hello {dashboard.company} 👋</h1>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow rounded p-4 text-center">
            <p className="text-gray-500">Active Jobs</p>
            <p className="text-2xl font-bold">{dashboard.activeJobs}</p>
          </div>
          <div className="bg-white shadow rounded p-4 text-center">
            <p className="text-gray-500">Applicants</p>
            <p className="text-2xl font-bold">{dashboard.totalApplicants}</p>
          </div>
          <div className="bg-white shadow rounded p-4 text-center">
            <p className="text-gray-500">Views</p>
            <p className="text-2xl font-bold">{dashboard.views}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2">Post New Job</button>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">View Analytics</button>
        </div>

        {/* Recent Jobs */}
        <h2 className="text-xl font-semibold mb-4">Recent Jobs</h2>
        <div className="bg-white shadow rounded p-4 mb-6">
          {dashboard.recentJobs.length === 0 ? (
            <p>No jobs posted yet.</p>
          ) : (
            <ul className="space-y-2">
              {dashboard.recentJobs.map((job) => (
                <li key={job._id} className="flex justify-between items-center">
                  <span>{job.title} ({job.applicants} apps)</span>
                  <Link href={`/employer/jobs/${job._id}`}>
                    <button className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">View</button>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Notifications */}
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <div className="bg-white shadow rounded p-4">
          {dashboard.notifications.length === 0 ? (
            <p>No new notifications.</p>
          ) : (
            <ul className="space-y-2">
              {dashboard.notifications.map((note, idx) => (
                <li key={idx} className="text-gray-700">- {note}</li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
