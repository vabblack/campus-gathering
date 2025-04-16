import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const VerifyEmail: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/verify-email/${token}`);
        setStatus('success');
        setMessage(response.data.message);
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/signin');
        }, 3000);
      } catch (error: any) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Verification failed');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800/50 backdrop-blur-xl rounded-lg border border-gray-700">
        <div className="text-center">
          {status === 'verifying' && (
            <>
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-yellow-400" />
              <h2 className="mt-6 text-3xl font-bold text-white">Verifying your email...</h2>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="mx-auto h-12 w-12 text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="mt-6 text-3xl font-bold text-white">Email Verified!</h2>
              <p className="mt-2 text-gray-400">{message}</p>
              <p className="mt-4 text-sm text-gray-400">Redirecting to login page...</p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="mx-auto h-12 w-12 text-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="mt-6 text-3xl font-bold text-white">Verification Failed</h2>
              <p className="mt-2 text-red-400">{message}</p>
              <Button
                onClick={() => navigate('/signin')}
                className="mt-4 w-full bg-yellow-400 text-black hover:bg-yellow-500"
              >
                Return to Sign In
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail; 