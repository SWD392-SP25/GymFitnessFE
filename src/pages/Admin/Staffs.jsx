import React, { useState, useEffect } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import {
    getStaffsAPI,
} from "../../services/UsersService";
import { Link, useNavigate } from "react-router-dom";

const Staffs = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const [staffs, setStaffs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [role, setRole] = useState(null);

    useEffect(() => {
        const userRole = localStorage.getItem('role');

        if (!userRole || (userRole !== 'Admin' && userRole !== 'Staff')) {
            navigate('/sign-in-sign-up');
        } else {
            setRole(userRole);
        }
    }, [navigate]);

    useEffect(() => {
        const fetchStaffs = async () => {
            try {
                const response = await getStaffsAPI({
                    filterOn: "name",
                    filterQuery: searchQuery,
                    sortOn: "name",
                    isAscending: true,
                    pageNumber: 1,
                    pageSize: 5,
                });
                console.log("Staffs fetched:", response);
                setStaffs(response || []);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách nhân viên:", error);
                setError("Không thể lấy dữ liệu");
            } finally {
                setLoading(false);
            }
        };
        fetchStaffs();
    }, [searchQuery]);



    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden p-4">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main className="grow px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold">Staffs List</h1>
                    </div>
                    <div className="flex gap-4 mb-4 items-center">
                        <input
                            type="text"
                            placeholder="Searching..."
                            className="border border-gray-300 rounded w-2/5 p-2"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                    </div>


                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">Lỗi: {error}</p>}
                    {staffs.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200 text-left">
                                        <th className="border p-3">No</th>
                                        <th className="border p-3">email</th>
                                        <th className="border p-3">First Name</th>
                                        <th className="border p-3">Last Name</th>
                                        <th className="border p-3">Phone</th>
                                        <th className="border p-3  text-center">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {staffs.length > 0 ? (
                                        staffs.map((staff, index) => (
                                            <tr key={index} className="border">
                                                <td className="border p-3">{index}</td>
                                                <td className="border p-3">{staff.email}</td>
                                                <td className="border p-3">{staff.firstName}</td>
                                                <td className="border p-3">{staff.lastName}</td>
                                                <td className="border p-3">{staff.phone}</td>
                                                <td className="p-3 text-center">
                                                    <Link
                                                        // to={`/Exercise-Detail/${exercise.exerciseId}`}
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
                        <p>No staffs found!</p>
                    )}

                </main>
            </div>
        </div>
    );
};

export default Staffs;