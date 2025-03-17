import React, { useState, useEffect } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import {
    deleteAppointmentTypeAPI,
    getAppointmentTypesAPI
} from "../../services/UsersService";
import { Link, useNavigate } from "react-router-dom";

const AppointmentType = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [role, setRole] = useState(null);
    const [appointmentTypes, setAppointmentTypes] = useState([]);
    const [selectedType, setSelectedType] = useState("");

    useEffect(() => {
        const userRole = localStorage.getItem('role');

        if (!userRole || (userRole !== 'Admin' && userRole !== 'Staff')) {
            navigate('/sign-in-sign-up');
        } else {
            setRole(userRole);
        }
    }, [navigate]);

    useEffect(() => {
        const fetchAppointmentTypes = async () => {
            try {
                const response = await getAppointmentTypesAPI({
                    filterOn: "name",
                    filterQuery: searchQuery,
                    pageNumber: 1,
                    pageSize: 5,
                });
                console.log("API response:", response);
                setAppointmentTypes(response || []);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách loại lịch hẹn:", error);
                setError("Không thể lấy dữ liệu");
            } finally {
                setLoading(false);
            }
        };
        fetchAppointmentTypes();
    }, [searchQuery]);

    const handleDeleteType = async (id) => {
        if (window.confirm("You really want to delete this appointment type?")) {
            try {
                await deleteAppointmentTypeAPI(id);
                setAppointmentTypes((prev) => prev.filter((type) => type.typeId !== id));
                console.log(`Appointment Type ID ${id} deleted successfully`);
            } catch (error) {
                console.error(`Lỗi khi xóa appointment type ID ${id}:`, error);
            }
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden p-4">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main className="grow px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold">Appointment Type List</h1>
                    </div>
                    <div className="flex gap-4 mb-4 items-center">
                        <input
                            type="text"
                            placeholder="Searching..."
                            className="border border-gray-300 rounded w-2/5 p-2"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Link
                            to="/Create-Appointment-Type"
                            className="ml-auto p-2 rounded text-white font-semibold bg-[#8470FF] hover:bg-[#6b5acd] transition"
                        >
                            Create Types
                        </Link>
                    </div>

                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">Lỗi: {error}</p>}
                    {appointmentTypes.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200 text-left">
                                        <th className="border p-3">Id</th>
                                        <th className="border p-3">Name</th>
                                        <th className="border p-3">Description</th>
                                        <th className="border p-3">Duration Minutes</th>
                                        <th className="border p-3">Price</th>
                                        <th className="border p-3  text-center">Delete</th>
                                        <th className="border p-3  text-center">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointmentTypes.length > 0 ? (
                                        appointmentTypes.map((appointmentType) => (
                                            <tr key={appointmentType.typeId} className="border">
                                                <td className="border p-3">{appointmentType.typeId}</td>
                                                <td className="border p-3">{appointmentType.name}</td>
                                                <td className="border p-3">{appointmentType.description}</td>
                                                <td className="border p-3">{appointmentType.durationMinutes}</td>
                                                <td className="border p-3">{appointmentType.price}</td>
                                                <td className="border p-3 text-center">
                                                    <button
                                                        onClick={() => handleDeleteType(appointmentType.typeId)}
                                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                                <td className="p-3 text-center">
                                                    <Link
                                                        to={`/Appointment-Type-Detail/${appointmentType.typeId}`}
                                                        className="bg-[#8470FF] text-white px-3 py-1 rounded hover:bg-[#6b5acd] transition inline-block text-center"
                                                    >
                                                        View
                                                    </Link>
                                                </td>

                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="text-center p-3">No exercises found!</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No appointment found!</p>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AppointmentType;