import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../server/supabaseClient';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have a session (user clicked reset link)
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError('Invalid or expired reset link. Please request a new password reset.');
      }
    };
    checkSession();
  }, []);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      console.error('Password reset error:', error);
      setError('An error occurred while resetting your password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-gray-900 min-h-screen'>
      <div className="max-w-2xl mx-auto">
        <img src='/speak-itHeader.png' alt='Speak It Logo' className='w-full max-w-md mx-auto p-1'/>
      </div>
      <div className='text-white flex flex-col items-center justify-center p-4 mt-2'>
        <form onSubmit={handlePasswordReset}
        className='border-2 border-gray-300 flex flex-col items-center justify-center mx-8 rounded-md p-8 mb-8'>
          <h2 className="text-xl font-bold mb-6">Reset Your Password</h2>
          
          {error && <p className="text-red-600 mb-4">{error}</p>}
          {success && (
            <div className="text-green-500 mb-4 text-center">
              <p>Password successfully reset!</p>
              <p className="text-sm">Redirecting to login...</p>
            </div>
          )}
          
          <div className="w-full mb-4">
            <label className="block mb-2">New Password:</label>
            <input
              type='password'
              placeholder='Enter new password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading || success}
              className='border-2 bg-gray-800 border-gray-500 border-solid rounded-md p-2 w-full'
            />
          </div>
          
          <div className="w-full mb-6">
            <label className="block mb-2">Confirm Password:</label>
            <input
              type='password'
              placeholder='Confirm new password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading || success}
              className='border-2 bg-gray-800 border-gray-500 border-solid rounded-md p-2 w-full'
            />
          </div>
          
          <button 
            type='submit'
            disabled={loading || success}
            className='bg-blue-500 text-white rounded-md p-2 w-full mb-4 disabled:bg-gray-500'
          >
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </button>
          
          <button 
            type='button'
            onClick={() => navigate('/login')}
            className='text-blue-400 hover:text-blue-300 text-sm underline'
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword; 