import React, { useState, useEffect } from "react";
import {
  sendAllNotificationAPI,
  sendIndividualNotificationAPI
} from "../../services/UsersService";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { useNavigate } from "react-router-dom";

const SendNoti = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSendAll, setIsSendAll] = useState(true);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [deviceToken, setDeviceToken] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [role, setRole] = useState(null);

  useEffect(() => {

    const userRole = localStorage.getItem('role');

    if (!userRole || (userRole !== 'Admin' && userRole !== 'Staff')) {
      navigate('/sign-in-sign-up');
    } else {
      setRole(userRole);
    }
  }, [navigate]);
  if (!role) return null;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");


    if (!title || !message || !type || !deviceToken) {
      setErrorMessage("⚠️ All fields are required.");
      return;
    }

    try {
      const payload = { title, message, type, deviceToken };

      if (isSendAll) {
        console.log("Sending to All:", payload);
        await sendAllNotificationAPI(payload);
        setSuccessMessage("Notification sent to all users!");
      } else {
        console.log("Sending to Individual:", payload);
        await sendIndividualNotificationAPI(payload);
        setSuccessMessage("Notification sent to the individual user!");
      }


      setTitle("");
      setMessage("");
      setType("");
      setDeviceToken("");
    } catch (error) {
      setErrorMessage("⚠️ Failed to send notification. Please try again.");
    }
  };


  const handleToggle = () => {
    setIsSendAll(!isSendAll);
    setTitle("");
    setMessage("");
    setType("");
    setDeviceToken("");
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              {isSendAll ? "Send Notification to All" : "Send Notification to One"}
            </h2>

            {/* Toggle Switch */}
            <div className="flex items-center mb-6">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Send to All
              </span>
              <label className="relative inline-flex items-center cursor-pointer ml-3">
                <input type="checkbox" className="sr-only peer" checked={!isSendAll} onChange={handleToggle} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 
                                peer-checked:after:translate-x-full peer-checked:after:border-white 
                                after:content-[''] after:absolute after:top-0.5 after:left-1 after:bg-white 
                                after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                                after:transition-all peer-checked:bg-blue-600"></div>
              </label>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-3">
                Send to Individual
              </span>
            </div>

            {successMessage && (
              <div className="mb-4 p-3 text-green-700 bg-green-100 border border-green-400 rounded">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-400 rounded">
                {errorMessage}
              </div>
            )}

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Title:
                  </label>
                  <input
                    type="text"
                    className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message:
                  </label>
                  <textarea
                    className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Type:
                  </label>
                  <select
                    className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  >
                    <option value="">Choose Type</option>
                    <option value="info">Noti</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                  </select>
                </div>


                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Device Token:
                  </label>
                  <input
                    type="text"
                    className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                    value={deviceToken}
                    onChange={(e) => setDeviceToken(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white transition"
                >
                  {isSendAll ? "Send to All" : "Send to Individual"}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SendNoti;
