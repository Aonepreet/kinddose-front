import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server_url } from '../configg/url';

const MedicineFinder2 = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [medicineNames, setMedicineNames] = useState([]);
  const [selectedMedicineName, setSelectedMedicineName] = useState('');
  const [foundMedicines, setFoundMedicines] = useState([]); // To store all details of found medicines
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // New state for donor details display
  const [showDonorDetails, setShowDonorDetails] = useState(false);
  const [currentDonorDetails, setCurrentDonorDetails] = useState(null);
  const [isDonorLoading, setIsDonorLoading] = useState(false);
  const [donorError, setDonorError] = useState('');

  // 1. Fetch distinct cities on component mount
  useEffect(() => {
    const fetchCities = async () => {
      setIsLoading(true);
      setError('');
      setMessage('');
      try {
        const response = await axios.get(server_url+'/route/getcity'); // Existing backend endpoint
        if (response.data.status) {
          setCities(response.data.obj); // Assuming obj is an array of city strings
        } else {
          setError(response.data.msg || 'Failed to fetch cities.');
        }
      } catch (err) {
        console.error("Error fetching cities:", err);
        setError('Network error while fetching cities. Please check your backend.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []); // Empty dependency array means this runs once on mount

  // 2. Fetch distinct medicine names when selectedCity changes
  useEffect(() => {
    const fetchMedicineNamesByCity = async () => {
      if (!selectedCity) {
        setMedicineNames([]);
        setFoundMedicines([]); // Clear medicines if no city selected
        return;
      }

      setIsLoading(true);
      setError('');
      setMessage('');
      try {
        const response = await axios.get(`${server_url}/route/getmedicine?city=${encodeURIComponent(selectedCity)}`); // Existing backend endpoint
        if (response.data.status) {
          setMedicineNames(response.data.obj); // Assuming obj is an array of medicine name strings
          setFoundMedicines([]); // Clear previously found medicines when city changes
        } else {
          setError(response.data.msg || 'Failed to fetch medicine names for this city.');
          setMedicineNames([]);
        }
      } catch (err) {
        console.error("Error fetching medicine names by city:", err);
        setError('Network error while fetching medicine names. Please check your backend.');
        setMedicineNames([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMedicineNamesByCity();
  }, [selectedCity]); // Runs when selectedCity changes

  // 3. Fetch all details for the selected medicine name and city
  useEffect(() => {
    const fetchMedicineDetails = async () => {
      if (!selectedMedicineName || !selectedCity) {
        setFoundMedicines([]);
        return;
      }

      setIsLoading(true);
      setError('');
      setMessage('');
      try {
        // Using the more specific /api/medicine-details route from your controller
        // This route is designed to return all details for a medicine in a specific city
        const response = await axios.get(`${server_url}/route/getmeddetails?medicinename=${encodeURIComponent(selectedMedicineName)}&city=${encodeURIComponent(selectedCity)}`);
        if (response.data.status) {
          setFoundMedicines(response.data.obj); // Assuming obj is an array of medicine detail objects
          setMessage(response.data.msg || `Found ${response.data.obj.length} matching medicines.`);
        } else {
          setError(response.data.msg || 'No details found for this medicine in the selected city.');
          setFoundMedicines([]);
        }
      } catch (err) {
        console.error("Error fetching medicine details:", err);
        setError('Network error while fetching medicine details. Please check your backend.');
        setFoundMedicines([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMedicineDetails();
  }, [selectedMedicineName, selectedCity]); // Runs when selectedMedicineName or selectedCity changes

  // Handle combobox changes
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedMedicineName(''); // Reset medicine name when city changes
    setFoundMedicines([]); // Clear found medicines
    setShowDonorDetails(false); // Hide donor details if open
    setCurrentDonorDetails(null);
  };

  const handleMedicineNameChange = (e) => {
    setSelectedMedicineName(e.target.value);
    setShowDonorDetails(false); // Hide donor details if open
    setCurrentDonorDetails(null);
  };

  // Function to fetch and show donor details
  const fetchAndShowDonorDetails = async (donorEmailId) => {
    setIsDonorLoading(true);
    setDonorError('');
    setCurrentDonorDetails(null); // Clear previous donor details

    try {
      // Use your existing donorfetch API endpoint
      const response = await axios.get(`${server_url}/route/getdonordetails?emailid=${encodeURIComponent(donorEmailId)}`);
      if (response.data.status && response.data.obj) {
        setCurrentDonorDetails(response.data.obj);
        setShowDonorDetails(true); // Show the modal
      } else {
        setDonorError(response.data.msg || 'Failed to fetch donor details.');
      }
    } catch (err) {
      console.error("Error fetching donor details:", err);
      setDonorError(`Network error fetching donor details: ${err.message}.`);
    } finally {
      setIsDonorLoading(false);
    }
  };

  // Helper to format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-4 sm:p-6 flex flex-col items-center justify-center font-sans">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-4xl border border-gray-100 transform transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center tracking-tight">
          Find Available Medicines
        </h1>

        {/* Loading / Message / Error display */}
        {isLoading && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            <p className="ml-3 text-purple-700">Loading data...</p>
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

        <div className="space-y-6">
          {/* City Selection */}
          <div>
            <label htmlFor="city-select" className="block text-lg font-medium text-gray-700 mb-2">
              Select City:
            </label>
            <select
              id="city-select"
              value={selectedCity}
              onChange={handleCityChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-base transition duration-150 ease-in-out bg-gray-50"
            >
              <option value="">-- Choose a City --</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Medicine Name Selection (enabled only if city is selected) */}
          <div>
            <label htmlFor="medicine-select" className="block text-lg font-medium text-gray-700 mb-2">
              Select Medicine Name:
            </label>
            <select
              id="medicine-select"
              value={selectedMedicineName}
              onChange={handleMedicineNameChange}
              disabled={!selectedCity || medicineNames.length === 0}
              className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-base transition duration-150 ease-in-out ${!selectedCity || medicineNames.length === 0 ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-50'}`}
            >
              <option value="">-- Choose a Medicine --</option>
              {medicineNames.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            {!selectedCity && <p className="text-sm text-gray-500 mt-1">Please select a city first.</p>}
            {selectedCity && medicineNames.length === 0 && !isLoading && !error && <p className="text-sm text-gray-500 mt-1">No medicines found for this city.</p>}
          </div>
        </div>

        {/* Display Found Medicines in Cards */}
        {foundMedicines.length > 0 && (
          <div className="mt-10" >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Available Medicines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foundMedicines.map((medicine, index) => (
                <div key={index} className="bg-white p-5 rounded-xl shadow-lg border border-purple-100 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-purple-700 mb-2">{medicine.medicinename}</h3>
                    <p className="text-gray-600"><strong>Company:</strong> {medicine.company}</p>
                    <p className="text-gray-600"><strong>Expiry Date:</strong> {formatDate(medicine.expirydate)}</p>
                    <p className="text-gray-600"><strong>Packing:</strong> {medicine.packing}</p>
                    <p className="text-gray-600"><strong>Quantity:</strong> {medicine.quantity}</p>
                    {medicine.otherinfo && (
                      <p className="text-gray-600"><strong>Other Info:</strong> {medicine.otherinfo}</p>
                    )}
                  </div>
                  <button
                    onClick={() => fetchAndShowDonorDetails(medicine.emailid)} // Pass the donor's emailid
                    disabled={isDonorLoading}
                    className="mt-4 w-full px-4 py-2 rounded-lg shadow-md text-base font-semibold text-white bg-purple-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDonorLoading ? 'Loading Donor...' : 'Donor Details'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedMedicineName && foundMedicines.length === 0 && !isLoading && !error && (
          <p className="text-lg text-gray-600 text-center mt-8">No matching medicine details found for "{selectedMedicineName}" in "{selectedCity}".</p>
        )}
      </div>

      {/* Donor Details Modal/Card */}
      {showDonorDetails && (
        <div className="fixed inset-0 bg-gradient-to-r from-blue-100 to-purple-100 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 relative">
            <button
              onClick={() => setShowDonorDetails(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center  text-purple-700">Donor Information</h2>

            {isDonorLoading && (
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                <p className="ml-3 text-green-700">Fetching donor details...</p>
              </div>
            )}
            {donorError && (
              <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-4 text-sm text-center shadow-sm">
                Error: {donorError}
              </div>
            )}

            {currentDonorDetails ? (
              <div className="space-y-3 text-gray-700">
                <p><strong>Email of Donor:</strong> {currentDonorDetails.emailid}</p>
                <p><strong>Name:</strong> {currentDonorDetails.name}</p>
                <p><strong>Age:</strong> {currentDonorDetails.age}</p>
                <p><strong>Gender:</strong> {currentDonorDetails.gender}</p>
                <p><strong>City:</strong> {currentDonorDetails.curcity}</p>
                <p><strong>Address:</strong> {currentDonorDetails.curaddress}</p>
                <p><strong>Contact:</strong> {currentDonorDetails.contact}</p>
                <p><strong>Qualification:</strong> {currentDonorDetails.qualification}</p>
                <p><strong>Occupation:</strong> {currentDonorDetails.occupation}</p>
                {currentDonorDetails.profilepic && (
                  <p>
                    <strong>Profile Pic:</strong>{' '}
                    <a href={currentDonorDetails.profilepic} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      View Profile Picture
                    </a>
                  </p>
                )}
                {currentDonorDetails.adhaarpic && (
                  <p>
                    <strong>Aadhaar Pic:</strong>{' '}
                    <a href={currentDonorDetails.adhaarpic} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      View Aadhaar Picture
                    </a>
                  </p>
                )}
              </div>
            ) : (
              !isDonorLoading && !donorError && <p className="text-center text-gray-500">No donor details available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineFinder2;
