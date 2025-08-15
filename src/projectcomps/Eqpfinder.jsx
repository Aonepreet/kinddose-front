import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server_url } from '../configg/url';

const Eqpfinder = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [equipmentNames, setEquipmentNames] = useState([]); // Changed from medicineNames
  const [selectedEquipmentName, setSelectedEquipmentName] = useState(''); // Changed from selectedMedicineName
  const [foundEquipment, setFoundEquipment] = useState([]); // Changed from foundMedicines
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // State for donor details display (remains the same)
  const [showDonorDetails, setShowDonorDetails] = useState(false);
  const [currentDonorDetails, setCurrentDonorDetails] = useState(null);
  const [isDonorLoading, setIsDonorLoading] = useState(false);
  const [donorError, setDonorError] = useState('');

  // 1. Fetch distinct cities on component mount (remains the same)
  useEffect(() => {
    const fetchCities = async () => {
      setIsLoading(true);
      setError('');
      setMessage('');
      try {
        const response = await axios.get(server_url+'/route/getcity');
        if (response.data.status) {
          setCities(response.data.obj);
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
  }, []);

  // 2. Fetch distinct equipment names when selectedCity changes (updated)
  useEffect(() => {
    const fetchEquipmentNamesByCity = async () => {
      if (!selectedCity) {
        setEquipmentNames([]);
        setFoundEquipment([]); // Clear equipment if no city selected
        return;
      }

      setIsLoading(true);
      setError('');
      setMessage('');
      try {
        // New backend endpoint for equipment names
        const response = await axios.get(`${server_url}/route/getequipmentnames?city=${encodeURIComponent(selectedCity)}`);
        if (response.data.status) {
          setEquipmentNames(response.data.obj); // Assuming obj is an array of equipment name strings
          setFoundEquipment([]); // Clear previously found equipment when city changes
        } else {
          setError(response.data.msg || 'Failed to fetch equipment names for this city.');
          setEquipmentNames([]);
        }
      } catch (err) {
        console.error("Error fetching equipment names by city:", err);
        setError('Network error while fetching equipment names. Please check your backend.');
        setEquipmentNames([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEquipmentNamesByCity();
  }, [selectedCity]); // Runs when selectedCity changes

  // 3. Fetch all details for the selected equipment name and city (updated)
  useEffect(() => {
    const fetchEquipmentDetails = async () => {
      if (!selectedEquipmentName || !selectedCity) {
        setFoundEquipment([]);
        return;
      }

      setIsLoading(true);
      setError('');
      setMessage('');
      try {
        // New backend endpoint for equipment details
        const response = await axios.get(`${server_url}/route/getequipmentdetails?equipmentname=${encodeURIComponent(selectedEquipmentName)}&city=${encodeURIComponent(selectedCity)}`);
        if (response.data.status) {
          setFoundEquipment(response.data.obj); // Assuming obj is an array of equipment detail objects
          setMessage(response.data.msg || `Found ${response.data.obj.length} matching equipment.`);
        } else {
          setError(response.data.msg || 'No details found for this equipment in the selected city.');
          setFoundEquipment([]);
        }
      } catch (err) {
        console.error("Error fetching equipment details:", err);
        setError('Network error while fetching equipment details. Please check your backend.');
        setFoundEquipment([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEquipmentDetails();
  }, [selectedEquipmentName, selectedCity]); // Runs when selectedEquipmentName or selectedCity changes

  // Handle combobox changes (updated)
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedEquipmentName(''); // Reset equipment name when city changes
    setFoundEquipment([]); // Clear found equipment
    setShowDonorDetails(false); // Hide donor details if open
    setCurrentDonorDetails(null);
  };

  const handleEquipmentNameChange = (e) => { // Changed function name
    setSelectedEquipmentName(e.target.value);
    setShowDonorDetails(false); // Hide donor details if open
    setCurrentDonorDetails(null);
  };

  // Function to fetch and show donor details (remains the same)
  const fetchAndShowDonorDetails = async (donorEmailId) => {
    setIsDonorLoading(true);
    setDonorError('');
    setCurrentDonorDetails(null);

    try {
      const response = await axios.get(`${server_url}/route/getdonordetails?emailid=${encodeURIComponent(donorEmailId)}`);
      if (response.data.status && response.data.obj) {
        setCurrentDonorDetails(response.data.obj);
        setShowDonorDetails(true);
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

  // Helper to format date for display (remains the same)
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
          Find Available Medical Equipment {/* Changed title */}
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

          {/* Equipment Name Selection (enabled only if city is selected) */}
          <div>
            <label htmlFor="equipment-select" className="block text-lg font-medium text-gray-700 mb-2">
              Select Equipment Name: {/* Changed label */}
            </label>
            <select
              id="equipment-select"
              value={selectedEquipmentName} // Changed state variable
              onChange={handleEquipmentNameChange} // Changed handler
              disabled={!selectedCity || equipmentNames.length === 0} // Changed state variable
              className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-base transition duration-150 ease-in-out ${!selectedCity || equipmentNames.length === 0 ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-50'}`}
            >
              <option value="">-- Choose an Equipment --</option> {/* Changed option text */}
              {equipmentNames.map((name) => ( // Changed state variable
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            {!selectedCity && <p className="text-sm text-gray-500 mt-1">Please select a city first.</p>}
            {selectedCity && equipmentNames.length === 0 && !isLoading && !error && <p className="text-sm text-gray-500 mt-1">No equipment found for this city.</p>} {/* Changed text */}
          </div>
        </div>

        {/* Display Found Equipment in Cards (updated) */}
        {foundEquipment.length > 0 && ( // Changed state variable
          <div className="mt-10" >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Available Medical Equipment</h2> {/* Changed title */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foundEquipment.map((equipment, index) => ( // Changed state variable and loop variable
                <div key={index} className="bg-white p-5 rounded-xl shadow-lg border border-purple-100 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-purple-700 mb-2">{equipment.equipmentname}</h3> {/* Changed field */}
                    <p className="text-gray-600"><strong>Manufacturer:</strong> {equipment.manufacturer}</p> {/* Changed field */}
                    <p className="text-gray-600"><strong>Last Maintained Date:</strong> {formatDate(equipment.lastmaintaineddate)}</p> {/* Changed field */}
                    <p className="text-gray-600"><strong>Condition:</strong> {equipment.condition}</p> {/* Changed field */}
                    <p className="text-gray-600"><strong>Count:</strong> {equipment.count}</p> {/* Changed field */}
                    {equipment.additionaldetails && (
                      <p className="text-gray-600"><strong>Additional Details:</strong> {equipment.additionaldetails}</p>
                    )}
                    {equipment.equipmentImage && ( // Display image if available
                      <div className="mt-4">
                        <img src={equipment.equipmentImage} alt={equipment.equipmentname} className="w-full h-32 object-cover rounded-lg shadow-sm" />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => fetchAndShowDonorDetails(equipment.emailid)} // Pass the donor's emailid
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
        {selectedEquipmentName && foundEquipment.length === 0 && !isLoading && !error && (
          <p className="text-lg text-gray-600 text-center mt-8">No matching equipment details found for "{selectedEquipmentName}" in "{selectedCity}".</p>
        )}
      </div>

      {/* Donor Details Modal/Card (remains the same) */}
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
            <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Donor Information</h2>

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

export default Eqpfinder;
