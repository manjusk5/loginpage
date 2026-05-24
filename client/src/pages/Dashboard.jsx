import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('user');
    if (!stored) {
      navigate('/');
      return;
    }
    setUser(JSON.parse(stored));
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <header className="flex items-center justify-between px-6 py-4 md:px-16 bg-black/90">
        <span className="text-[#e50914] text-2xl md:text-3xl font-bold">NETFLIX</span>
        <button
          onClick={handleLogout}
          className="rounded bg-[#e50914] px-4 py-2 text-sm font-semibold hover:bg-[#f40612] transition-colors"
        >
          Sign Out
        </button>
      </header>

      <main className="px-6 py-12 md:px-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Welcome back, {user.name}!
        </h1>
        <p className="text-[#b3b3b3] mb-10">Signed in as {user.email}</p>

        <section>
          <h2 className="text-xl font-semibold mb-4">Trending Now</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {['Stranger Things', 'Wednesday', 'Squid Game', 'Money Heist', 'Dark'].map(
              (title) => (
                <div
                  key={title}
                  className="aspect-2/3 rounded bg-liner-to-b from-[#333] to-[#1a1a1a] flex items-end p-3 hover:scale-105 transition-transform cursor-pointer"
                >
                  <span className="text-sm font-medium">{title}</span>
                </div>
              )
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
