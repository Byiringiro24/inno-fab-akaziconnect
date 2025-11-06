// components/JobCard.jsx
import Link from 'next/link';

export default function JobCard({job}){
  const dl = job.deadline ? new Date(job.deadline).toLocaleDateString() : 'N/A';
  return (
    <div className="border rounded p-4">
      <h3 className="text-lg font-semibold">{job.title} {job.featured && <span className="text-sm ml-2 text-yellow-600">Featured</span>}</h3>
      <p className="text-sm">{job.location} • {job.category}</p>
      <p className="mt-2">{job.description?.slice(0,200)}...</p>
      <div className="flex justify-between items-center mt-3">
        <div className="text-xs">Deadline: {dl}</div>
        <Link href={`/jobs/${job._id}`} className="text-sm underline">View</Link>
      </div>
    </div>
  );
}
