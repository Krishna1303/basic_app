import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      <h2>{message}</h2>
      <button onClick={logout}>Logout</button>
    </>
  );
}

export default Dashboard;
