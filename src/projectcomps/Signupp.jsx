import React from "react";
import { useState } from "react";
import axios from 'axios';
import signuplogo from '/undraw_sign-up_qamz.svg';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';
import { server_url } from "../configg/url";

function Signuppp(){

  let navg = useNavigate(); // Initialize useNavigate hook
  
    // Function to handle navigation for buttons
    const doNavigate = (url) => {
      navg("/" + url);
    };

        const [formData, setFormData] = useState({
    emailid: '',
    pwd: '',
    usertype: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup Data:', formData);
    
  };
   
 const sendEmail = () => {
    const templateParams = {
      to_email: formData.emailid,
      user_type: formData.usertype,
    };

    emailjs.send(
      'service_fymtoss', //service_fymtoss     // e.g., "service_xxx"
      'template_zas4sa7',     // e.g., "template_yyy"
      templateParams,
      'H7VJY_HCWr5uZn9Y0'       // e.g., "xXpUbLiCkEy123"
    ).then(response => {
      console.log("Email sent successfully:", response.text);
    }).catch(error => {
      console.error("Email sending failed:", error);
    });
  };



  async function doSave(){
    
    let url = server_url+"/route/signup";
     
      


try {
      const resp = await axios.post(url, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      if (resp.data.status === true) {
        alert(resp.data.msg);
        alert(resp.data.token);
        alert(resp.data.obj.usertype);
        localStorage.setItem("token",resp.data.token);
        localStorage.setItem("emailid",resp.data.obj.emailid);
        sendEmail(); // ✅ send the email after successful signup
        if(resp.data.obj.usertype=="donor")
        doNavigate('donornav');
       else
        doNavigate('needynav');

      } else {
        alert(resp.data.msg);
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Signup failed. Please try again.");
    }

  }
  const backgroundImage =
  "https://i.pinimg.com/736x/c9/f6/4d/c9f64d21e3ddd809bf9c3720949b804f.jpg";


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 px-4 mt-3" style={{ backgroundImage: `url(${backgroundImage})` }} >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        
        {/* Top Illustration */}
        <div className="flex justify-center mb-6">
          
          <img
            src={signuplogo}
            alt="Signup Illustration"
            className="w-36 h-auto"
          />
        </div>

        {/* Form Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          <u>Create an Account</u>
        </h2>

        

        {/* Email Field */}
        <label className="block mb-2 text-gray-600">Email</label>
        <input
          type="emailid"
          name="emailid"
          value={formData.emailid}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        {/* Password Field */}
        <label className="block mb-2 text-gray-600">Password</label>
        <input
          type="pwd"
          name="pwd"
          value={formData.pwd}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
        />

        {/* User Type Selector */}
        <label className="block mb-2 text-gray-600">User Type</label>
        <select
          name="usertype"
          value={formData.usertype}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          <option value="" disabled>
    Choose user type
  </option>
          <option value="donor">Donor</option>
          <option value="needy">Needy</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2 rounded hover:opacity-90 transition"
          onClick={doSave}
        >
          Sign Up
        </button>

        <div className="mt-6 text-center text-sm text-gray-600">
  Already have an account?{' '}
  <button
    type="button"
    className="text-blue-600 hover:underline font-medium"
    onClick={() => { doNavigate('login');
      // Replace this with actual navigation logic (React Router or similar)
      console.log('Redirect to login page');
    }}
  >
    Log in
  </button>
</div>
      </form>
    </div>
  );


}

export default Signuppp;



