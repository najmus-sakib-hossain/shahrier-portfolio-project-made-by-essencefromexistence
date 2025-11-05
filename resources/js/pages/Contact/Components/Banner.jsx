const Banner = () => {
  return (
    <div
      style={{
        backgroundImage: `url(/assets/contact/contact_banner_bg.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "800px",
      }}
    >
      <h1 className="text-5xl font-semibold text-white text-center pt-24 underline mb-24">
        Contact
      </h1>

      <div className="w-11/12 lg:w-9/12 mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-10">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-4xl font-semibold text-white">
                Let's talk over a cup of coffee!
              </h3>
              <div>
                <img src="/assets/contact/cofffee_icon.svg" alt="" />
              </div>
            </div>

            <p className="text-white mb-14">
              Ready to elevate your brand with unforgettable experiential
              events? <br /> <br />
              Whether you're a brand looking to create a unique brand experience
              or a creative professional seeking collaboration, we're here to
              bring your vision to life.
            </p>

            <p className="text-white text-3xl">
              <span className="text-4xl text-white">Email: </span>
              mdshahriar.khan@gmail.com{" "}
            </p>
          </div>

          <div className="lg:w-1/2">
            <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
              <h1 className="text-xl font-semibold mb-4">Drop Your Message</h1>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full p-3  rounded-md bg-slate-100"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full p-3  rounded-md  bg-slate-100"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3  rounded-md  bg-slate-100"
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    className="w-full p-3  rounded-md  bg-slate-100"
                  />
                </div>
                <textarea
                  placeholder="Message"
                  className="w-full p-3  rounded-md  bg-slate-100"
                  rows="4"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
