// components/Navbar.jsx
import Link from 'next/link';

export default function Navbar(){
  return (
    <nav className="p-4 bg-white shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">InnoFab-AkaziConnect</Link>
        <div className="space-x-4">
          <Link href="/jobs">Jobs</Link>
          <Link href="/employer/dashboard">Employer</Link>
          <Link href="/admin/dashboard">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
