

const Banner = () => {
  return (
    <section className="w-full bg-white dark:bg-gray-900 py-12 px-6 flex flex-col md:flex-row items-center justify-between gap-8 md:mt-16 mt-12">
      {/* Left Side - Text */}
      <div className="max-w-xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-snug">
          Hello, <span className="text-pink-600 dark:text-pink-400">welcome!</span> <br />
          Learn something <span className="text-pink-500 dark:text-pink-300">new every day!</span>
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Join a vibrant learning community where you can explore new ideas,
          grow your skills, and stay inspired every single day.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email to get started"
            className="px-4 py-2 rounded-md border  text-black border-gray-300 dark:border-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-gray-800 dark:text-white w-full sm:w-2/3"
          />
         
          <button className="px-5 py-2 rounded-md bg-pink-600 text-white font-semibold hover:bg-pink-700 transition duration-200 cursor-pointer">
            Get Started
          </button>
        
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="https://cdn.pixabay.com/photo/2024/07/25/19/34/books-8922159_1280.jpg"
          alt="Books and Learning"
          className="max-w-full h-auto object-contain"
        />
      </div>
    </section>
  );
};

export default Banner;
