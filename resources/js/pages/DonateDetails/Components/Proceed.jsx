import { useParams } from "react-router-dom";
import { useState } from "react";

const Proceed = () => {
  const [selected, setSelected] = useState(null);

  const paymentMethods = [
    {
      id: "bkash",
      name: "BKash",
      description: "Pay from your bKash account",
      img: "/assets/donation/bkash.svg",
    },
    {
      id: "rocket",
      name: "Rocket",
      description: "Pay from your Rocket account",
      img: "/assets/donation/rocket.svg",
    },
    {
      id: "nagad",
      name: "Nagad",
      description: "Pay from your Nagad account",
      img: "/assets/donation/nagad.svg",
    },
    {
      id: "visa",
      name: "Visa",
      description: "Pay using credit/debit card",
      img: "/assets/donation/visa.svg",
    },
  ];

  const donationCards = [
    { id: 1, image: "/assets/donation/donate_card1.png", title: "Donate to homeless children" },
    { id: 2, image: "/assets/donation/donate_card2.png", title: "Donate to Gazans in Palestine" },
  ];
  const [selectedAccount, setSelectedAccount] = useState("user");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();
  const donationItem = donationCards.find((item) => item.id === parseInt(id));

  return (
    <div className="bg-slate-50 py-18">
      <div className="w-11/12 lg:w-9/12 mx-auto">
        <div className="mt-24">
          <h1 className="text-5xl font-semibold text-slate-900 mb-6">
            {donationItem.title}
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="w-full">
                <img
                  className="w-full h-[600px] object-cover rounded-2xl"
                  src={donationItem.image}
                  alt="Donation"
                />
              </div>
            </div>

            <div className="lg:col-span-1 bg-white rounded-xl p-6 shadow">
              <h1 className="text-2xl font-semibold text-slate-900 mb-4">
                Donation Option
              </h1>
              <p className="text-slate-700 mb-4">
                Ready to elevate your brand with unforgettable experiential
                events? <br /> <br />
                Whether you're a brand looking to create a unique brand
                experience or a creative professional seeking collaboration,
                we're here to bring your vision to life.
              </p>

              {/* Account Selection */}
              <div className="flex space-x-6 mb-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="account"
                    value="user"
                    checked={selectedAccount === "user"}
                    onChange={() => setSelectedAccount("user")}
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                      selectedAccount === "user"
                        ? "border-blue-500"
                        : "border-gray-400"
                    }`}
                  >
                    {selectedAccount === "user" && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <span className="text-gray-800 font-medium">
                    User Account
                  </span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="account"
                    value="anonymous"
                    checked={selectedAccount === "anonymous"}
                    onChange={() => setSelectedAccount("anonymous")}
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                      selectedAccount === "anonymous"
                        ? "border-blue-500"
                        : "border-gray-400"
                    }`}
                  >
                    {selectedAccount === "anonymous" && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <span className="text-gray-800 font-medium">
                    Anonymous Account
                  </span>
                </label>
              </div>

              {/* Donation Amount Selection */}
              <div className="flex space-x-4">
                {[50, 100, 200, 300].map((amount) => (
                  <button
                    key={amount}
                    className={`px-4 py-2 border rounded-lg text-blue-500 font-semibold transition ${
                      selectedAmount === amount
                        ? "bg-blue-100 border-blue-500"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedAmount(amount)}
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              <div className="space-y-4 mt-4">
                <input
                  type="text"
                  placeholder="Grant Amount"
                  className="rounded-xl bg-slate-50 p-4 w-full text-slate-900"
                />

                <input
                  type="text"
                  placeholder="Your Name"
                  className="rounded-xl bg-slate-50 p-4 w-full text-slate-900"
                />

                <input
                  type="number"
                  placeholder="Mobile Number"
                  className="rounded-xl bg-slate-50 p-4 w-full text-slate-900"
                />

                <div className="flex items-center justify-center">
                  <button
                    className="bg-[#2E5AFF] text-white rounded-lg font-semibold px-8 py-2"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Donate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-slate-100 bg-opacity-20 transition-opacity duration-300"
          onClick={() => setIsModalOpen(false)} 
        >
          <div
            className="bg-white rounded-lg p-6 max-w-2xl text-center shadow-lg transform transition-all duration-300 scale-95 sm:scale-100"
            onClick={(e) => e.stopPropagation()} 
          >
            <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
            <div className="grid grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                    selected === method.id
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelected(method.id)}
                >
                  <input type="radio" name="payment" className="hidden" />
                  <img
                    src={method.img}
                    alt={method.name}
                    className="w-12 h-12 object-contain mr-4"
                  />
                  <div>
                    <p className="font-medium">{method.name}</p>
                    <p className="text-sm text-gray-500">
                      {method.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Proceed;
