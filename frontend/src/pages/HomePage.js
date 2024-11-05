import React from 'react';
import SearchBar from '../components/SearchBar';
import backimg from '../images/background.jpg';
import PopularDestinations from '../components/PopularDestinations';
import Testimonials from '../components/Testimonials';

const HomePage = ({isAdmin}) => {
  console.log(isAdmin)
  return (
    <div className="w-full">
      <div className="flex flex-col relative m-0 p-0">
        <div className="h-[68vh] w-screen overflow-hidden flex items-center justify-center relative top-0">
          <img src={backimg} className="h-full min-w-full object-cover" alt="background" />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="pb-[5rem] md:pb-0 absolute text-white text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <div className="text-2xl md:text-4xl lg:text-5xl font-bold">
              PLAN YOUR TRIP WITH LAXMAN TOUR AND TRAVELS
            </div>
          </div>
        </div>

        <div className="relative h-[32vh] w-screen">
          {/* Empty div to allow lower section to take space */}
        </div>

        <div className="w-full absolute top-[68%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none">
          <div className="w-full pointer-events-auto ">
            <SearchBar />
          </div>
        </div>
      </div>

      <div className=" md: lg:px-[10vw]">
        <PopularDestinations  isAdmin={isAdmin}/>
      </div>

      <div className=" lg:px-[10vw]">
        <Testimonials />
      </div>
    </div>
  );
}

export default HomePage;
