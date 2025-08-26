import React, { useState } from 'react';
import { Image, Input, Button } from '@world-vision/wv360-core-library';
import './LoginPage.scss';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const backgroundStyle = {
    backgroundImage: "url('/girl-horizon.png')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '35% center',
    height: '100vh',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${process.env.API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.detail || 'Login failed.');
        return;
      }

      setSuccess('Login successful!');
      navigate('/home');
    } catch (err) {
      console.error('Login error:', err);
      setError('Server error. Please try again.');
    }
  };

  return (
    <div style={backgroundStyle}>
      <div className="right-container">
        <div className="container">
          <div className="logo">
            <Image
              src="/Logo.svg"
              alt="Logo"
              fallbackSrc="/Mark.svg"
              width="12vw"
              height="12vh"
            />
          </div>
          <div className="login-container">
            <div className="title">
              <h1 className="log-in-title">Welcome Back!</h1>
              <p>Please enter your details.</p>
            </div>
            <form className="log-in" onSubmit={handleSubmit}>
              {error && <p className="form-error">{error}</p>}
              {success && <p className="form-success">{success}</p>}
              <Input
                label="Username"
                name="username"
                placeholder="Enter your username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                style={{ width: '19.2vw' }}
              />
              <Input
                label="Password"
                name="password"
                placeholder="Enter Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                style={{ width: '19.2vw' }}
              />
              <Button
                mode="primary"
                size="xl"
                text="Log In"
                type="submit"
                style={{ width: '19vw' }}
              />
              <div>
                Don't have an account?{' '}
                <u className="rerouter" onClick={() => navigate('/signup')}>
                  Sign Up{' '}
                </u>
              </div>
              <div className="rerouter" onClick={() => navigate('/home')}>
                Skip
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
