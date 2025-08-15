import React from 'react';

const Reachus = () => {

  const backgroundImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5LaAC5GbHpM6eMRWFI-ajBwEpv4VRxRf3kA&s";

  // Replace the address here with your desired location
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3449.2487823405436!2d74.92232847555869!3d30.172886574859135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39172d0bb1737c33%3A0xed9d3631bdaa7e49!2sGiani%20Zail%20Singh%20Campus%20College%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1753351634646!5m2!1sen!2sin";


  return (
    <div className=" mt-3  mx-auto p-6 md:p-12" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Reach Us</h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Contact Info */}
        <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
          <p className="mb-2"><strong>Address:</strong> GZSCCET,MRSPTU, Bathinda</p>
          <p className="mb-2"><strong>Phone:</strong> 7696176032</p>
          <p className="mb-2"><strong>Email:</strong> aonepreetsidhu@gmail.com</p>
          
        </div>

        {/* Google Map */}
        <div className="md:flex-1 rounded-lg overflow-hidden shadow-md h-64 md:h-auto">
          <iframe
            title="Google Map"
            src={mapSrc}
            allowFullScreen
            loading="lazy"
            className="w-full h-64 md:h-full border-0"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Reachus;