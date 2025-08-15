import React, { useState ,useEffect} from "react";
import axios from "axios";
import { server_url } from "../configg/url";

export default function Donordetails() {
    const [formData, setFormData] = useState({
        emailid: "",
        name: "",
        age: "",
        gender: "",
        curaddress: "",
        curcity: "",
        contact: "",
        qualification: "",
        occupation: "",
        adhaarpic: null,
        profilepic: null,
    });

    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    const [aadhaarPreview, setAadhaarPreview] = useState(null);
    const [profilePreview, setProfilePreview] = useState(null);

//Email Autofill
    const [email, setEmail] = useState('');
    

      useEffect(() => {
  const storedEmail = localStorage.getItem("emailid");
  if (storedEmail) {
    setEmail(storedEmail);
    setFormData((prev) => ({ ...prev, emailid: storedEmail }));
  }
}, []);

    const validate = () => {
        const err = {};
        //if (!formData.emailid.includes("@")) err.emailid = "Enter a valid email";
        //if (!email.includes("@")) err.emailid = "Enter a valid email";
        if (!formData.emailid || !formData.emailid.includes('@')) {
            err.emailid = "Valid email is required";
}
        if (!formData.name) err.name = "Name is required";
        if (!formData.age || isNaN(formData.age)) err.age = "Valid age required";
        if (!formData.gender) err.gender = "Gender required";
        if (!/^\d{10}$/.test(formData.contact)) err.contact = "Enter 10-digit contact";
        return err;
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'emailid') {
             setEmail(value); 
             setFormData((prev) => ({ ...prev, emailid: value }));
    return;
  }
        if (name === 'adhaarpic' && files?.[0]) {
            const file = files[0];
            setFormData((prev) => ({ ...prev, adhaarpic: file }));
            setAadhaarPreview(URL.createObjectURL(file));
        } else if (name === 'profilepic' && files?.[0]) {
            const file = files[0];
            setFormData((prev) => ({ ...prev, profilepic: file }));
            setProfilePreview(URL.createObjectURL(file));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }

        //
        /*if (files) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setFormData((prev) => ({ ...prev, [name]: reader.result }));
          };
          reader.readAsDataURL(files[0]);
        } else {
          setFormData((prev) => ({ ...prev, [name]: value }));
        }*/
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        
        let url = server_url+"/route/donorsave2";
        let fd = new FormData();
        for (let key in formData) {
            if ((key === "adhaarpic" || key === "profilepic") && formData[key]) {
                fd.append(key, formData[key], formData[key].name);
            } else {
                fd.append(key, formData[key]);
            }

        }

        let resp = await axios.post(url, fd, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (resp.data.status == true) {
            alert(resp.data.msg);
            //  setIsUpdateMode(true);
        }
        else
            alert(resp.data.msg);


    };


    // sir vala save
    async function doSave() {
        // alert();
        let url = server_url + "/route/donorsave2";

        let fd = new FormData();
        for (let prop in formData) {
            fd.append(prop, formData[prop]);
        }


        let resp = await axios.post(url, fd, { headers: { 'Content-Type': 'multipart/form-data' } });

        if (resp.data.status == true)
            alert(resp.data.msg);
        else {
            alert(resp.data.msg);
        }
    }

    const handleFetch = async () => {
        if (!formData.emailid) {
            setMessage("Enter email ID to fetch.");
            return;
        }
        try {
            alert(formData.emailid);
            const res = await axios.get(`${server_url}/route/donorfetch?emailid=${formData.emailid}`);
            setFormData(res.data.obj);
            //console.log(res.data.obj);
            
            setAadhaarPreview(res.data.obj.adhaarpic);
            setProfilePreview(res.data.obj.profilepic);
            
            setMessage("Donor fetched successfully!");
            alert("Record Fetched Successfully !!");
            setIsUpdateMode(true);
        } catch (err) {
            setMessage("Donor not found.");
        }
    };

    /*const handleUpdate = async () => {
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        try {
            await axios.put(`${server_url}/route/donorupdate/${formData.emailid}`, formData);
            setMessage("Donor updated successfully!");
        } catch (err) {
            setMessage("Error updating donor.");
        }
    };*/
/************************** */
    /*const handleUpdate = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
        const fd = new FormData();
        for (let key in formData) {
            if ((key === "adhaarpic" || key === "profilepic") && formData[key] instanceof File) {
                fd.append(key, formData[key], formData[key].name);
            } else {
                fd.append(key, formData[key]);
            }
        }

        const resp = await axios.put(
            `${server_url}/route/donorupdate/${formData.emailid}`,
            fd,
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (resp.data.status === true) {
            setMessage("Donor updated successfully!");
            alert("Updated Successfully!");
        } else {
            setMessage("Update failed: " + resp.data.msg);
            alert("Update failed: " + resp.data.msg);
        }

    } catch (err) {
        console.error("Update error:", err);
        setMessage("Error updating donor.");
        alert("Error updating donor.");
    }
};
***********************/
const handleUpdate = async () => {
  const validationErrors = validate();
  setErrors(validationErrors);
  if (Object.keys(validationErrors).length > 0) return;

  try {
    // Include current URLs in formData before sending
    if (!formData.profilepic || formData.profilepic instanceof File) {
      // If you still have a file, upload first to cloudinary and get URL
      // Otherwise, make sure profilepic is URL string
    }
    if (!formData.adhaarpic || formData.adhaarpic instanceof File) {
      // Same as above for aadhaar
    }

    const res = await axios.put(server_url + "/route/donorupdate", formData);
    setMessage(res.data.msg);
     alert("Record Updated Successfully !!");
  } catch (err) {
    setMessage("Error updating donor.");
  }
};

   // Here's your JSX component with a more attractive look, using lighter gradient colors, refined input styles, and symmetrical alignment for the image previews. I've focused on styling without altering your component's IDs or functions.

return (<div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center p-4 mt-3">
    <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-3xl">
        <h2 className="text-4xl font-extrabold text-center text-indigo-800 mb-8 tracking-wide">Donor Details Form</h2>

        {message && (
            <p className="text-center text-green-600 font-semibold text-lg mb-6 animate-fade-in">
                {message}
            </p>
        )}

        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
            {/* Email */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email ID</label>
                <input
                    name="emailid"
                    /*value={formData.emailid}*/
                    value={email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent transition duration-200"
                    required
                />
                {errors.emailid && <p className="text-red-500 text-sm mt-1">{errors.emailid}</p>}
            </div>

            {/* Name */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent transition duration-200"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Age */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Age</label>
                <input
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    type="number"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent transition duration-200"
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
            </div>

            {/* Gender */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent transition duration-200"
                >
                    <option value="">-- Select --</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>

            {/* City */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Current City</label>
                <input
                    name="curcity"
                    value={formData.curcity}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent transition duration-200"
                />
            </div>

            {/* Address */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Current Address</label>
                <input
                    name="curaddress"
                    value={formData.curaddress}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent transition duration-200"
                />
            </div>

            {/* Contact */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Number</label>
                <input
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent transition duration-200"
                />
                {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
            </div>

            {/* Qualification */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Qualification</label>
                <select
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent transition duration-200"
                >
                    <option value="">-- Select --</option>
                    <option>10th</option>
                    <option>12th</option>
                    <option>Graduate</option>
                    <option>Post-Graduate</option>
                </select>
            </div>

            {/* Occupation */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1  ">Occupation</label>
                <select
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent transition duration-200"
                >
                    <option value="">-- Select --</option>
                    <option>Student</option>
                    <option>Employee</option>
                    <option>Self-Employed</option>
                    <option>Unemployed</option>
                </select>
            </div>

            
            

            
        </form>
        <div className="mt-6 flex flex-wrap justify-center gap-6">
             {/* Aadhaar Image Upload + Preview */}
            <div className="flex flex-col items-center justify-start">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Aadhaar Card Upload:</label>
                <input
                    type="file"
                    name="adhaarpic"
                    accept="image/*"
                    onChange={handleChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                />
                {/**/ }
                
            </div>
            <br></br>

            {/* Profile Picture Upload + Preview */}
            <div className="flex flex-col items-center justify-start">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Picture:</label>
                <input
                    type="file"
                    name="profilepic"
                    accept="image/*"
                    onChange={handleChange}
                   
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                />

            
        </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-39">
           {aadhaarPreview && (
                    <img
                        src={aadhaarPreview}
                        width={120}
                        height={120}
                        alt="Aadhaar Preview"
                        className="mt-4 rounded-lg shadow-md object-cover border border-gray-200"
                    />
                )}
            {profilePreview && (
                    <img
                        src={profilePreview}
                        width={120}
                        height={120}
                        alt="Profile Preview"
                        className="mt-4 rounded-full shadow-md object-cover border border-gray-200"
                    />
                )}
                

        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
            <button
                type="button"
                onClick={handleFetch}
                className="px-8 py-3 text-lg font-semibold text-white bg-purple-200 hover:bg-purple-300 rounded-full shadow-lg transition transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
                Fetch Donor
            </button>
            <button
                type="button"
                onClick={handleSave}
                className="px-8 py-3 text-lg font-semibold text-white bg-green-300 hover:bg-green-200 rounded-full shadow-lg transition transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
                Save Donor
            </button>
            {/*<button
                type="button"
                onClick={handleUpdate}
                disabled={!isUpdateMode}
                className={`px-8 py-3 text-lg font-semibold text-white rounded-full shadow-lg transition transform ${
                    isUpdateMode
                        ? "bg-blue-500 hover:bg-blue-600 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        : "bg-gray-400 cursor-not-allowed opacity-70"
                }`}
            >
                Update Donor
            </button>*/}
            <button
    type="button"
    onClick={handleUpdate}
    disabled={!isUpdateMode}
    className={`px-8 py-3 text-lg font-semibold text-white rounded-full shadow-lg transition transform ${
        isUpdateMode
            ? "bg-blue-500 hover:bg-blue-600 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300"
            : "bg-gray-400 cursor-not-allowed opacity-70"
    }`}
>
    Update Donor
</button>
        </div>
    </div>
</div>

);
}