import React, { useState, useEffect } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import {
    getAppointmentsAPI,
    getAppointmentTypesAPI
} from "../../services/UsersService";
import { Link, useNavigate } from "react-router-dom";

const Appointment = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
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
        const fetchAppointments = async () => {
            try {
                const response = await getAppointmentsAPI({
                    filterOn: "name",
                    filterQuery: searchQuery,
                    sortBy: "name",
                    isAscending: true,
                    pageNumber: 1,
                    pageSize: 5,
                });
                console.log("Appointments fetched:", response);
                setAppointments(response || []);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách lịch hẹn:", error);
                setError("Không thể lấy dữ liệu");
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, [searchQuery]);

    useEffect(() => {
        const fetcTypes = async () => {
            try {
                const response = await getAppointmentTypesAPI();
                setAppointmentTypes(response);
                console.log("Types fetched:", response);
            } catch (error) {
                console.error("Lỗi tải danh sách loại lịch hẹn:", error);
            }
        };
        fetcTypes();
    }, []);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden p-4">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main className="grow px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold">Appointment List</h1>
                    </div>
                    <div className="flex gap-4 mb-4 items-center">
                        <input
                            type="text"
                            placeholder="Searching..."
                            className="border border-gray-300 rounded w-2/5 p-2"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <select
                            value={selectedType}
                            onChange={(e) => {
                                setSelectedType(e.target.value);
                                if (onSelect) onSelect(e.target.value);
                            }}
                        >
                            <option value="">Types</option>
                            {appointmentTypes.map((appointmentType) => (
                                <option key={appointmentType.typeId} value={appointmentType.description}>
                                    {appointmentType.description}
                                </option>
                            ))}
                        </select>
                    </div>


                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">Lỗi: {error}</p>}
                    {appointments.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200 text-left">
                                        <th className="border p-3">ID</th>
                                        <th className="border p-3">User Email</th>
                                        <th className="border p-3">Staff Email</th>
                                        <th className="border p-3">Type</th>
                                        <th className="border p-3">startTime</th>
                                        <th className="border p-3  text-center">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.length > 0 ? (
                                        appointments.map((appointment) => (
                                            <tr key={appointment.appointmentId} className="border">
                                                <td className="border p-3">{appointment.appointmentId}</td>
                                                <td className="border p-3">{appointment.userName}</td>
                                                <td className="border p-3">{appointment.staffName}</td>
                                                <td className="border p-3">{appointment.description}</td>
                                                <td className="border p-3">{appointment.startTime}</td>
                                                <td className="p-3 text-center">
                                                    <Link
                                                        to={`/Appointment-Detail/${appointment.appointmentId}`}
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

export default Appointment;