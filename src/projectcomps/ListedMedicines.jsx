import React, { useState, useCallback } from 'react';
import axios from 'axios'; // Assuming you'll use axios for API calls
import { server_url } from '../configg/url';

// Main component for Listed Medicines
const ListedMedicines= () => {
  const [emailid, setEmailid] = useState('');
  const [medicines, setMedicines] = useState([]); // State to store the fetched list of medicines
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isloading, setIsLoading] = useState(false);

  // Function to fetch medicines based on email ID
  const fetchmedicines = useCallback(async () => {
    console.log("Attempting to fetch medicines for Email ID:", emailid);
    if (!emailid) {
      setError('Please enter an Email ID to fetch medicines.');
      setMessage('');
      return;
    }

    setIsLoading(true);
    setMessage('');
    setError('');

    try {
     
      const backendUrl = `${server_url}/route/medicinefetch?emailid=${encodeURIComponent(emailid)}`;
      console.log("Fetching medicines from URL:", backendUrl);

      const res = await axios.get(backendUrl);
      console.log("Backend response for medicines:", res.data);
     

      if (res.data.status && res.data.obj) {
        // Ensure fetched data is an array and each item has expected properties
        const fetchedMedicines = res.data.obj.map(med => ({
          _id: med._id, // Assuming _id is present for unique key and delete
          medicinename: med.medicinename || 'N/A',
          company: med.company || 'N/A',
          expirydate: med.expirydate ? new Date(med.expirydate).toLocaleDateString() : 'N/A',
          quantity: med.quantity || 0,
          packing: med.packing || 'N/A', // Keep packing for potential future display or edit
          otherinfo: med.otherinfo || '' // Keep otherinfo for potential future display or edit
        }));
         setIsLoading(false);
        setMedicines(fetchedMedicines);
        setMessage(res.data.msg || 'Medicines fetched successfully!');
       
      } else {
         setIsLoading(false);
        setMedicines([]); // Clear medicines if none found or error
        setError('No medicines found for this Email ID.');
      }
    } catch (fetchError) {
      //console.error("Error fetching medicines:", fetchError);
      setMedicines([]); // Clear medicines on error
      setError(`No Medicine found with this emailid`);
  
      //setIsLoading(false);
    }
  }, [emailid]); // Dependency: re-run if emailid changes

  // Handle Edit button click for a specific medicine
  const handleedit = (medicine) => {
    console.log("Edit button clicked for medicine:", medicine);
    // In a real app, you would navigate to an edit form or open a modal
    // and pre-fill it with 'medicine' data.
    setMessage(`Editing medicine: ${medicine.medicinename}`);
    // Example: navigate('/edit-medicine', { state: { medicine } });
  };

  // Handle Delete button click for a specific medicine
  const handledelete = async (medicineToDelete) => { // Renamed parameter for clarity
    console.log("Delete button clicked for medicine :", medicineToDelete.medicinename);
    if (!window.confirm(`Are you sure you want to delete ${medicineToDelete.medicinename}?`)) {
      return; // User cancelled
    }

    setIsLoading(true);
    setMessage('');
    setError('');

   try {
      // The URL for the request
      const deleteUrl = server_url+`/route/medicinedelete`;
      console.log("Sending POST request to URL:", deleteUrl, "with body:", { medicinename: medicineToDelete.medicinename });

      // Changed from axios.delete to axios.post to match the backend route
      const res = await axios.post(deleteUrl, { // Data is sent directly as the second argument for POST
        medicinename: medicineToDelete.medicinename
      });
      console.log("Backend response for delete:", res.data);

      if (res.data.status) {
        setMessage(res.data.msg || 'Medicine deleted successfully!');
        // Remove the deleted medicine from the local state
        // Use medicineToDelete._id for filtering if available and unique,
        // otherwise fall back to medicinename (less precise if names are not unique)
        setMedicines(prevMedicines => prevMedicines.filter(med =>
          medicineToDelete._id ? med._id !== medicineToDelete._id : med.medicinename !== medicineToDelete.medicinename
        ));
      } else {
        setError(res.data.msg || 'Failed to delete medicine.');
      }
    } catch (deleteError) {
      console.error("Error deleting medicine:", deleteError);
      setError(`Failed to delete medicine: ${deleteError.message}.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 sm:p-6 flex flex-col items-center justify-center font-sans">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-3xl border border-gray-100 transform transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center tracking-tight">
          Listed Medicines
        </h1>

        {/* Email ID Input and Fetch Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <label htmlFor="emailid" className="sr-only">Email ID</label>
          <input
            type="email"
            id="emailid"
            value={emailid}
            onChange={(e) => setEmailid(e.target.value)}
            placeholder="Enter Donor Email ID"
            className="flex-1 w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out bg-gray-50"
            required
          />
          <button
            type="button"
            onClick={fetchmedicines}
            disabled={isloading}
            className="w-full sm:w-auto px-6 py-2 rounded-lg shadow-md text-lg font-semibold text-purple bg-blue-400 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isloading ? 'Fetching...' : 'Fetch Medicines'}
          </button>
        </div>

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

        {/* Medicine List Display in Todo List Format */}
        <div className="space-y-3 mt-6"> {/* Added margin-top for spacing */}
          {medicines.length === 0 && !isloading && !error && (emailid && message.includes('No medicines found') || !emailid) && (
            <p className="text-center text-gray-600 text-lg">
              {emailid ? 'No medicines found for this Email ID.' : 'Enter a valid email to see listed medicines.'}
            </p>
          )}

          {medicines.map((medicine, index) => (
            <div
              key={medicine._id || index}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              {/* Medicine Details */}
              <div className="flex-1 min-w-0 mb-3 sm:mb-0 sm:mr-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {index + 1}. {medicine.medicinename} <span className="text-gray-500 font-normal text-sm">({medicine.company})</span>
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Quantity: {medicine.quantity}  | Packing: {medicine.packing}  | Expires: {medicine.expirydate}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-shrink-0 space-x-2">
                <button
                  type="button"
                  onClick={() => handleedit(medicine)}
                  className="px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-black bg-teal-200 hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition duration-200 ease-in-out transform hover:scale-105"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handledelete(medicine)}
                  className="px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-black bg-red-200 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition duration-200 ease-in-out transform hover:scale-105"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListedMedicines;
