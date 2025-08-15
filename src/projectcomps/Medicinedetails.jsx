import React, { useState ,useEffect} from 'react';
import axios from "axios";
import { server_url } from '../configg/url';


const Medicinedetails = () => {
  // Initial state for the form fields
  const initialmedicinedata = {
    emailid: '', 
    medicinename: '', 
    company: '',
    expirydate: '', 
    packing: '',   
    quantity: '',
    otherinfo: '' 
  };

  const [medicinedata, setMedicinedata] = useState(initialmedicinedata);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isloading, setIsLoading] = useState(false); // Changed from isLoading

  // Options for the Packing combobox
  const packingoptions = [ // Changed from packingOptions
    'Strip',
    'Bottle',
    'Tube',
    'Vial',
    'Box',
    'Other'
  ];


  //Email Autofill
      const [email, setEmail] = useState('');
      useEffect(() => {
  const storedEmail = localStorage.getItem("emailid");
  if (storedEmail) {
    setEmail(storedEmail);
    setMedicinedata(prev => ({ ...prev, emailid: storedEmail }));
  }
}, []);

  // Handle input changes for all form fields
  const handlechange = (e) => { // Changed from handleChange
    const { name, value } = e.target;
    setMedicinedata(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle "Avail to Public" button click
  const handleavailtopublic = async () => { // Changed from handleAvailToPublic
    setIsLoading(true);
    setMessage('');
    setError('');
    console.log("Availing medicine to public:", medicinedata);

    // --- Placeholder for API call to avail medicine to public ---
    // In a real application, you would make an API call here, e.g.:
     try {
      const response = await axios.post(server_url+"/route/medicinesave", medicinedata);
      //alert(response.data.status);
       //if (response.data.status) {
       alert("Medicine Details Saved Successfully !!")
         setMessage('Medicine successfully availed to public!');
         
       // setMedicinedata(initialmedicinedata); // Clear form after successful submission
      //} 
      //else {
        //setError(response.data.msg || 'Failed to avail medicine to public.');
     //}
    } catch (err) {
      console.error("Error availing medicine:", err);
      setError('An error occurred while availing medicine. Please try again.');
    } finally {
      setIsLoading(false);
     }
    // -----------------------------------------------------------

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    //setMessage('Medicine details submitted for public availability (simulated)!');
   // setMedicinedata(initialmedicinedata); // Clear form after simulated submission
    setIsLoading(false);
  };

  // Handle "Update" button click
  const handleupdate = async () => { // Changed from handleUpdate
    setIsLoading(true);
    setMessage('');
    setError('');
    console.log("Updating medicine details:", medicinedata);

    // --- Placeholder for API call to update medicine details ---
    // In a real application, you would make an API call here, e.g.:
     try {
       const response = await axios.put(server_url+"/route/medicineupdate", medicinedata); // Or PATCH
      if (response.data) {
       setMessage('Medicine details updated successfully!');
       alert("Medicine Updated");
       } else {
        setError(response.data.msg || 'Failed to update medicine details.');
       }
     } catch (err) {
      console.error("Error updating medicine:", err);
       setError('An error occurred while updating medicine. Please try again.');
     } finally {
       setIsLoading(false);
     }
    // -----------------------------------------------------------

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    //setMessage('Medicine details updated (simulated)!');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 sm:p-6 flex items-center justify-center font-sans mt-3">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-gray-100 transform transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center tracking-tight">
          Medicine Donation Details
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
              id="emailid" // Changed from emailId
              name="emailid" // Changed from emailId
              value={medicinedata.emailid} // Changed from emailId
              onChange={handlechange}
              placeholder="donor@example.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out bg-gray-50"
              required
            />
          </div>

          {/* Core Medicine Details (2-column grid on medium screens) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {/* Medicine Name */}
            <div>
              <label htmlFor="medicinename" className="block text-sm font-medium text-gray-700 mb-1">
                Medicine Name
              </label>
              <input
                type="text"
                id="medicinename" // Changed from medicineName
                name="medicinename" // Changed from medicineName
                value={medicinedata.medicinename} // Changed from medicineName
                onChange={handlechange}
                placeholder="Paracetamol"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out bg-gray-50"
                required
              />
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={medicinedata.company}
                onChange={handlechange}
                placeholder="ABC Pharma"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out bg-gray-50"
                required
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label htmlFor="expirydate" className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="date"
                id="expirydate" // Changed from expiryDate
                name="expirydate" // Changed from expiryDate
                value={medicinedata.expirydate} // Changed from expiryDate
                onChange={handlechange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out bg-gray-50"
                required
              />
            </div>

            {/* Packing Combobox */}
            <div>
              <label htmlFor="packing" className="block text-sm font-medium text-gray-700 mb-1">
                Packing
              </label>
              <select
                id="packing"
                name="packing"
                value={medicinedata.packing}
                onChange={handlechange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out bg-gray-50"
                required
              >
                <option value="">-- Select Packing --</option>
                {packingoptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div className="md:col-span-2"> {/* Make quantity span full width in this section */}
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={medicinedata.quantity}
                onChange={handlechange}
                placeholder="e.g., 10 (tablets/units)"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out bg-gray-50"
                required
              />
            </div>
          </div>

          {/* Other Info (full width) */}
          <div> {/* No md:col-span-2 needed here as it's already full width */}
            <label htmlFor="otherinfo" className="block text-sm font-medium text-gray-700 mb-1">
              Other Information (Optional)
            </label>
            <textarea
              id="otherinfo" // Changed from otherInfo
              name="otherinfo" // Changed from otherInfo
              value={medicinedata.otherinfo} // Changed from otherInfo
              onChange={handlechange}
              rows="3"
              placeholder="e.g., Dosage instructions, specific conditions, etc."
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out bg-gray-50"
            ></textarea>
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
            <button
              type="button"
              onClick={handleupdate}
              disabled={isloading}
              className="flex-1 py-3 px-4 rounded-lg shadow-md text-lg font-semibold text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isloading ? 'Processing...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Medicinedetails;
