import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    getAppointmentByIdAPI
} from "../../services/UsersService";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";

const AppointmentDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [updateStatus, setUpdateStatus] = useState(null);
    const [appointment, setAppointment] = useState({
        name: "",
        description: "",
        durationMinutes: 0,
        price: 0.0,
    });

    useEffect(() => {
        const userRole = localStorage.getItem("role");
        if (!userRole || (userRole !== "Admin" && userRole !== "Staff")) {
            navigate("/sign-in-sign-up");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                const response = await getAppointmentByIdAPI(id);
                console.log("info:", response);
                if (!response || typeof response !== "object") {
                    throw new Error("Không tìm thấy cuộc hẹn!");
                }
                setAppointment(response);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointment();
    }, [id]);

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden p-6">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main className="grow px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 space-y-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-6">
                                {appointment.appointmentId || "N/A"}
                            </h1>

                            <div className="space-y-4">
                                {/* Name */}
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    ID:
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                    value={appointment.appointmentId}
                                />

                                {/* Description */}
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Start Time:
                                </label>
                                <input
                                    type="datetime-local"
                                    className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                    value={appointment.startTime}
                                    onChange={(e) => setType({ ...appointment, startTime: e.target.value })}
                                />

                                {/* Duration Minutes */}
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    End Time:
                                </label>
                                <input
                                    type="datetime-local"
                                    className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                    value={appointment.endTime}
                                    onChange={(e) => setType({ ...appointment, endTime: e.target.value })}
                                />
                                {/* Price */}
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Status:
                                </label>
                                <input
                                    className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                    value={appointment.Status}
                                    onChange={(e) => setType({ ...appointment, Status: parseFloat(e.target.value) || 0.0 })}
                                />
                                <button
                                    className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-gray-300 transition"
                                // onClick={handleUpdate}
                                >
                                    Save Information
                                </button>
                                {/* {updateStatus && (
                                    <p className={`text-center mt-4 font-semibold ${updateStatus.success ? "text-green-500" : "text-red-500"}`}>
                                        {updateStatus.message}
                                    </p>
                                )} */}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppointmentDetail;
