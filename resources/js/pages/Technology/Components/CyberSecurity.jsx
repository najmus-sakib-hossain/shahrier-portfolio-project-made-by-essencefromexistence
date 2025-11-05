import React from "react";

const CyberSecurity = ({ technologies = [] }) => {
  return (
    <div className="bg-[#2E5AFF] py-18">
      <div className="w-11/12 lg:w-9/12 mx-auto text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-10">
          <div>
            <h1 className="text-5xl font-semibold mb-8">
              Cyber ​​security skills
            </h1>

            <p className="text-white mb-8">
              Cybersecurity is a critical component of modern business operations. Shahriar Khan has extensive experience in implementing robust security measures, conducting risk assessments, and developing strategies to protect digital assets.
            </p>

            <p className="text-base">
              His expertise includes network security, data protection, compliance frameworks, and incident response planning. Through Nexkraft LTD, he has helped numerous organizations strengthen their cybersecurity posture and navigate the evolving threat landscape.
            </p>
          </div>

          <div>
            <div className="relative z-10">
              <img src="/assets/technology/cyber_security_image.png" alt="" />
              <div className="absolute hidden lg:block -top-8 -right-8 -z-10">
                <img src="/assets/technology/frame.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberSecurity;
