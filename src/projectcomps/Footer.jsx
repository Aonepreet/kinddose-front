import React from "react";
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  Twitter,
  Instagram,
  Linkedin,
  ExternalLink,
  Home,
  Grid,
  FileText,
  MessageCircle,
} from "lucide-react";

// Footer component inspired by the provided screenshot
// Uses Tailwind CSS for styling. Drop this component into your project
// and make sure Tailwind is configured (you said no changes to tailwind config required).

export default function KindDoseFooter({
  email = "contact@kinddose.com",
  phone = "+91 7696179032",
  location = "GZSCCET,Bathinda, Punjab",
  //mapImage = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3449.2487823405436!2d74.92232847555869!3d30.172886574859135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39172d0bb1737c33%3A0xed9d3631bdaa7e49!2sGiani%20Zail%20Singh%20Campus%20College%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1753351634646!5m2!1sen!2sin",
})
{
    const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3449.2487823405436!2d74.92232847555869!3d30.172886574859135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39172d0bb1737c33%3A0xed9d3631bdaa7e49!2sGiani%20Zail%20Singh%20Campus%20College%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1753351634646!5m2!1sen!2sin";
const backgroundImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5LaAC5GbHpM6eMRWFI-ajBwEpv4VRxRf3kA&s";

  return (
    <footer className=" text-white" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left column: brand + description + social + contact */}
          <div className="space-y-6flex flex-col sm:flex-row items-center sm:items-start bg-white shadow-md rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center shadow-lg">
                {/* Simple heart icon mark */}
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21s-7-4.35-9.5-6.5A5.5 5.5 0 0 1 3 7.75 5.25 5.25 0 0 1 8.25 2 6 6 0 0 1 12 4.2 6 6 0 0 1 15.75 2 5.25 5.25 0 0 1 21 7.75c0 2.4-1.1 4.6-3.5 6.75C19 16.65 12 21 12 21z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold  text-center text-gray-800">KindDose</h3>
            </div>

            <p className="text-sm text-black leading-relaxed mt-3">
              We are committed to creating a society where everyone has access to essential
              medicines and healthcare support through community-driven donations.
            </p>

            <div className="flex items-center gap-3">
              
            </div>

            <div className="mt-2 space-y-3 text-sm text-black">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-800/40 rounded-md">
                  <MailIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className=" text-black font-medium">Email</div>
                  <div>{email}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-800/40 rounded-md">
                  <PhoneIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className=" text-black font-medium">Phone</div>
                  <div>{phone}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-800/40 rounded-md">
                  <MapPinIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className=" text-black font-medium">Location</div>
                  <div>{location}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle column: Quick Links */}
          <div className="flex flex-col  items-center sm:items-start bg-white shadow-md rounded-xl p-6 ">
            <h4 className=" text-2xl font-bold  text-center text-gray-800">Quick Links</h4>

            <ul className="space-y-4 mt-3 text-slate-300">
              <li className="flex items-center gap-3">
                <div className="p-2 bg-slate-800/40 rounded-md">
                  <Home className="w-4 h-4" />
                </div>
                <a href="#home" className="hover:underline  text-black" >Home</a>
              </li>

              <li className="flex items-center gap-3">
                <div className="p-2 bg-slate-800/40 rounded-md">
                  <Grid className="w-4 h-4" />
                </div>
                <a href="#services" className="hover:underline text-black" >Our Services</a>
              </li>

              

              <li className="flex items-center gap-3">
                <div className="p-2 bg-slate-800/40 rounded-md">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <a href="#contact" className="hover:underline  text-black"  >Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Right column: Reach Us (Map) */}
          <div className="flex flex-col  items-center sm:items-start bg-white shadow-md rounded-xl p-6">
            <h4 className="text-2xl font-bold  text-center text-gray-800">Reach Us</h4>

            <div className="rounded-lg overflow-hidden shadow-lg max-w-[340px] mt-4">
              {/* Use provided screenshot as placeholder for the map image. Replace with embed or real map as needed. */}
             { /*<img src={mapImage} alt="map placeholder" className="w-full h-40 object-cover grayscale opacity-90" />*/}
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
      </div>

      <div className="border-t border-white">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-black text-sm">
          <div>© {new Date().getFullYear()} KindDose. All rights reserved.</div>
          <div className=" md:mt-0">Response Time: 24 hours • 99% Customer Satisfaction</div>
        </div>
      </div>
    </footer>
  );
}
