import React, { useState, useEffect } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import {
    getUsersAPI,
    banUserAPI
} from "../../services/UsersService";
import { Link, useNavigate } from "react-router-dom";

const Users = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [role, setRole] = useState(null);
    const [users, setUser] = useState([]);

    useEffect(() => {
        const userRole = localStorage.getItem('role');

        if (!userRole || (userRole !== 'Admin' && userRole !== 'Staff')) {
            navigate('/sign-in-sign-up');
        } else {
            setRole(userRole);
        }
    }, [navigate]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsersAPI({
                    filterOn: searchQuery.includes("@") ? "email" : "name",
                    filterQuery: searchQuery,
                });
                setUser(response || []);
            } catch (error) {
                setError("Không thể lấy dữ liệu");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [searchQuery]);


    const handleBanUser = async (email) => {
        if (!window.confirm(`Bạn có chắc chắn muốn ban user ${email}?`)) return;

        try {
            await banUserAPI(email);
            alert(`User ${email} đã bị ban.`);
            setUser((prevUsers) => prevUsers.map(user =>
                user.email === email ? { ...user, status: 'Banned' } : user
            ));
        } catch (error) {
            alert(`Lỗi khi ban user ${email}: ${error.message}`);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden p-4">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main className="grow px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold">User List</h1>
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
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200 text-left">
                                    <th className="border p-3">No</th>
                                    <th className="border p-3">Email</th>
                                    <th className="border p-3">First Name</th>
                                    <th className="border p-3">Last Name</th>
                                    <th className="border p-3">Phone</th>
                                    <th className="border p-3">City</th>
                                    <th className="border p-3">Status</th>
                                    <th className="border p-3 text-center">Ban</th>
                                    <th className="border p-3 text-center">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user, index) => (
                                        <tr key={index} className="border">
                                            <td className="border p-3">{index}</td>
                                            <td className="border p-3">{user.email}</td>
                                            <td className="border p-3">{user.firstName}</td>
                                            <td className="border p-3">{user.lastName}</td>
                                            <td className="border p-3">{user.phone}</td>
                                            <td className="border p-3">{user.city}</td>
                                            <td className="border p-3">{user.status}</td>
                                            <td className="border p-3 text-center">
                                                <button
                                                    onClick={() => handleBanUser(user.email)}
                                                    disabled={user.status === "Banned"}
                                                    className={`px-3 py-1 rounded transition inline-block text-center ${user.status === "Banned"
                                                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                                                        : "bg-red-500 text-white hover:bg-red-600"
                                                        }`}
                                                >
                                                    Ban
                                                </button>
                                            </td>
                                            <td className="p-3 text-center">
                                                <Link
                                                    to={`/User-Detail/${user.email}`}
                                                    className="bg-[#8470FF] text-white px-3 py-1 rounded hover:bg-[#6b5acd] transition inline-block text-center"
                                                >
                                                    View
                                                </Link>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center p-3">No user found!</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Users;