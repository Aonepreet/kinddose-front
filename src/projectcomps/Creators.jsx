import React from 'react';
import ananyaImg from '../assets/user.png';
import raviImg from '../assets/rbsir2.jpeg';

const creators = [
  {
    name: "Aonepreet Kaur",
    role: "Full Stack React Developer",
    image: ananyaImg,
    description:
      
"Full Stack React Developer with expertise in building responsive frontends using React and robust backends with Node.js and Express.Experienced in integrating REST APIs, managing databases (MongoDB/MySQL), and deploying full-stack applications"
  },
  {
    name: "Mr. Rajesh Bansal",
    role: "Project Mentor",
    image: raviImg,
    description:
      "An experienced trainer and the founder of BCE Bathinda, specializing in delivering hands-on training in full stack development and modern web technologies.Passionate about mentoring students and professionals to build real-world projects using React, Node.js, and industry-standard tools."
  },
];

const backgroundImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5LaAC5GbHpM6eMRWFI-ajBwEpv4VRxRf3kA&s";

const Creators = () => {
  return (
    <div className=" mx-auto px-4 py-12 " style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className=' bg-blue-300 rounded-2xl p-8 shadow-lg'>
      <h2 className="text-3xl font-bold text-center text-gray-800 ">
        Meet the Project Creators
      </h2>
      <h1 className='mb-12 mt-3 text-bold'>The caring minds behind KindDose , striving to provide accessible medical help for every individul.</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {creators.map((person, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row items-center sm:items-start bg-white shadow-md rounded-xl p-6"
          >
            <img
              src={person.image}
              alt={person.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />

            <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
              <h3 className="text-xl font-semibold text-gray-800">
                {person.name}
              </h3>
              <p className="text-gray-500 font-medium">{person.role}</p>
              <p className="mt-2 text-gray-600 text-sm">{person.description}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Creators;
