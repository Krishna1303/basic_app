import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [data, setData] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      console.log('token', token);
      try {
        const res = await axios.post('http://localhost:3008/api/auth/getData', {username}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('User data:', res.data);
        setData(res.data.data);
      } catch {
        navigate('/');
      }
    };
    getData();
  }, [navigate]);

//   const logout = () => {
//     localStorage.removeItem('token');
//     navigate('/');
//   };


  return (
    <>
        <div className="auth-container">
      <h3>Profile</h3>
      <h4>{data.firstname}</h4>
      <h4>{data.lastname}</h4>
      <h4>{data.phoneno}</h4>
      <h4>{data.username}</h4>
      </div>
    </>
  );
}

export default Profile;
