import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:3008/api/auth/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(res.data.message);
      } catch {
        alert('Unauthorized');
        navigate('/');
      }
    };
    fetchDashboard();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };


  return (
    <>
            <div className="auth-container">
      <h2>{message}</h2>
      <button onClick={logout}>Logout</button>
      <div className="switch-link">
        <p><Link to="/profile">Get your profile</Link></p>
      </div>
      </div>
    </>
  );
}

export default Dashboard;
