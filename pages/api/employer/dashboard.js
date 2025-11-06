export default function handler(req, res) {
  const dashboardData = {
    company: "STES Group Ltd",
    activeJobs: 5,
    totalApplicants: 68,
    views: 900,
    recentJobs: [
      { _id: "1", title: "Mechanical Engineer", applicants: 14 },
      { _id: "2", title: "CAD Designer", applicants: 25 },
      { _id: "3", title: "Software Engineer", applicants: 18 },
    ],
    notifications: [
      "2 new applications received today",
      "Job deadline approaching for CAD Designer",
    ],
  };

  res.status(200).json(dashboardData);
}
