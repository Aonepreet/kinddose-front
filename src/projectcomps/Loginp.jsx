import React, { useState } from 'react';
import axios from 'axios';
import signuplogo from '/undraw_medicine_hqqg.svg';
//import { Outlet } from 'react-router-dom';
import { Outlet, useNavigate } from 'react-router-dom';
import { server_url } from '../configg/url';

const Loginp = () => {
  


let navg = useNavigate();
  const [emailid, setEmailid] = useState('');
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (email) => {
    // Basic email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const doNavigate = (url) => {
    navg("/" + url);
    setIsMenuOpen(false); // Close mobile menu after navigation
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!emailid || !pwd) {
      setError('Please enter both email and password.');
      return;
    }

    if (!validateEmail(emailid)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      let url=server_url+'/route/login';
      let token=localStorage.getItem("token");
      const res = await axios.post(url, {
        emailid,
        pwd
      
      },
        {headers: {
           Authorization: `Bearer ${token}`,
          
          'Content-Type': 'application/json', 
        },
      }
    
    );

      setSuccess(`Welcome, ${res.data.user.emailid}`);
      alert("Login Successfull!!");
      alert(res.data.user.usertype);
      if(res.data.user.usertype=="donor")
        doNavigate('donornav');
    else
       doNavigate('needynav');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };
  const backgroundImage =
  "https://i.pinimg.com/736x/c9/f6/4d/c9f64d21e3ddd809bf9c3720949b804f.jpg";


  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center mt-3" style={{ backgroundImage: `url(${backgroundImage})` }} >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded text-sm mb-4 text-center border border-red-300">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 p-2 rounded text-sm mb-4 text-center border border-green-300">
            {success}
          </div>
        )}
        
        
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Login to Continue
        </h2>

        

        <div className="flex justify-center mb-6">
                  
                  <img
                    src={signuplogo}
                    alt="Signup Illustration"
                    className="w-36 h-auto"
                  />
                </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email ID</label>
            <input
              type="email"
              value={emailid}
              onChange={(e) => setEmailid(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default Loginp;
