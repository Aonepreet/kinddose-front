import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios'; // Assuming axios for API calls
import { server_url } from '../configg/url';

const NeedyDetails = () => {
  const initialneedydata = {
    emailid: '',
    contact: '',
    name: '',
    dob: '',
    gender: '',
    address: '',
    frontaadhaarurl: null, // This will store the File object for upload, or a URL if fetched
    backaadhaarurl: null   // This will store the File object for upload, or a URL if fetched
  };

  //Email Autofill
  const [email, setEmail] = useState('');
  useEffect(() => {
    const storedEmail = localStorage.getItem("emailid");
    if (storedEmail) {
      setNeedyData(prev => ({ ...prev, emailid: storedEmail }));
    }
  }, []);

  const [needydata, setNeedyData] = useState(initialneedydata);
  // Removed profiledata state as extracted data will directly update needydata
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const [frontaadhaarfile, setFrontAadhaarFile] = useState(null); // To store the actual File object
  const [backaadhaarfile, setBackAadhaarFile] = useState(null);   // To store the actual File object
  const [frontaadhaarpreview, setFrontAadhaarPreview] = useState(null); // State for front image preview URL
  const [backaadhaarpreview, setBackAadhaarPreview] = useState(null);   // State for back image preview URL
  // frontdetails and backdetails are not actively used for rendering, but kept if needed for internal logic
  const [frontdetails, setFrontdetails] = useState(false);
  const [backdetails, setBckdetails] = useState(false);

  // Function to upload file for extraction (OCR)
  const uploadForExtraction = async (file, type) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', type); // 'front' or 'back'
    try {
      const resp = await fetch(server_url+"/route/extract", {
        method: 'POST',
        body: formData,
      });
      return await resp.json();
    } catch (err) {
      console.error("Error during extraction upload:", err);
      setError(`Failed to send file for extraction: ${err.message}`);
      return { status: false, msg: "Network or server error during extraction." };
    }
  };

  // Clean up preview URLs when component unmounts or files change
  useEffect(() => {
    return () => {
      if (frontaadhaarpreview && frontaadhaarpreview.startsWith('blob:')) URL.revokeObjectURL(frontaadhaarpreview);
      if (backaadhaarpreview && backaadhaarpreview.startsWith('blob:')) URL.revokeObjectURL(backaadhaarpreview);
    };
  }, [frontaadhaarpreview, backaadhaarpreview]);

  // Handle input changes for regular text fields
  const handlechange = (e) => {
    const { name, value } = e.target;
    setNeedyData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Dedicated handler for Front Aadhaar file input (handles preview and OCR)
  const handlefrontaadhaarchange = async (e) => {
    const file = e.target.files[0];
    setFrontAadhaarFile(file); // Store the actual file object

    // Create and set preview URL
    if (frontaadhaarpreview && frontaadhaarpreview.startsWith('blob:')) URL.revokeObjectURL(frontaadhaarpreview);
    if (file) {
      setFrontAadhaarPreview(URL.createObjectURL(file));
      setNeedyData(prevData => ({ ...prevData, frontaadhaarurl: file })); // Store file object for submission

      // Trigger extraction
      setIsLoading(true);
      setMessage('Extracting data from front Aadhaar...');
      setError('');
      const resp = await uploadForExtraction(file, 'front');
      setIsLoading(false);

      if (resp.status) {
        // Directly update needydata with extracted fields
        setNeedyData((prev) => ({
          ...prev,
          name: resp.name || prev.name, // Only update if resp.name exists
          dob: formatDobForInput(resp.dob) || prev.dob, // Format and update DOB
          gender: resp.gender || prev.gender,
        }));
        setMessage(resp.msg || "Data extracted successfully from front Aadhaar.");
        setFrontdetails(true);
      } else {
        setError(resp.msg || "Extraction from Aadhaar front failed.");
        // Optionally clear extracted fields on failure if desired
        // setNeedyData((prev) => ({ ...prev, name: '', dob: '', gender: '' }));
      }
    } else {
      setFrontAadhaarPreview(null);
      setNeedyData(prevData => ({ ...prevData, frontaadhaarurl: null })); // Clear file object
      setError("No file selected for front Aadhaar.");
    }
  };

  // Dedicated handler for Back Aadhaar file input (handles preview and OCR)
  const handlebackaadhaarchange = async (e) => {
    const file = e.target.files[0];
    setBackAadhaarFile(file); // Store the actual file object

    // Create and set preview URL
    if (backaadhaarpreview && backaadhaarpreview.startsWith('blob:')) URL.revokeObjectURL(backaadhaarpreview);
    if (file) {
      setBackAadhaarPreview(URL.createObjectURL(file));
      setNeedyData(prevData => ({ ...prevData, backaadhaarurl: file })); // Store file object for submission

      // Trigger extraction for back Aadhaar
      setIsLoading(true);
      setMessage('Extracting data from back Aadhaar...');
      setError('');
      const resp = await uploadForExtraction(file, 'back'); // Assuming 'back' type for backend
      setIsLoading(false);

      if (resp.status) {
        // Directly update needydata with extracted address
        setNeedyData((prev) => ({
          ...prev,
          address: resp.address || prev.address, // Update address
        }));
        setMessage(resp.msg || "Data extracted successfully from back Aadhaar.");
        setBckdetails(true);
      } else {
        setError(resp.msg || "Extraction from Aadhaar back failed.");
        // Optionally clear extracted fields on failure
        // setNeedyData((prev) => ({ ...prev, address: '' }));
      }
    } else {
      setBackAadhaarPreview(null);
      setNeedyData(prevData => ({ ...prevData, backaadhaarurl: null })); // Clear file object
      setError("No file selected for back Aadhaar.");
    }
  };

  // Helper function to format ISO date string to YYYY-MM-DD
  const formatDobForInput = (isoDateString) => {
    if (!isoDateString) return '';
    try {
      const date = new Date(isoDateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch (e) {
      console.error("Error formatting DOB:", e);
      return '';
    }
  };

  // Handle Fetch button click (to fetch existing needy profile)
  const handlefetch = async () => {
    console.log("Fetching needy profile for Email ID:", needydata.emailid);
    if (!needydata.emailid) {
      setError('Please enter an Email ID to fetch profile.');
      setMessage('');
      return;
    }

    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await axios.get(`${server_url}/route/needyfetch?emailid=${encodeURIComponent(needydata.emailid)}`);
      console.log("Backend response for fetch profile:", res.data);

      if (res.data.status && res.data.obj) {
        const fetchedprofile = res.data.obj;
        setNeedyData({
          emailid: fetchedprofile.emailid || '',
          contact: fetchedprofile.contact || '',
          name: fetchedprofile.name || '',
          dob: formatDobForInput(fetchedprofile.dob),
          gender: fetchedprofile.gender || '',
          address: fetchedprofile.address || '',
          frontaadhaarurl: fetchedprofile.frontaadhaarurl || null, // Store URL
          backaadhaarurl: fetchedprofile.backaadhaarurl || null    // Store URL
        });
        setMessage(res.data.msg || 'Needy profile fetched successfully!');

        // Set previews from fetched URLs (if available)
        setFrontAadhaarPreview(fetchedprofile.frontaadhaarurl || null);
        setBackAadhaarPreview(fetchedprofile.backaadhaarurl || null);

        // Clear file objects as we're now showing stored URLs
        setFrontAadhaarFile(null);
        setBackAadhaarFile(null);

      } else {
        setError(res.data.msg || 'No profile found for this Email ID. Please fill details.');
        setNeedyData(initialneedydata);
        setNeedyData(prevData => ({ ...prevData, emailid: needydata.emailid })); // Keep email ID
        setFrontAadhaarPreview(null); // Clear previews
        setBackAadhaarPreview(null);
        setFrontAadhaarFile(null); // Clear file objects
        setBackAadhaarFile(null);
      }
    } catch (err) {
      console.error("Error fetching needy profile:", err);
      setError(`Failed to fetch profile: ${err.message}.`);
      setNeedyData(initialneedydata);
      setNeedyData(prevData => ({ ...prevData, emailid: needydata.emailid }));
      setFrontAadhaarPreview(null); // Clear previews
      setBackAadhaarPreview(null);
      setFrontAadhaarFile(null); // Clear file objects
      setBackAadhaarFile(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle "Send to server" button click (for initial save)
  const handlesendtoserver = async () => {
    console.log("Preparing needy profile for server submission:", needydata);
    setIsLoading(true);
    setMessage('');
    setError('');

    const formdata = new FormData();

    for (const key in needydata) {
      const value = needydata[key];
      if (value instanceof File) {
        formdata.append(key, value, value.name); // Append file with its name
      } else if (value !== null && value !== undefined) { // Only append non-null/undefined values
        formdata.append(key, value);
      }
    }

    try {
      const res = await axios.post(server_url+'/route/needysave2', formdata, {
        headers: { "Content-Type": "multipart/form-data" }, // Important for FormData
      });

      if (res.data.status === true) {
        setMessage(res.data.msg || 'Profile saved successfully!');
      } else {
        setError(res.data.msg || 'Failed to save profile.');
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      setError(`Error saving profile: ${err.message}.`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle "Modify" button click (for updating existing profile)
  const handlemodify = async () => {
    console.log("Preparing needy profile for modification:", needydata);
    setIsLoading(true);
    setMessage('');
    setError('');

    const formdata = new FormData();

    for (const key in needydata) {
      const value = needydata[key];
      if (value instanceof File) {
        formdata.append(key, value, value.name); // Append file with its name
      } else if (value !== null && value !== undefined) {
        formdata.append(key, value);
      }
    }

    try {
      const res = await axios.put(`${server_url}/route/needyupdate?emailid=${encodeURIComponent(needydata.emailid)}`, formdata, {
        headers: { "Content-Type": "multipart/form-data" }, // Important for FormData
      });

      if (res.data.status) {
        setMessage(res.data.msg || 'Profile updated successfully!');
      } else {
        setError(res.data.msg || 'Failed to update profile.');
      }
    } catch (err) {
      console.error("Error modifying profile:", err);
      setError(`Error modifying profile: ${err.message}.`);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 sm:p-6 flex items-center justify-center font-sans">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-4xl border border-gray-100 transform transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center tracking-tight">
          Needy Profile
        </h1>

        {/* Loading / Message / Error display */}
        {isloading && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="ml-3 text-blue-700">Processing...</p>
          </div>
        )}
        {message && (
          <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-4 text-sm text-center shadow-sm">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-4 text-sm text-center shadow-sm">
            Error: {error}
          </div>
        )}

        <form className="space-y-6">
          {/* Email ID and Fetch Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label htmlFor="emailid" className="block text-sm font-medium text-gray-700 sr-only">
              Email ID
            </label>
            <input
              type="email"
              id="emailid"
              name="emailid"
              value={needydata.emailid}
              onChange={handlechange}
              placeholder="Email ID"
              className="flex-1 w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-400 focus:border-emerald-400 sm:text-base transition duration-150 ease-in-out bg-gray-50"
              required
            />
            <button
              type="button"
              onClick={handlefetch}
              disabled={isloading}
              className="w-full sm:w-auto px-6 py-2 rounded-lg shadow-md text-lg font-semibold text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 transition duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isloading ? 'Fetching...' : 'Fetch'}
            </button>
          </div>

          {/* Contact Number */}
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={needydata.contact}
              onChange={handlechange}
              placeholder="e.g., +91-9876543210"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-400 focus:border-emerald-400 sm:text-base transition duration-150 ease-in-out bg-gray-50"
            />
          </div>

          {/* Aadhaar Card Uploads and Extracted Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upload Front Side */}
            <div className="bg-teal-50 p-5 rounded-lg shadow-md border border-teal-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Upload Front of Aadhaar Card</h2>
              <input
                type="file"
                id="frontaadhaarurl"
                name="frontaadhaarurl"
                accept="image/*"
                onChange={handlefrontaadhaarchange} // Now calls the simplified handler
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
              {/* Front Aadhaar Image Preview */}
              {frontaadhaarpreview && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={frontaadhaarpreview}
                    alt="Front Aadhaar Preview"
                    className="max-w-full h-auto rounded-lg shadow-md border border-gray-300"
                    style={{ maxHeight: '200px' }}
                  />
                </div>
              )}
              {needydata.frontaadhaarurl && !frontaadhaarfile && ( // Show stored URL if no new file selected
                <div className="mt-3 text-center">
                  <a href={needydata.frontaadhaarurl} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-xs hover:underline">
                    View Stored Front Aadhaar
                  </a>
                </div>
              )}
              <div className="mt-4 space-y-3">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={needydata.name}
                    onChange={handlechange}
                    placeholder="Enter Name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-400 focus:border-emerald-400 sm:text-sm bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                    DOB
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={needydata.dob}
                    onChange={handlechange}
                    placeholder="Enter DOB"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-400 focus:border-emerald-400 sm:text-sm bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={needydata.gender}
                    onChange={handlechange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-400 focus:border-emerald-400 sm:text-sm bg-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Upload Back Side */}
            <div className="bg-teal-50 p-5 rounded-lg shadow-md border border-teal-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Upload Back Side</h2>
              <input
                type="file"
                id="backaadhaarurl"
                name="backaadhaarurl"
                accept="image/*"
                onChange={handlebackaadhaarchange} // Now calls the simplified handler
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
              {/* Back Aadhaar Image Preview */}
              {backaadhaarpreview && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={backaadhaarpreview}
                    alt="Back Aadhaar Preview"
                    className="max-w-full h-auto rounded-lg shadow-md border border-gray-300"
                    style={{ maxHeight: '200px' }}
                  />
                </div>
              )}
              {needydata.backaadhaarurl && !backaadhaarfile && (
                <div className="mt-3 text-center">
                  <a href={needydata.backaadhaarurl} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-xs hover:underline">
                    View Stored Back Aadhaar
                  </a>
                </div>
              )}
              <div className="mt-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={needydata.address}
                  onChange={handlechange}
                  rows="4"
                  placeholder="Enter Address"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-400 focus:border-emerald-400 sm:text-sm bg-white"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-6">
            <button
              type="button"
              onClick={handlesendtoserver}
              disabled={isloading}
              className="flex-1 py-3 px-4 rounded-lg shadow-md text-lg font-semibold text-white bg-emerald-400 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-300 transition duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isloading ? 'Sending...' : 'Send to server'}
            </button>
            <button
              type="button"
              onClick={handlemodify}
              disabled={isloading}
              className="flex-1 py-3 px-4 rounded-lg shadow-md text-lg font-semibold text-white bg-indigo-400 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 transition duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isloading ? 'Modifying...' : 'Modify'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NeedyDetails;
