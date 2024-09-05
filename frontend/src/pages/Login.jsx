import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../lib/axios.jsx';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errormessage,setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ email, password });
  
    try {
      const response = await axios.post('/auth/login', {
        email,
        password,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });


  
      console.log('User logged in:', response.data);

      console.log(response.data?.accessToken);

      console.log(response.data?.user?.email);

      console.log(response.data?.user?.name);



      localStorage.setItem("accessToken",response.data?.data?.accessToken);
      localStorage.setItem("email",response.data?.data?.user?.email);
      localStorage.setItem("name",response.data?.data?.user?.name);


      navigate("/");
    } catch (error) {
      console.error('Login Error:', error);
  
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        setErrorMessage(error.response.data.message)
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>

        </form>

        <p>{errormessage}</p>
      </div>
    </div>
  );
};

export default Login;
