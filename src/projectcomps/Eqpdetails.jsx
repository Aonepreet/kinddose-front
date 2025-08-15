import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { server_url } from '../configg/url';

const MedicalEquipmentDetails = () => {
  // Initial state for the form fields for medical equipment
  const initialequipmentdata = {
    emailid: '',
    equipmentname: '',
    manufacturer: '',
    lastmaintaineddate: '',
    condition: '',
    count: '',
    additionaldetails: ''
  };

  const navigate = useNavigate();
  
    const doNavigate = (url) => {
      navigate("/" + url);
    };

  const [equipmentdata, setEquipmentdata] = useState(initialequipmentdata);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isloading, setIsLoading] = useState(false);
  
  // New states for image upload and preview
  const [imageFile, setImageFile] = useState(null); // To store the actual file object
  const [imagePreviewUrl, setImagePreviewUrl] = useState(''); // To store the URL for image preview

  // Options for the Condition combobox
  const conditionoptions = [
    'New',
    'Used - Excellent',
    'Used - Good',
    'Used - Fair',
    'Used - Needs Repair',
    'Refurbished'
  ];

  // Email Autofill
  useEffect(() => {
    const storedEmail = localStorage.getItem("emailid");
    if (storedEmail) {
      setEquipmentdata(prev => ({ ...prev, emailid: storedEmail }));
    }
  }, []);

  // Clean up the object URL when the component unmounts or image changes
  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  // Handle input changes for all form fields
  const handlechange = (e) => {
    const { name, value } = e.target;
    setEquipmentdata(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create a URL for the selected file to display a preview
      setImagePreviewUrl(URL.createObjectURL(file));
      setError(''); // Clear any previous image errors
    } else {
      setImageFile(null);
      setImagePreviewUrl('');
    }
  };

  // Handle "Avail to Public" button click
  const handleavailtopublic = async () => {
    setIsLoading(true);
    setMessage('');
    setError('');
    console.log("Availing medical equipment to public:", equipmentdata);

    // Create FormData to send both text data and the image file
    const formData = new FormData();
    for (const key in equipmentdata) {
      formData.append(key, equipmentdata[key]);
    }
    if (imageFile) {
      formData.append('equipmentImage', imageFile); // 'equipmentImage' is the field name your backend expects for the file
    } else {
      setError('Please upload an image of the equipment.');
      setIsLoading(false);
      return; // Stop the process if no image is selected
    }

    try {
      // Updated API endpoint for saving equipment details
      // Axios automatically sets Content-Type to multipart/form-data when sending FormData
      const response = await axios.post(server_url+"/route/eqpdetails", formData);
      if (response.data.status) {
        setMessage('Medical equipment successfully availed to public!');
        showCustomMessageBox("Medical Equipment Posted Successfully!! Thank you for this kind move. ");
        setEquipmentdata(initialequipmentdata); // Clear form after successful submission
        setImageFile(null); // Clear image file
        setImagePreviewUrl(''); // Clear image preview
      } else {
        setError(response.data.msg || 'Failed to avail medical equipment to public.');
      }
    } catch (err) {
      console.error("Error availing medical equipment:", err);
      setError('An error occurred while availing medical equipment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };



  // Custom message box function (remains the same)
  const showCustomMessageBox = (msg) => {
    const messageBox = document.createElement('div');
    messageBox.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50';
    messageBox.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-xl text-center">
        <p class="text-lg font-semibold text-gray-800 mb-4">${msg}</p>
        <button id="closeMessageBox" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
          OK
        </button>
      </div>
    `;
    document.body.appendChild(messageBox);

    document.getElementById('closeMessageBox').onclick = () => {
      document.body.removeChild(messageBox);
      doNavigate("donornav");

    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 sm:p-6 flex items-center justify-center font-sans mt-3">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-gray-100 transform transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center tracking-tight">
          Medical Equipment Details
        </h1>

        {/* Loading / Message / Error display */}
        {isloading && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            <p className="ml-3 text-indigo-700">Processing...</p>
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

        <form className="space-y-5">
          

          {/* Email ID (full width) */}
          <div>
            <label htmlFor="emailid" className="block text-sm font-medium text-gray-700 mb-1">
              Donor Email ID
            </label>
            <input
              type="email"
              id="emailid"
              name="emailid"
              value={equipmentdata.emailid}
              onChange={handlechange}
              placeholder="donor@example.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out bg-gray-50"
              required
            />
          </div>

          {/* Core Equipment Details (2-column grid on medium screens) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {/* Equipment Name */}
            <div>
              <label htmlFor="equipmentname" className="block text-sm font-medium text-gray-700 mb-1">
                Equipment Name
              </label>
              <input
                type="text"
                id="equipmentname"
                name="equipmentname"
                value={equipmentdata.equipmentname}
                onChange={handlechange}
                placeholder="e.g., Wheelchair, Crutches"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out bg-gray-50"
                required
              />
            </div>

            {/* Manufacturer */}
            <div>
              <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700 mb-1">
                Manufacturer
              </label>
              <input
                type="text"
                id="manufacturer"
                name="manufacturer"
                value={equipmentdata.manufacturer}
                onChange={handlechange}
                placeholder="e.g., Medtronic, Siemens"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out bg-gray-50"
                required
              />
            </div>

            {/* Last Maintained Date */}
            <div>
              <label htmlFor="lastmaintaineddate" className="block text-sm font-medium text-gray-700 mb-1">
                Last Maintained Date
              </label>
              <input
                type="date"
                id="lastmaintaineddate"
                name="lastmaintaineddate"
                value={equipmentdata.lastmaintaineddate}
                onChange={handlechange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out bg-gray-50"
                required
              />
            </div>

            {/* Condition Combobox */}
            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                Condition
              </label>
              <select
                id="condition"
                name="condition"
                value={equipmentdata.condition}
                onChange={handlechange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out bg-gray-50"
                required
              >
                <option value="">-- Select Condition --</option>
                {conditionoptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Count */}
            <div className="md:col-span-2">
              <label htmlFor="count" className="block text-sm font-medium text-gray-700 mb-1">
                Count
              </label>
              <input
                type="number"
                id="count"
                name="count"
                value={equipmentdata.count}
                onChange={handlechange}
                placeholder="e.g., 1, 5"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out bg-gray-50"
                required
              />
            </div>
          </div>

          {/* Additional Details */}
          <div>
            <label htmlFor="additionaldetails" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Details (Optional)
            </label>
            <textarea
              id="additionaldetails"
              name="additionaldetails"
              value={equipmentdata.additionaldetails}
              onChange={handlechange}
              rows="3"
              placeholder="e.g., Specific model, accessories included, known issues, etc."
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out bg-gray-50"
            ></textarea>
          </div>

          {/* Image Upload Input and Preview */}
          <div>
            <label htmlFor="equipmentImage" className="block text-sm font-medium text-gray-700 mb-1">
              Upload Equipment Image
            </label>
            <input
              type="file"
              id="equipmentImage"
              name="equipmentImage"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
            {imagePreviewUrl && (
              <div className="mt-4 flex justify-center">
                <img src={imagePreviewUrl} alt="Equipment Preview" className="rounded-lg shadow-md max-w-full h-auto max-h-60 object-contain border border-gray-200" />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-6">
            <button
              type="button"
              onClick={handleavailtopublic}
              disabled={isloading}
              className="flex-1 py-3 px-4 rounded-lg shadow-md text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isloading ? 'Processing...' : 'Avail to Public'}
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicalEquipmentDetails;
