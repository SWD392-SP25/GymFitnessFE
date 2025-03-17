import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    getAppointmentTypeByIdAPI,
    updateAppointmentTypeByIdAPI
} from "../../services/UsersService";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";

const AppointmentTypeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [updateStatus, setUpdateStatus] = useState(null);
    const [type, setType] = useState({
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
        const fetchType = async () => {
            try {
                const response = await getAppointmentTypeByIdAPI(id);
                console.log("info:", response);
                if (!response || typeof response !== "object") {
                    throw new Error("Không tìm thấy loại!");
                }
                setType(response);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchType();
    }, [id]);

    const handleUpdate = async () => {
        if (!type) return;

        // Dữ liệu cập nhật
        const updateData = [
            { op: "replace", path: "/name", value: type.name },
            { op: "replace", path: "/description", value: type.description },
            { op: "replace", path: "/durationMinutes", value: type.durationMinutes },
            { op: "replace", path: "/price", value: type.price },
        ];

        try {
            await updateAppointmentTypeByIdAPI(id, updateData);
            setUpdateStatus({ success: true, message: "ERROR!!!!!!!!!!!!!!!!" });
        } catch (error) {
            console.error("Lỗi khi cập nhậtloại:", error);
            setUpdateStatus({ success: false, message: "Cập nhật thất bại!" });
        }
    };
    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden p-6">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main className="grow px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 space-y-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-6">
                                {type.name || "N/A"}
                            </h1>

                            <div className="space-y-4">
                                {/* Name */}
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Name:
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                    value={type.name}
                                    onChange={(e) => setType({ ...type, name: e.target.value || "" })}
                                />

                                {/* Description */}
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Description:
                                </label>
                                <textarea
                                    className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                    value={type.description}
                                    onChange={(e) => setType({ ...type, description: e.target.value || "" })}
                                />

                                {/* Duration Minutes */}
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Duration (Minutes):
                                </label>
                                <input
                                    type="number"
                                    className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                    value={type.durationMinutes}
                                    onChange={(e) => setType({ ...type, durationMinutes: parseInt(e.target.value) || 0 })}
                                />

                                {/* Price */}
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Price:
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                    value={type.price}
                                    onChange={(e) => setType({ ...type, price: parseFloat(e.target.value) || 0.0 })}
                                />
                                <button
                                    className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-gray-300 transition"
                                    onClick={handleUpdate}
                                >
                                    Save Information
                                </button>
                                {updateStatus && (
                                    <p className={`text-center mt-4 font-semibold ${updateStatus.success ? "text-green-500" : "text-red-500"}`}>
                                        {updateStatus.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppointmentTypeDetail;
