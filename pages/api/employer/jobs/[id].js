// pages/api/employer/jobs/[id].js

export default function handler(req, res) {
  const { id } = req.query;

  // Mock job details
  const jobDetails = {
    _id: id,
    title: "Mechanical Engineer",
    company: { name: "STES Group Ltd", website: "www.stesgroup.rw", email: "careers@stesgroup.rw", employees: 40 },
    location: "Kigali",
    country: "Rwanda",
    category: "Engineering",
    type: "Full-time",
    salary: "450,000 – 600,000 RWF/month",
    deadline: "2025-11-10",
    postedDate: "2025-10-27",
    views: 120,
    conversionRate: "10%",
    avgApplyTime: "2 min",
    responsibilities: [
      "Operate and maintain CNC milling machines.",
      "Ensure product quality and tolerances.",
      "Collaborate with design engineers on new parts.",
    ],
    qualifications: [
      "Bachelor’s in Mechanical Engineering or related field.",
      "Experience in CNC, 3D printing, or IoT is a plus.",
      "Proficiency in SolidWorks or AutoCAD.",
    ],
    skills: ["SolidWorks", "IoT Systems", "Quality Control", "CAD Design"],
    applicants: [
      { _id: "a1", name: "John Doe", email: "john@gmail.com", appliedOn: "2025-10-29", resume: "#", status: "Pending" },
      { _id: "a2", name: "Alice M.", email: "alice@gmail.com", appliedOn: "2025-10-30", resume: "#", status: "Shortlisted" },
    ],
  };

  res.status(200).json({ job: jobDetails, applicants: jobDetails.applicants });
}
