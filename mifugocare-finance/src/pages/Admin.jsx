import React, { useEffect, useState } from 'react';
import Toast from '../Toast';
import db from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function arrayToCSV(data, columns) {
  const header = columns.join(',');
  const rows = data.map(row => columns.map(col => '"' + (row[col] || '') + '"').join(','));
  return [header, ...rows].join('\n');
}

function downloadCSV(data, columns, filename) {
  const csv = arrayToCSV(data, columns);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const Admin = () => {
  const [loans, setLoans] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const loanSnap = await getDocs(collection(db, 'loanApplications'));
        const loanData = loanSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLoans(loanData);
        const bookingSnap = await getDocs(collection(db, 'vetBookings'));
        const bookingData = bookingSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookings(bookingData);
      } catch (err) {
        setToast({ message: 'Failed to fetch data from Firestore.', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setToast({ message: 'Logged out successfully.', type: 'success' });
    setTimeout(() => navigate('/login'), 1000);
  };

  // Delete a single loan
  const deleteLoan = async (idx) => {
    const loan = loans[idx];
    if (loan.id) {
      await deleteDoc(doc(db, 'loanApplications', loan.id));
    }
    const updated = loans.filter((_, i) => i !== idx);
    setLoans(updated);
    setToast({ message: 'Loan entry deleted.', type: 'success' });
  };

  // Delete a single booking
  const deleteBooking = async (idx) => {
    const booking = bookings[idx];
    if (booking.id) {
      await deleteDoc(doc(db, 'vetBookings', booking.id));
    }
    const updated = bookings.filter((_, i) => i !== idx);
    setBookings(updated);
    setToast({ message: 'Booking entry deleted.', type: 'success' });
  };

  // Clear all loans
  const clearLoans = async () => {
    for (const loan of loans) {
      if (loan.id) {
        await deleteDoc(doc(db, 'loanApplications', loan.id));
      }
    }
    setLoans([]);
    setToast({ message: 'All loan entries cleared.', type: 'success' });
  };

  // Clear all bookings
  const clearBookings = async () => {
    for (const booking of bookings) {
      if (booking.id) {
        await deleteDoc(doc(db, 'vetBookings', booking.id));
      }
    }
    setBookings([]);
    setToast({ message: 'All booking entries cleared.', type: 'success' });
  };

  // Export CSV handlers
  const exportLoansCSV = () => {
    if (loans.length === 0) return;
    downloadCSV(loans, ['name', 'animal', 'amount', 'reason', 'contact'], 'loan_applications.csv');
  };
  const exportBookingsCSV = () => {
    if (bookings.length === 0) return;
    downloadCSV(bookings, ['name', 'animal', 'date', 'time', 'location', 'contact'], 'vet_bookings.csv');
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-700 text-center">Admin Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition font-semibold">Logout</button>
        </div>
        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading data from Firestore...</div>
        ) : (
          <>
            {/* Loan Applications */}
            <section className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Loan Applications</h2>
                <div className="flex gap-2">
                  {loans.length > 0 && (
                    <>
                      <button onClick={exportLoansCSV} className="text-green-700 hover:underline text-sm">Export CSV</button>
                      <button onClick={clearLoans} className="text-red-600 hover:underline text-sm">Clear All</button>
                    </>
                  )}
                </div>
              </div>
              {loans.length === 0 ? (
                <p className="text-gray-500">No loan applications found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full border text-sm">
                    <thead>
                      <tr className="bg-green-100">
                        <th className="py-2 px-3 border">Name</th>
                        <th className="py-2 px-3 border">Animal</th>
                        <th className="py-2 px-3 border">Amount</th>
                        <th className="py-2 px-3 border">Reason</th>
                        <th className="py-2 px-3 border">Contact</th>
                        <th className="py-2 px-3 border">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loans.map((loan, idx) => (
                        <tr key={loan.id || idx} className="even:bg-gray-50">
                          <td className="py-1 px-3 border">{loan.name}</td>
                          <td className="py-1 px-3 border">{loan.animal}</td>
                          <td className="py-1 px-3 border">{loan.amount}</td>
                          <td className="py-1 px-3 border">{loan.reason}</td>
                          <td className="py-1 px-3 border">{loan.contact}</td>
                          <td className="py-1 px-3 border text-center">
                            <button onClick={() => deleteLoan(idx)} className="text-red-600 hover:underline">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
            {/* Vet Bookings */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Vet Bookings</h2>
                <div className="flex gap-2">
                  {bookings.length > 0 && (
                    <>
                      <button onClick={exportBookingsCSV} className="text-green-700 hover:underline text-sm">Export CSV</button>
                      <button onClick={clearBookings} className="text-red-600 hover:underline text-sm">Clear All</button>
                    </>
                  )}
                </div>
              </div>
              {bookings.length === 0 ? (
                <p className="text-gray-500">No vet bookings found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full border text-sm">
                    <thead>
                      <tr className="bg-green-100">
                        <th className="py-2 px-3 border">Name</th>
                        <th className="py-2 px-3 border">Animal</th>
                        <th className="py-2 px-3 border">Date</th>
                        <th className="py-2 px-3 border">Time</th>
                        <th className="py-2 px-3 border">Location</th>
                        <th className="py-2 px-3 border">Contact</th>
                        <th className="py-2 px-3 border">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking, idx) => (
                        <tr key={booking.id || idx} className="even:bg-gray-50">
                          <td className="py-1 px-3 border">{booking.name}</td>
                          <td className="py-1 px-3 border">{booking.animal}</td>
                          <td className="py-1 px-3 border">{booking.date}</td>
                          <td className="py-1 px-3 border">{booking.time}</td>
                          <td className="py-1 px-3 border">{booking.location}</td>
                          <td className="py-1 px-3 border">{booking.contact}</td>
                          <td className="py-1 px-3 border text-center">
                            <button onClick={() => deleteBooking(idx)} className="text-red-600 hover:underline">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default Admin; 