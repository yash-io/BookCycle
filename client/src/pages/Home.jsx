import React from "react";

const Home = () => {
  return (
    <div className="text-white p-6">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Bookshare</h1>
        <p className="text-lg mb-4">
          Bookshare is a platform where you can share and upload educational materials with ease. Whether you have PDFs, eBooks, or audiobooks, you can contribute to our growing library and help others in their learning journey.
        </p>
        <div className="w-full md:w-3/4 lg:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4">How to Share Materials</h2>
          <ol className="list-decimal list-inside">
            <li className="mb-2">
              <strong>Sign Up or Log In:</strong> Create an account or log in to your existing account to start sharing materials.
            </li>
            <li className="mb-2">
              <strong>Navigate to Upload:</strong> Go to the "Upload Materials" section from the navigation menu.
            </li>
            <li className="mb-2">
              <strong>Fill in the Details:</strong> Provide the necessary details about the material, such as title, author, type (PDF, eBook, audiobook), and a brief description.
            </li>
            <li className="mb-2">
              <strong>Upload the File:</strong> Select the file from your device and upload it to our platform.
            </li>
            <li className="mb-2">
              <strong>Submit:</strong> Click the "Submit" button to share your material with the community.
            </li>
          </ol>
        </div>
        <div className="w-full md:w-3/4 lg:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Benefits of Sharing</h2>
          <ul className="list-disc list-inside">
            <li className="mb-2">Help others in their learning journey by providing valuable resources.</li>
            <li className="mb-2">Contribute to a growing community of learners and educators.</li>
            <li className="mb-2">Gain recognition for your contributions.</li>
            <li className="mb-2">Access a wide range of educational materials shared by others.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;