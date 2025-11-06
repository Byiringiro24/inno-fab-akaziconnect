// pages/api/jobs/index.js

export default function handler(req, res) {
  // Mock job data
  const jobs = [
    {
      _id: "1",
      title: "Mechanical Engineer",
      company: "STES Group Ltd",
      location: "Kigali",
      country: "Rwanda",
      category: "Engineering",
      type: "Full-time",
      salary: "450,000 – 600,000 RWF/month",
      deadline: "2025-11-10",
      postedDate: "2025-10-27",
    },
    {
      _id: "2",
      title: "Software Engineer",
      company: "Tech Innovations",
      location: "Gasabo",
      country: "Rwanda",
      category: "ICT",
      type: "Full-time",
      salary: "800,000 – 1,200,000 RWF/month",
      deadline: "2025-11-15",
      postedDate: "2025-10-25",
    },
    {
      _id: "3",
      title: "CAD Designer",
      company: "DesignHub Ltd",
      location: "Abroad",
      country: "USA",
      category: "Engineering",
      type: "Contract",
      salary: "Negotiable",
      deadline: "2025-12-01",
      postedDate: "2025-10-20",
    },
    // Add more jobs here...
  ];

  res.status(200).json(jobs);
}
