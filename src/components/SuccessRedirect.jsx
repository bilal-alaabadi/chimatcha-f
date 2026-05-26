import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import thawaniLogo from '../assets/thawani-logo.png'; // use if local image

const SuccessRedirect = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);
  const query = new URLSearchParams(window.location.search);
  const client_reference_id = query.get('client_reference_id');

  useEffect(() => {
    if (countdown === 0 && client_reference_id) {
      navigate(`/success?client_reference_id=${client_reference_id}`);
    } else {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, client_reference_id, navigate]);

  return (
    <div className="flex flex-col items-center justify-center mt-40 bg-white px-4 text-center">
      {/* Thawani Logo */}

      {/* Success Icon */}
      <div className="bg-green-100 rounded-full p-6 mb-4">
        <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Text */}
      <h1 className="text-3xl font-bold text-green-700 mb-2">Payment Successful</h1>
      <p className="text-gray-600 mb-4">Your payment has been processed successfully.</p>

      {/* Countdown */}
      <p className="text-gray-500 text-sm mb-10">
        Redirecting to order details in {countdown} second{countdown !== 1 && 's'}...
      </p>

      {/* Footer */}
      <div className="mt-auto text-xs text-gray-500">
        <p className="mb-2">
          Powered By <strong className="text-green-600">Thawani</strong>
        </p>
      <img
        src="https://thawani.om/wp-content/uploads/2022/12/Outlook-A-green-an.png" // Replace with your image path
        alt="Thawani Logo"
        className="w-32 mb-6"
      />
      </div>
    </div>
  );
};

export default SuccessRedirect;
