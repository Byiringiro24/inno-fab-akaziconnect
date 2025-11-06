import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// For display purposes (optional: use API data for countries or categories)
const allLocations = [
  "Kigali", "Huye", "Musanze", "Nyagatare", "Rubavu", "Rwamagana",
  "Gasabo", "Kicukiro", "Nyarugenge", "Abroad"
];

const allCategories = [
  "Engineering", "ICT", "Finance", "Education", "Health",
  "Administration", "Technicians", "Agriculture", "Marketing",
  "Human Resources", "Design", "Logistics", "Research & Development", "Other"
];

export default function JobDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/jobs/${id}`)
      .then(res => res.json())
      .then(data => {
        setJob(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-6">Loading job details...</div>;
  if (!job) return <div className="p-6">Job not found.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Breadcrumb */}
      <p className="text-gray-500 mb-4 text-sm">
        <Link href="/">Home</Link> &gt; <Link href="/jobs">Jobs</Link> &gt; {job.title}
      </p>

      {/* Job Header */}
      <div className="bg-white shadow rounded p-6 mb-6 flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-2xl font-bold">{job.title}</h1>
          <p className="text-gray-700">{job.company?.name || "Unknown Company"} – {job.location}, {job.country || "Rwanda"}</p>
          <p className="text-gray-500 text-sm mt-1">
            Posted: {new Date(job.postedDate).toLocaleDateString()} | Deadline: {new Date(job.deadline).toLocaleDateString()}
          </p>
          <p className="text-gray-700 mt-1 font-medium">
            Category: {job.category || "Other"} | Type: {job.type || "Full-time"} | Salary: {job.salary || "Negotiable"}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Apply Now</button>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Save Job ❤️</button>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Share 🔗</button>
        </div>
      </div>

      {/* Main Content + Sidebar */}
      <div className="md:flex gap-6">
        {/* Job Description */}
        <main className="flex-1 bg-white shadow rounded p-6 mb-6 md:mb-0">
          <h2 className="text-xl font-semibold mb-2">Job Overview</h2>
          <ul className="mb-4 text-gray-700">
            <li>Department: {job.department || "N/A"}</li>
            <li>Reports to: {job.reportsTo || "N/A"}</li>
            <li>Contract: {job.contract || "N/A"}</li>
            <li>Experience: {job.experienceLevel || "Any"}</li>
            <li>Location: {job.location}, {job.country || "Rwanda"}</li>
            <li>Posted: {new Date(job.postedDate).toLocaleDateString()}</li>
            <li>Deadline: {new Date(job.deadline).toLocaleDateString()}</li>
          </ul>

          <h3 className="text-lg font-semibold mt-4 mb-2">Key Responsibilities</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            {job.responsibilities?.map((r, idx) => <li key={idx}>{r}</li>)}
          </ul>

          <h3 className="text-lg font-semibold mt-4 mb-2">Qualifications</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            {job.qualifications?.map((q, idx) => <li key={idx}>{q}</li>)}
          </ul>

          <h3 className="text-lg font-semibold mt-4 mb-2">Skills</h3>
          <p className="text-gray-700">{job.skills?.join(" · ")}</p>

          {/* Optional: Benefits or Additional Info */}
          {job.benefits?.length > 0 && (
            <>
              <h3 className="text-lg font-semibold mt-4 mb-2">Benefits</h3>
              <ul className="list-disc list-inside text-gray-700">
                {job.benefits.map((b, idx) => <li key={idx}>{b}</li>)}
              </ul>
            </>
          )}
        </main>

        {/* Sidebar: Company Info */}
        <aside className="md:w-1/3 bg-white shadow rounded p-6">
          <h3 className="text-lg font-semibold mb-2">{job.company?.name || "Unknown Company"}</h3>
          <p className="text-gray-700 mb-1">📍 {job.location}, {job.country || "Rwanda"}</p>
          {job.company?.website && (
            <p className="text-blue-600 mb-1">
              🌐 <a href={job.company.website} target="_blank" rel="noopener noreferrer">{job.company.website}</a>
            </p>
          )}
          {job.company?.email && <p className="text-gray-700 mb-1">📧 {job.company.email}</p>}
          <p className="text-gray-700 mb-4">👥 Employees: {job.company?.employees || "N/A"}</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full">View Company Profile</button>
        </aside>
      </div>

      {/* Related Jobs */}
      {job.relatedJobs?.length > 0 && (
        <section className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Related Jobs</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {job.relatedJobs.map(rj => (
              <div key={rj._id} className="border rounded p-4 shadow hover:shadow-lg transition">
                <h4 className="text-lg font-semibold">{rj.title}</h4>
                <p className="text-gray-700">{rj.company?.name || "Unknown Company"} – {rj.location}, {rj.country || "Rwanda"}</p>
                <Link href={`/jobs/${rj._id}`}>
                  <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">View Details</button>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
