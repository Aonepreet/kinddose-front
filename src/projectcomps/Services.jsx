import React from "react";
import { Gift, Search, BarChart3 } from "lucide-react";
import { Outlet, useNavigate } from 'react-router-dom';
const services = [
  {
    icon: <Gift className="w-8 h-8 text-purple-600" />,
    title: "Share Surplus Medicines",
    description:
      "Pass on your unused, unopened, and unexpired medicines to those who need them most. A small gesture can make a huge difference.",
    points: [
      "List medicine details easily",
      "Choose type & quantity",
      "Secure and verified listings",
    ],
  },
  {
    icon: <Search className="w-8 h-8 text-blue-600" />,
    title: "Locate Medicines Near You",
    description:
      "Find specific medicines available in your city and connect directly with donors ready to help.",
    points: [
      "Filter by city & medicine name",
      "Direct donor contact info",
      "Real-time availability updates",
    ],
  },
  
];

export default function Services() {
    const backgroundImage ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5LaAC5GbHpM6eMRWFI-ajBwEpv4VRxRf3kA&s";
   let navg = useNavigate(); // Initialize useNavigate hook

  // Function to handle navigation for buttons
  const doNavigate = (url) => {
    navg("/" + url);
  };

  return (
    <section id="services" className="py-16 bg-gradient-to-b from-white to-purple-50" style={{ backgroundImage: `url(${backgroundImage})` }} >
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Heading */}
        <div className=" bg-blue-300 rounded-2xl p-8 shadow-lg">
        <h2 className="text-white text-2xl flex justify-center items-center gap-2">
          <span>🤝</span> How KindHelp Works
        </h2>
        <h1 className="text-4xl font-bold text-gray-900 mt-2">Our Core Services</h1>
        <p className="text-white text-2xl mt-2 max-w-2xl mx-auto">
          Connecting communities to ensure life-saving medicines reach those in urgent need.
        </p>

        {/* Cards */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <div className="mb-4"><center>{service.icon}</center></div>
              <h3 className="text-lg font-semibold text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
              <ul className="mt-4  text-sm text-gray-600 list-disc list-inside space-y-1">
                {service.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div></div>

        {/* Call to action */}
        <div className="mt-16 bg-blue-300 text-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold">
            Give Hope. Share Medicines.
          </h2>
          <p className="mt-2 text-purple-100 max-w-xl mx-auto">
            Join KindHelp and transform unused medicines into life-saving help for someone in need.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <button className="border border-white text-blue-600 px-6 py-2 rounded-lg font-medium bg-white hover:bg-blue-400 hover:text-white transition" onClick={() => doNavigate('signup')}>
              Donate Medicines
            </button>
            <button className="border border-white text-blue-600 px-6 py-2 rounded-lg font-medium bg-white hover:bg-blue-400 hover:text-white transition" onClick={() => doNavigate('signup')}>
              Search Medicines
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}