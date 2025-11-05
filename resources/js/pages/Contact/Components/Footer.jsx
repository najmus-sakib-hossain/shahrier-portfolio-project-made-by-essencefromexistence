import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#2E5AFF] h-[135px]">
      <div className="h-full flex items-center justify-center gap-6 flex-wrap lg:flex-nowrap text-white font-semibold text-xl">
        <a href="https://www.linkedin.com/in/mohammadshahriarkhan/">
          {" "}
          <h1>LINKEDIN</h1>
        </a>
        <a href="https://www.facebook.com/notesofshahriar">
          {" "}
          <h1>FACEBOOK</h1>
        </a>
        <h1>INSTAGRAM</h1>
        <h1>PINTEREST</h1>
      </div>
    </div>
  );
};

export default Footer;
