import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next = {};
    if (!email.trim()) next.email = 'Email is required.';
    if (!password.trim()) next.password = 'Password is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;

    setLoading(true);
    try {
      const { data } = await axios.post('/api/login', { email, password });
      if (data.success) {
        sessionStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      }
    } catch (err) {
      const message =
        err.response?.data?.message || 'Something went wrong. Please try again.';
      setApiError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://assets.nflxext.com/ffe/siteui/vlv3/563d9c178b7090bc36dbe1d46b17f4c9/215055e0b7f16e9bfab3f1f47df3116b/4e5a2f026134b4818b82298711bf185f/IN-en-20250519-popsignuptwoweeks-perspective_alpha_website_small.jpg")',
        }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <header className="relative z-10 px-6 py-5 md:px-16">
        <span className="text-[#e50914] text-3xl md:text-4xl font-bold tracking-tight">
          NETFLIX
        </span>
      </header>

      <main className="relative z-10 flex items-center justify-center px-4 py-12 md:py-20">
        <div className="w-full max-w-450px rounded bg-black/75 px-8 py-12 md:px-16 md:py-14">
          <h1 className="text-3xl font-bold mb-7">Sign In</h1>

          {apiError && (
            <div className="mb-4 rounded border border-[#e87c03] bg-[#e87c03]/10 px-4 py-3 text-sm text-[#e87c03]">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <input
                type="email"
                placeholder="Email or mobile number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded bg-[#333] px-4 py-4 text-white placeholder:text-[#8c8c8c] outline-none focus:ring-2 focus:ring-white/50 ${
                  errors.email ? 'ring-2 ring-[#e87c03]' : ''
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-[#e87c03]">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full rounded bg-[#333] px-4 py-4 text-white placeholder:text-[#8c8c8c] outline-none focus:ring-2 focus:ring-white/50 ${
                  errors.password ? 'ring-2 ring-[#e87c03]' : ''
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-[#e87c03]">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-[#e50914] py-3.5 font-semibold hover:bg-[#f40612] disabled:opacity-70 transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 flex items-center justify-between text-sm text-[#b3b3b3]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-[#b3b3b3]" />
              Remember me
            </label>
            <a href="#" className="hover:underline">
              Need help?
            </a>
          </div>

          <p className="mt-12 text-[#737373]">
            New to Netflix?{' '}
            <a href="#" className="text-white hover:underline">
              Sign up now
            </a>
            .
          </p>

          <p className="mt-4 text-xs text-[#8c8c8c]">
            Demo: user@netflix.com / password123
          </p>
        </div>
      </main>
    </div>
  );
}
