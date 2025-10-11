import { useState, useEffect } from 'react';
import { signUp, signIn, getCurrentUser } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function AuthForm() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        return !value && isSignUp ? 'Name is required' : undefined;
      case 'email':
        if (!value) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Email is invalid';
        return undefined;
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        return undefined;
      case 'confirmPassword':
        if (!value && isSignUp) return 'Please confirm your password';
        if (value !== formData.password && isSignUp) return 'Passwords do not match';
        return undefined;
      default:
        return undefined;
    }
  };

  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};
    
    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof FormData;
      // Only validate fields relevant to the current mode
      if (!isSignUp && (fieldName === 'name' || fieldName === 'confirmPassword')) {
        return;
      }
      
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });
    
    return newErrors;
  };
  
  // Validate when formData changes, but only for touched fields
  useEffect(() => {
    const newErrors: ValidationErrors = {};
    
    Object.keys(touched).forEach((key) => {
      if (touched[key]) {
        const fieldName = key as keyof FormData;
        const error = validateField(fieldName, formData[fieldName]);
        if (error) {
          newErrors[fieldName] = error;
        }
      }
    });
    
    setErrors(newErrors);
  }, [formData, touched, isSignUp]);

  // Reset auth error when changing form data
  useEffect(() => {
    setAuthError(null);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const touchedFields: Record<string, boolean> = {};
    Object.keys(formData).forEach(key => {
      if (!isSignUp && (key === 'name' || key === 'confirmPassword')) {
        return;
      }
      touchedFields[key] = true;
    });
    setTouched(touchedFields);
    
    const formErrors = validateForm();
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      
      try {
        if (isSignUp) {
          // Sign up with Cognito
          const { isSignUpComplete, userId, nextStep } = await signUp({
            username: formData.email,
            password: formData.password,
            options: {
              userAttributes: {
                name: formData.name,
                email: formData.email,
              }
            }
          });
          
          console.log('Sign up result:', { isSignUpComplete, userId, nextStep });
          
          // Check if user is already signed in after signup (due to pre-signup trigger)
          try {
            const currentUser = await getCurrentUser();
            console.log('User is already signed in:', currentUser);
            navigate('/profile?login=success');
            return;
          } catch (err) {
            // User is not signed in, continue with normal flow
            console.log('User is not signed in yet', err);
          }
          
          // Try to sign in
          try {
            const signInResult = await signIn({
              username: formData.email,
              password: formData.password
            });
            
            console.log('Sign in after signup result:', signInResult);
            
            if (signInResult.isSignedIn) {
              navigate('/profile?login=success');
            } else {
              setAuthError('Account created but sign-in failed. Please try signing in manually.');
            }
          } catch (signInErr) {
            console.error('Sign in after signup failed:', signInErr);
            // If we get UserAlreadyAuthenticatedException, the user is already signed in
            if (signInErr instanceof Error && 
                signInErr.name === 'UserAlreadyAuthenticatedException') {
              console.log('User is already authenticated, redirecting...');
              navigate('/profile?login=success');
            } else {
              setAuthError('Account created but sign-in failed. Please try signing in manually.');
            }
          }
        } else {
          // Sign in with Cognito
          console.log('Signing in with:', { username: formData.email });
          const signInResult = await signIn({
            username: formData.email,
            password: formData.password
          });
          
          console.log('Sign in result:', signInResult);
          
          if (signInResult.isSignedIn) {
            navigate('/profile?login=success');
          } else if (signInResult.nextStep.signInStep === 'CONFIRM_SIGN_UP') {
            setAuthError('Your account needs to be verified. Please contact support.');
          } else {
            setAuthError('Sign in failed. Please check your credentials.');
          }
        }
      } catch (err) {
        console.error('Auth error:', err);
        if (err instanceof Error) {
          setAuthError(err.message);
        } else {
          setAuthError('An unexpected error occurred');
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const toggleAuthMode = (mode: 'signin' | 'signup') => {
    setIsSignUp(mode === 'signup');
    // Reset errors when toggling
    setErrors({});
    setTouched({});
    setAuthError(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-2">Welcome</h2>
        <p className="text-center text-gray-600 mb-6">
          Sign in to your account or create a new one
        </p>

        {/* Toggle Buttons */}
        <div className="flex mb-6 bg-gray-100 rounded-md">
          <button
            className={`flex-1 py-2 text-center ${
              !isSignUp ? 'bg-white rounded-md shadow-sm' : ''
            }`}
            onClick={() => toggleAuthMode('signin')}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              isSignUp ? 'bg-white rounded-md shadow-sm' : ''
            }`}
            onClick={() => toggleAuthMode('signup')}
          >
            Sign Up
          </button>
        </div>

        {/* Display auth errors */}
        {authError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {authError}
          </div>
        )}

        <div>
          {/* Name Field - Only for Sign Up */}
          {isSignUp && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="John Doe"
                className={`w-full px-3 py-2 border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.name && touched.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
          )}

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="email@example.com"
              className={`w-full px-3 py-2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && touched.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="••••••"
              className={`w-full px-3 py-2 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.password && touched.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field - Only for Sign Up */}
          {isSignUp && (
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="••••••"
                className={`w-full px-3 py-2 border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || Object.keys(errors).length > 0}
            className={`w-full ${
              isSubmitting || Object.keys(errors).length > 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gray-900 hover:bg-gray-800'
            } text-white py-3 rounded-md transition-colors font-medium mb-4`}
          >
            {isSubmitting ? (
              <span className="inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isSignUp ? 'Creating Account...' : 'Signing In...'}
              </span>
            ) : (
              isSignUp ? 'Create Account' : 'Sign In'
            )}
          </button>

          {/* Forgot Password - Only for Sign In */}
          {!isSignUp && (
            <p className="text-center text-gray-600">
              <button
                onClick={() => {
                  // Implement forgot password functionality
                  console.log('Forgot password clicked');
                }}
                className="text-blue-600 hover:underline"
              >
                Forgot your password?
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}