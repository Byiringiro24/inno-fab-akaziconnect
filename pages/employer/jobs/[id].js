// pages/employer/jobs/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EmployerJobDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Rwanda districts + international
  const locations = [
    "Kigali", "Huye", "Musanze", "Nyagatare", "Ruhango", "Gicumbi", "Rulindo", 
    "Rubavu", "Nyabihu", "Burera", "Rutsiro", "Ngororero", "Gatsibo", "Kayonza",
    "Other Abroad"
  ];

  // Expanded job categories
  const categories = [
    "Engineering", "ICT", "Finance", "Education", "Health", "Administration",
    "Technicians", "Agriculture", "Sales & Marketing", "Customer Service",
    "Hospitality", "Transport & Logistics", "Construction", "Legal",
    "Creative & Media", "Other"
  ];

  useEffect(() => {
    if (!id) return;

    fetch(`/api/employer/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data.job);
        setApplicants(data.applicants || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-6 text-center text-gray-500">Loading job details...</div>;
  if (!job) return <div className="p-6 text-center text-red-500">Job not found.</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      
      {/* Job Header */}
      <div className="bg-white shadow rounded p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">{job.title}</h1>
          <p className="text-gray-700 mb-1">
            {job.category || "Other"} | {job.type || "Full-time"} | {job.location || "Unknown"}, {job.country || "Rwanda"}
          </p>
          <p className="text-gray-500 text-sm">
            Posted: {new Date(job.postedDate).toLocaleDateString()} | Deadline: {new Date(job.deadline).toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit Job ✏️</button>
          <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Close Job 🚫</button>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Delete Job 🗑️</button>
        </div>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-500">Views</p>
          <p className="font-bold text-xl">{job.views || 0}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-500">Applications</p>
          <p className="font-bold text-xl">{applicants.length}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-500">Conversion Rate</p>
          <p className="font-bold text-xl">{job.conversionRate || "0%"}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-500">Avg Time to Apply</p>
          <p className="font-bold text-xl">{job.avgApplyTime || "0 min"}</p>
        </div>
      </div>

      {/* Job Details */}
      <div className="md:flex gap-6">
        {/* Main Content */}
        <main className="flex-1 space-y-4">
          <section className="bg-white shadow rounded p-6">
            <h2 className="text-xl font-semibold mb-2">Job Overview</h2>
            <ul className="text-gray-700 list-disc list-inside">
              <li>Department: {job.department || "N/A"}</li>
              <li>Reports to: {job.reportsTo || "N/A"}</li>
              <li>Contract: {job.contract || "N/A"}</li>
              <li>Location: {job.location || "N/A"}</li>
              <li>Salary: {job.salary || "Negotiable"}</li>
              <li>Type: {job.type || "Full-time"}</li>
            </ul>
          </section>

          <section className="bg-white shadow rounded p-6">
            <h2 className="text-xl font-semibold mb-2">Key Responsibilities</h2>
            <ul className="list-disc list-inside text-gray-700">
              {job.responsibilities?.map((r, idx) => <li key={idx}>{r}</li>) || <li>N/A</li>}
            </ul>
          </section>

          <section className="bg-white shadow rounded p-6">
            <h2 className="text-xl font-semibold mb-2">Qualifications</h2>
            <ul className="list-disc list-inside text-gray-700">
              {job.qualifications?.map((q, idx) => <li key={idx}>{q}</li>) || <li>N/A</li>}
            </ul>
          </section>

          <section className="bg-white shadow rounded p-6">
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            <p className="text-gray-700">{job.skills?.join(" · ") || "N/A"}</p>
          </section>
        </main>

        {/* Sidebar */}
        <aside className="md:w-1/3 space-y-4">
          <div className="bg-white shadow rounded p-6">
            <h3 className="text-lg font-semibold mb-2">{job.company?.name || "Unknown Company"}</h3>
            <p className="text-gray-700 mb-1">📍 {job.location || "N/A"}</p>
            {job.company?.website && <p className="text-blue-600 mb-1">🌐 <a href={job.company.website} target="_blank">{job.company.website}</a></p>}
            {job.company?.email && <p className="text-gray-700 mb-1">📧 {job.company.email}</p>}
            <p className="text-gray-700 mb-2">👥 Employees: {job.company?.employees || "N/A"}</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full">View Company Profile</button>
          </div>

          {/* Related Jobs */}
          {job.relatedJobs?.length > 0 && (
            <div className="bg-white shadow rounded p-6">
              <h3 className="text-lg font-semibold mb-2">Related Jobs</h3>
              <ul className="space-y-2">
                {job.relatedJobs.map(rj => (
                  <li key={rj._id} className="border rounded p-2 hover:bg-gray-50">
                    <p className="font-semibold">{rj.title}</p>
                    <p className="text-gray-700 text-sm">{rj.company?.name || "Unknown"} – {rj.location}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {/* Applicants Table */}
      <div className="bg-white shadow rounded p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Applicants</h2>
        {applicants.length === 0 ? (
          <p className="text-gray-500">No applicants yet.</p>
        ) : (
          <table className="w-full table-auto border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Applicant</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Applied On</th>
                <th className="border px-4 py-2">Resume</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((a) => (
                <tr key={a._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{a.name}</td>
                  <td className="border px-4 py-2">{a.email}</td>
                  <td className="border px-4 py-2">{new Date(a.appliedOn).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">
                    <a href={a.resume} target="_blank" className="text-blue-600">Download</a>
                  </td>
                  <td className="border px-4 py-2">{a.status}</td>
                  <td className="border px-4 py-2 flex gap-2">
                    <button className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700">Shortlist</button>
                    <button className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
