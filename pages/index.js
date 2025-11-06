import Link from "next/link";
import { Briefcase, Users, Search, Building2, Globe, Mail, Phone, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* 🌍 Header */}
      <header className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <Link href="/" className="text-2xl font-bold text-blue-700">
            InnoFab – <span className="text-green-600">AkaziConnect</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
            <Link href="/">Home</Link>
            <Link href="/jobs">Find Jobs</Link>
            <Link href="/employer/dashboard">Post a Job</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div className="flex gap-3">
            <Link href="/auth/login" className="px-4 py-2 border rounded hover:bg-blue-50">
              Login
            </Link>
            <Link href="/auth/register" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* 🏙️ Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556767576-cfba5cb3b8a2?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-white max-w-2xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Job in Rwanda</h1>
          <p className="text-lg mb-6">Connecting skilled professionals with great employers across Rwanda.</p>
          <div className="flex flex-col md:flex-row gap-3 justify-center">
            <input type="text" placeholder="Job title or keyword" className="p-3 rounded w-full md:w-1/3 text-gray-900" />
            <input type="text" placeholder="Location (Kigali, Huye...)" className="p-3 rounded w-full md:w-1/3 text-gray-900" />
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded flex items-center justify-center gap-2">
              <Search className="w-4 h-4" /> Search Jobs
            </button>
          </div>
          <div className="mt-6 flex gap-3 justify-center">
            <Link href="/jobs" className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-700">Browse Jobs</Link>
            <Link href="/employer/dashboard" className="border px-6 py-3 rounded hover:bg-white/20">Post a Job</Link>
          </div>
        </div>
      </section>

      {/* 💼 Featured Categories */}
      <section className="py-16 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Explore Job Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {[
            { icon: <Briefcase />, title: "Engineering" },
            { icon: <Globe />, title: "ICT & Software" },
            { icon: <Building2 />, title: "Finance" },
            { icon: <Users />, title: "Education" },
            { icon: <Star />, title: "Health" },
            { icon: <Briefcase />, title: "Administration" },
            { icon: <Users />, title: "Technicians" },
            { icon: <Globe />, title: "Agriculture" },
          ].map((cat, i) => (
            <div key={i} className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition">
              <div className="text-blue-600 mb-2 flex justify-center">{cat.icon}</div>
              <p className="font-medium">{cat.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 📰 Latest Jobs */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Latest Jobs</h2>
          <div className="grid gap-4">
            {[
              { title: "Software Engineer", company: "STES Group Ltd", location: "Kigali", type: "Full-time", deadline: "Nov 15" },
              { title: "Mechanical Technician", company: "Baza Farm", location: "Huye", type: "Contract", deadline: "Nov 10" },
            ].map((job, i) => (
              <div key={i} className="bg-white p-5 rounded-xl shadow flex justify-between items-center hover:shadow-md transition">
                <div>
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <p className="text-gray-600">{job.company} — {job.location}</p>
                  <p className="text-sm text-gray-500">{job.type} · Deadline: {job.deadline}</p>
                </div>
                <Link href="/apply" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Apply Now
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-900">Load More</button>
          </div>
        </div>
      </section>

      {/* 🏢 Featured Companies */}
      <section className="py-16 text-center max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Trusted by Top Companies in Rwanda</h2>
        <div className="flex flex-wrap justify-center gap-10 grayscale hover:grayscale-0 transition">
          {["BK", "MTN", "STES Group", "Baza Farm"].map((c, i) => (
            <div key={i} className="text-xl font-semibold text-gray-600">{c}</div>
          ))}
        </div>
      </section>

      {/* 💡 Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Why Choose InnoFab – AkaziConnect</h2>
            <ul className="space-y-3 text-gray-700">
              <li>🌍 Localized for Rwandans</li>
              <li>⚙️ Technology-driven matching</li>
              <li>💬 Fast responses from employers</li>
              <li>🧾 Verified job postings</li>
              <li>🔔 Real-time alerts for new openings</li>
            </ul>
          </div>
          <img src="https://cdn-icons-png.flaticon.com/512/744/744465.png" alt="Why Choose Us" className="w-80 mx-auto" />
        </div>
      </section>

      {/* 🧠 How It Works */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { step: "1️⃣", title: "Create an Account", desc: "Register as a job seeker or employer." },
            { step: "2️⃣", title: "Upload CV / Post Job", desc: "Job seekers upload CVs, employers post jobs easily." },
            { step: "3️⃣", title: "Get Connected", desc: "Receive matches, apply, and get hired fast!" },
          ].map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
              <h3 className="text-2xl font-bold text-blue-600 mb-2">{s.step} {s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 📞 Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-3">InnoFab – AkaziConnect</h3>
            <p>Connecting Rwandan talent with top employers.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/jobs">Find Jobs</Link></li>
              <li><Link href="/post">Post a Job</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contact Info</h4>
            <p><Mail className="inline-block w-4 h-4 mr-2" /> Byiringirofabrice6@gmail.com</p>
            <p><Phone className="inline-block w-4 h-4 mr-2" /> +250 787 585 826</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Follow Us</h4>
            <p>🌐 Facebook · LinkedIn · Instagram</p>
          </div>
        </div>
        <p className="text-center mt-6 text-sm text-gray-400">
          © 2025 InnoFab Tech Solutions – All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
