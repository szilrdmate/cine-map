import React from "react";

const Footer = () => {


  return (
    <div className="md:flex justify-center bg-white w-screen z-10 absolute bottom-0 left-0 h-12 hidden">
      <div className="w-8 h-screen bg-white absolute right-0 bottom-0 z-10"></div>
      <div className="w-8 h-screen bg-white absolute left-0 bottom-0 z-10"></div>
      <div className="w-[calc(100vw-64px)] bg-teal-950 absolute bottom-8 h-32 z-10 rounded-b-2xl"></div>
    </div>
  );
};

export default Footer;
