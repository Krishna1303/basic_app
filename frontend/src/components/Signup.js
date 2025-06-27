import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
          await axios.post('http://localhost:3008/api/auth/signup', {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      phoneno: phoneno
    }, {
      headers: {
        'Content-Type': 'application/json'
      }    });

      alert('Signup successful');
      navigate('/');
    } catch (error) {
      alert('Signup failed' + error.response.data.error || '');
      console.error('Signup error:', error.response);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={firstname}
          onChange={e => setFirstname(e.target.value)}
          placeholder="First Name"
          required
        />
        <input
          value={lastname}
          onChange={e => setLastname(e.target.value)}
          placeholder="Last Name"
          required
        />
        <input
          value={phoneno}
          onChange={e => setPhoneno(e.target.value)}
          placeholder="Phone Number"
          required
        />
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <div className="switch-link">
        <p>Already have an account? <Link to="/">Log in</Link></p>
      </div>
    </div>
  );
}

export default Signup;
