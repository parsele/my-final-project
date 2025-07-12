import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Loan from './pages/Loan';
import Booking from './pages/Booking';
import './App.css';
import React, { useState, useEffect } from 'react';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);
  if (user === undefined) return null; // or a loading spinner
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="bg-white shadow mb-8 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            {/* Brand/Logo */}
            <span className="text-xl font-bold text-green-700 flex items-center gap-2">
              {/* Placeholder for logo */}
              <span className="inline-block w-8 h-8 bg-green-700 rounded-full mr-2"></span>
              MifugoCare Finance
            </span>
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4">
              <Link to="/" className="text-gray-700 hover:text-green-700">Home</Link>
              <Link to="/chat" className="text-gray-700 hover:text-green-700">Chat Agent</Link>
              <Link to="/loan" className="text-gray-700 hover:text-green-700">Loan Application</Link>
              <Link to="/booking" className="text-gray-700 hover:text-green-700">Vet Booking</Link>
              <Link to="/admin" className="text-gray-700 hover:text-green-700">Admin</Link>
            </div>
            {/* Mobile Menu Button */}
            <button className="md:hidden text-green-700 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          {/* Mobile Menu Dropdown */}
          {menuOpen && (
            <div className="md:hidden bg-white shadow px-4 pb-4 flex flex-col space-y-2">
              <Link to="/" className="text-gray-700 hover:text-green-700" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/chat" className="text-gray-700 hover:text-green-700" onClick={() => setMenuOpen(false)}>Chat Agent</Link>
              <Link to="/loan" className="text-gray-700 hover:text-green-700" onClick={() => setMenuOpen(false)}>Loan Application</Link>
              <Link to="/booking" className="text-gray-700 hover:text-green-700" onClick={() => setMenuOpen(false)}>Vet Booking</Link>
              <Link to="/admin" className="text-gray-700 hover:text-green-700" onClick={() => setMenuOpen(false)}>Admin</Link>
            </div>
          )}
        </nav>
        <main className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/loan" element={<Loan />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          </Routes>
        </main>
        {/* Footer */}
        <footer className="bg-white border-t mt-12 py-6 text-center text-gray-600 text-sm">
          <div className="space-y-1">
            <div>
              <span className="font-semibold">Call:</span> <a href="tel:+254768828646" className="text-green-700 underline">+254768828646</a> |
              <span className="font-semibold ml-2">WhatsApp:</span> <a href="https://wa.me/254768828646" target="_blank" rel="noopener noreferrer" className="text-green-700 underline">+254768828646</a> |
              <span className="font-semibold ml-2">Email:</span> <a href="mailto:leyianmoses126@gmail.com" className="text-green-700 underline">leyianmoses126@gmail.com</a>
            </div>
            <div>© 2024 MifugoCare Finance. All rights reserved.</div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
