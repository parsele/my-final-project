import React, { useState } from 'react';
import Toast from '../Toast';

const API_URL = 'http://127.0.0.1:5000/api/bookings';

const Booking = () => {
  const [form, setForm] = useState({
    name: '',
    animal: '',
    date: '',
    time: '',
    location: '',
    contact: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.animal || !form.date || !form.time || !form.location || !form.contact) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to submit vet booking');
      setSubmitted(true);
      setToast({ message: 'Vet booking submitted successfully!', type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to submit vet booking.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {submitted ? (
        <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow p-6 text-center">
          <h1 className="text-2xl font-bold text-green-700 mb-4">Booking Confirmed!</h1>
          <p className="text-gray-700 mb-4">Thank you, {form.name}. Your vet appointment for your {form.animal} is booked on {form.date} at {form.time} in {form.location}. We will contact you at {form.contact} soon.</p>
          <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition" onClick={() => { setSubmitted(false); setForm({ name: '', animal: '', date: '', time: '', location: '', contact: '' }); }}>
            Book Another Appointment
          </button>
        </div>
      ) : (
        <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">Vet Booking</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Animal Type</label>
              <input
                type="text"
                name="animal"
                value={form.animal}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="e.g. Cow, Goat, Dog"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Time</label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Contact Info</label>
              <input
                type="text"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Phone or Email"
                required
                disabled={loading}
              />
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <button
              type="submit"
              className="w-full bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition font-semibold"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Book Appointment'}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Booking; 