import { useForm } from '@inertiajs/react';
import { useState } from 'react';

const Banner = ({ settings }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/contact', {
      onSuccess: () => {
        reset();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
      },
    });
  };

  // Use settings or fallback to defaults
  const pageTitle = settings?.page_title || 'Contact';
  const heading = settings?.heading || "Let's talk over a cup of coffee!";
  const description = settings?.description || "Ready to elevate your brand with unforgettable experiential events?\n\nWhether you're a brand looking to create a unique brand experience or a creative professional seeking collaboration, we're here to bring your vision to life.";
  const contactEmail = settings?.contact_email || 'mdshahriar.khan@gmail.com';
  const formTitle = settings?.form_title || 'Drop Your Message';
  const backgroundImage = settings?.background_image || '/assets/contact/contact_banner_bg.png';

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "800px",
      }}
    >
      <h1 className="text-5xl font-semibold text-white text-center pt-24 underline mb-24">
        {pageTitle}
      </h1>

      <div className="w-11/12 lg:w-9/12 mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-10">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-4xl font-semibold text-white">
                {heading}
              </h3>
              <div>
                <img src="/assets/contact/cofffee_icon.svg" alt="" />
              </div>
            </div>

            <p className="text-white mb-14 whitespace-pre-line">
              {description}
            </p>

            <p className="text-white text-3xl">
              <span className="text-4xl text-white">Email: </span>
              {contactEmail}
            </p>
          </div>

          <div className="lg:w-1/2">
            <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
              <h1 className="text-xl font-semibold mb-4">{formTitle}</h1>
              
              {showSuccess && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
                  Your message has been sent successfully! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={data.first_name}
                      onChange={(e) => setData('first_name', e.target.value)}
                      className="w-full p-3 rounded-md bg-slate-100"
                      required
                    />
                    {errors.first_name && (
                      <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={data.last_name}
                      onChange={(e) => setData('last_name', e.target.value)}
                      className="w-full p-3 rounded-md bg-slate-100"
                      required
                    />
                    {errors.last_name && (
                      <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      className="w-full p-3 rounded-md bg-slate-100"
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Phone"
                      value={data.phone}
                      onChange={(e) => setData('phone', e.target.value)}
                      className="w-full p-3 rounded-md bg-slate-100"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
                <div>
                  <textarea
                    placeholder="Message"
                    value={data.message}
                    onChange={(e) => setData('message', e.target.value)}
                    className="w-full p-3 rounded-md bg-slate-100"
                    rows="4"
                    required
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? 'Sending...' : 'Send'}
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
