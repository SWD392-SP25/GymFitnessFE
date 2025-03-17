import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    createAppointmentTypeAPI
} from "../../services/UsersService";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";

const CreateAppointmentType = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);


    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [role, setRole] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        durationMinutes: 0,
        price: 0.0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === "durationMinutes" ? parseInt(value, 10) :
                name === "price" ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting:", formData);
    
        setSuccessMessage("");
        setErrorMessage("");
    
        try {
            const result = await createAppointmentTypeAPI(formData);
            console.log("Success:", result);
            setSuccessMessage("Appointment type created successfully!");
            setFormData({
                name: "",
                description: "",
                durationMinutes: 0,
                price: 0.0,
            });
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Failed to create appointment type. Please try again.");
        }
    };

    useEffect(() => {

        const userRole = localStorage.getItem('role');

        if (!userRole || (userRole !== 'Admin' && userRole !== 'Staff')) {
            navigate('/sign-in-sign-up');
        } else {
            setRole(userRole);
        }
    }, [navigate]);

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden p-6">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main className="grow px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Create New Appointment Type</h2>
                    {successMessage && <div className="mb-4 p-3 text-green-700 bg-green-100 border border-green-400 rounded">{successMessage}</div>}
                    {errorMessage && <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-400 rounded">{errorMessage}</div>}
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description:</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Duration Minutes:</label>
                                <input
                                    type="number"
                                    name="durationMinutes"
                                    value={formData.durationMinutes}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price:</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                />
                            </div>

                            <button type="submit" className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-gray-300 transition">
                                Create Appointment Type
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CreateAppointmentType;
