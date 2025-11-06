// pages/jobs/index.js
import Link from 'next/link';
import { useEffect, useState } from "react";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [visibleJobs, setVisibleJobs] = useState(10);

  // Load jobs from API
  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data);
      })
      .catch(console.error);
  }, []);

  // Handle filtering
  useEffect(() => {
    let result = jobs;

    if (searchTerm)
      result = result.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    if (categoryFilter)
      result = result.filter((job) => job.category === categoryFilter);
    if (locationFilter)
      result = result.filter((job) => job.location === locationFilter);
    if (jobTypeFilter)
      result = result.filter((job) => job.type === jobTypeFilter);

    setFilteredJobs(result);
    setVisibleJobs(10); // reset visible count on filter change
  }, [searchTerm, categoryFilter, locationFilter, jobTypeFilter, jobs]);

  const locations = [
    "Kigali", "Gasabo", "Nyarugenge", "Kicukiro", "Huye", "Musanze", "Rubavu", "Nyagatare",
    "Rwamagana", "Gicumbi", "Ruhango", "Rulindo", "Ngoma", "Karongi", "Abroad"
  ];

  const categories = [
    "Engineering", "ICT", "Finance", "Education", "Health", "Administration",
    "Technicians", "Agriculture", "Construction", "Tourism & Hospitality",
    "Sales & Marketing", "Legal & Compliance", "Media & Communications", "Others"
  ];

  const jobTypes = ["Full-time", "Part-time", "Internship", "Contract", "Freelance"];

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search jobs..."
          className="flex-1 p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="p-2 border rounded" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
          <option value="">All Locations</option>
          {locations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
        </select>
        <select className="p-2 border rounded" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select className="p-2 border rounded" value={jobTypeFilter} onChange={(e) => setJobTypeFilter(e.target.value)}>
          <option value="">All Types</option>
          {jobTypes.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-1/4 hidden md:block">
          <h3 className="font-semibold mb-2">Filters</h3>
          <div className="flex flex-col gap-2">
            <button
              className="bg-gray-200 p-2 rounded"
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("");
                setLocationFilter("");
                setJobTypeFilter("");
              }}
            >
              Reset Filters
            </button>
          </div>
        </aside>

        {/* Job Listings */}
        <main className="flex-1 grid gap-4 md:grid-cols-2">
          {filteredJobs.slice(0, visibleJobs).length === 0 ? (
            <div className="text-center py-10 text-gray-500 col-span-full">
              No jobs found matching your filters 😔
            </div>
          ) : filteredJobs.slice(0, visibleJobs).map((job) => (
            <div key={job._id} className="border rounded p-4 shadow hover:shadow-lg transition">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-semibold">{job.title}</h4>
                <span className={`px-2 py-1 text-white rounded ${
                  job.type === "Full-time" ? "bg-blue-600" :
                  job.type === "Internship" ? "bg-green-600" :
                  job.type === "Contract" ? "bg-orange-600" : "bg-purple-600"
                }`}>
                  {job.type}
                </span>
              </div>
              <p className="text-gray-700">{job.company}</p>
              <p className="text-gray-500 text-sm">
                {job.location} · Salary: {job.salary || "Negotiable"} · Deadline: {new Date(job.deadline).toLocaleDateString()}
              </p>
              <div className="mt-3 flex gap-2">
                <Link href={`/jobs/${job._id}`}>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded">View Details</button>
                </Link>
                <button className="bg-green-600 text-white px-3 py-1 rounded">Apply Now</button>
              </div>
            </div>
          ))}
        </main>
      </div>

      {/* Load More Button */}
      {visibleJobs < filteredJobs.length && (
        <div className="flex justify-center mt-6">
          <button
            className="px-4 py-2 border rounded hover:bg-gray-100"
            onClick={() => setVisibleJobs(prev => prev + 10)}
          >
            Load More Jobs
          </button>
        </div>
      )}
    </div>
  );
}
