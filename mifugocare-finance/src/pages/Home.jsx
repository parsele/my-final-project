import React from 'react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-green-700 text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to MifugoCare Finance</h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          Revolutionizing animal health in Kenya with AI-powered veterinary services and flexible loan plans for livestock farmers and pet owners.
        </p>
        <a href="/loan" className="inline-block bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-100 transition">Apply for a Vet Loan</a>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-10">Our Features</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="mb-4 text-5xl">🤖</div>
            <h3 className="text-xl font-semibold mb-2">AI Chat Agent</h3>
            <p className="text-gray-600">Get instant animal health advice and support in your language, 24/7.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="mb-4 text-5xl">💸</div>
            <h3 className="text-xl font-semibold mb-2">Flexible Vet Loans</h3>
            <p className="text-gray-600">Access affordable loans for veterinary care, repayable over manageable terms.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="mb-4 text-5xl">🩺</div>
            <h3 className="text-xl font-semibold mb-2">Vet Booking</h3>
            <p className="text-gray-600">Book appointments with trusted vets quickly and easily, wherever you are.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-10">How It Works</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-green-50 rounded-lg p-6 text-center">
            <div className="mb-4 text-4xl">1️⃣</div>
            <h4 className="text-lg font-semibold mb-2">Chat with Mifugo AI</h4>
            <p className="text-gray-700">Describe your animal's symptoms or ask about our services using our smart chat agent.</p>
          </div>
          <div className="bg-green-50 rounded-lg p-6 text-center">
            <div className="mb-4 text-4xl">2️⃣</div>
            <h4 className="text-lg font-semibold mb-2">Apply for a Loan or Book a Vet</h4>
            <p className="text-gray-700">Get personalized recommendations, apply for a loan, or book a vet appointment in minutes.</p>
          </div>
          <div className="bg-green-50 rounded-lg p-6 text-center">
            <div className="mb-4 text-4xl">3️⃣</div>
            <h4 className="text-lg font-semibold mb-2">Receive Care & Support</h4>
            <p className="text-gray-700">Access timely veterinary care and repay your loan flexibly—MifugoCare is with you every step!</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4 bg-white border-t">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-2">For inquiries, support, or partnership opportunities, reach out to us:</p>
          <div className="mt-4 space-y-2">
            <p className="font-semibold">Call: <a href="tel:+254768828646" className="text-green-700 underline">+254768828646</a></p>
            <p className="font-semibold">WhatsApp: <a href="https://wa.me/254768828646" target="_blank" rel="noopener noreferrer" className="text-green-700 underline">+254768828646</a></p>
            <p className="font-semibold">Email: <a href="mailto:leyianmoses126@gmail.com" className="text-green-700 underline">leyianmoses126@gmail.com</a></p>
          </div>
        </div>
      </section>
    </div>
  );
} 