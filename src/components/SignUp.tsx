import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, User, Loader2, Eye, EyeOff, Facebook, Twitter, Github } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { env } from '@/config/env';

const API_URL = env.API_URL;

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // OTP verification states
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState('');
  const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const errors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    let isValid = true;

    if (!formData.name) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear validation error when user types
    setValidationErrors(prev => ({
      ...prev,
      [e.target.name]: ''
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      console.log('Attempting registration with:', {
        name: formData.name,
        email: formData.email,
      });

      const response = await axios.post(`${API_URL}/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      console.log('Registration response:', response.data);
      setUserId(response.data.userId);
      setShowOtpInput(true);
      setSuccess(response.data.message);
      
      // Store credentials for later login
      setLoginCredentials({
        email: formData.email,
        password: formData.password
      });
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (err: any) {
      console.error('Registration error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and limit to 6 digits
    const cleanedValue = e.target.value.trim().replace(/[^0-9]/g, '').slice(0, 6);
    setOtp(cleanedValue);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('Attempting OTP verification with:', {
        userId,
        otp
      });

      // First verify OTP
      const response = await axios.post(`${API_URL}/verify-otp`, {
        userId,
        otp
      });

      console.log('OTP verification response:', response.data);

      // If OTP verification is successful, attempt login
      if (response.data.message === 'Email verified successfully') {
        try {
          console.log('Attempting login with stored credentials');
          // Use stored credentials for login
          await login(loginCredentials.email, loginCredentials.password);
          // Add fade-out animation before navigation
          if (containerRef.current) {
            containerRef.current.classList.add('animate-fade-out');
            setTimeout(() => {
              navigate('/');
            }, 300); // Match this with the animation duration
          } else {
            navigate('/');
          }
        } catch (loginErr: any) {
          console.error('Login error after verification:', loginErr.response?.data || loginErr.message);
          setError('Account verified but login failed. Please try signing in.');
          navigate('/signin');
        }
      }
    } catch (err: any) {
      console.error('OTP verification error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'OTP verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setIsLoading(true);

    try {
      await axios.post(`${API_URL}/resend-otp`, { userId });
      setError('New OTP has been sent to your email.');
      setIsLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to resend OTP. Please try again.');
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider: string) => {
    // TODO: Implement social signup
    console.log(`Signing up with ${provider}`);
  };

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 bg-[url('/images/auth-bg.jpg')] bg-cover bg-center bg-no-repeat">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-purple-500/20 to-pink-500/20 animate-gradient-xy"></div>
      
      {/* 3D Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      
      {/* Animated floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
            }}
          />
        ))}
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>

      {/* Main content */}
      <div className="max-w-md w-full space-y-8 glass-card p-8 animate-fade-in relative z-10 backdrop-blur-xl bg-gray-900/50 border border-white/10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-yellow-400">
            {showOtpInput ? 'Verify Your Email' : 'Create your account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            {showOtpInput ? (
              'Enter the verification code sent to your email'
            ) : (
              <>
                Already have an account?{' '}
                <Link to="/signin" className="font-medium text-yellow-400 hover:text-yellow-500">
                  Sign in
                </Link>
              </>
            )}
          </p>
        </div>
        
        {error && (
          <div className="text-red-500 text-sm text-center bg-red-500/10 p-3 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="text-green-500 text-sm text-center bg-green-500/10 p-3 rounded-md">
            {success}
          </div>
        )}

        {showOtpInput ? (
          <form onSubmit={handleOtpSubmit} className="mt-8 space-y-6">
            <div>
              <Input
                type="text"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter 6-digit OTP"
                className="bg-gray-800/40 border-gray-600 text-white placeholder-gray-400 text-center text-2xl tracking-widest"
                maxLength={6}
                pattern="[0-9]{6}"
                inputMode="numeric"
                required
                aria-label="Enter OTP"
              />
              <p className="mt-2 text-sm text-gray-400 text-center">
                Enter the 6-digit code sent to your email
              </p>
            </div>
            <div>
              <Button
                type="submit"
                className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify Email'
                )}
              </Button>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-yellow-400 hover:text-yellow-500 text-sm"
                disabled={isLoading}
              >
                Resend OTP
              </button>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className={`pl-10 bg-gray-800/40 border-gray-600 text-white placeholder-gray-400 ${
                    validationErrors.name ? 'border-red-500' : ''
                  }`}
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {validationErrors.name && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.name}</p>
                )}
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`pl-10 bg-gray-800/40 border-gray-600 text-white placeholder-gray-400 ${
                    validationErrors.email ? 'border-red-500' : ''
                  }`}
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.email}</p>
                )}
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className={`pl-10 pr-10 bg-gray-800/40 border-gray-600 text-white placeholder-gray-400 ${
                    validationErrors.password ? 'border-red-500' : ''
                  }`}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
                {validationErrors.password && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.password}</p>
                )}
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className={`pl-10 pr-10 bg-gray-800/40 border-gray-600 text-white placeholder-gray-400 ${
                    validationErrors.confirmPassword ? 'border-red-500' : ''
                  }`}
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
                {validationErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.confirmPassword}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Sign up'
              )}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">Or sign up with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="w-full bg-white/5 hover:bg-white/10 text-white border-gray-600 hover:border-white/30 transition-all duration-300 hover:scale-105"
                onClick={() => handleSocialSignup('google')}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] border-[#1877F2]/30 hover:border-[#1877F2]/50 transition-all duration-300 hover:scale-105"
                onClick={() => handleSocialSignup('facebook')}
              >
                <Facebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] border-[#1DA1F2]/30 hover:border-[#1DA1F2]/50 transition-all duration-300 hover:scale-105"
                onClick={() => handleSocialSignup('twitter')}
              >
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full bg-white/5 hover:bg-white/10 text-white border-gray-600 hover:border-white/30 transition-all duration-300 hover:scale-105"
                onClick={() => handleSocialSignup('github')}
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp; 