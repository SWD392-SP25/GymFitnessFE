import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserByEmailAPI } from "../../services/UsersService";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";

const UserDetail = () => {
    const { email } = useParams();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userRole = localStorage.getItem("role");
        if (!userRole || (userRole !== "Admin" && userRole !== "Staff")) {
            navigate("/sign-in-sign-up");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserByEmailAPI(email);
                setUser(response);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };
        fetchUser();
    }, [email]);

    if (!user) return <p className="text-center text-gray-500">Loading...</p>;

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden p-6">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main className="grow px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 space-y-6">
                        {/* Avatar & Basic Info */}
                        <div className="flex flex-col items-center">
                            <img
                                src={user.profilePictureUrl}
                                alt="Profile"
                                className="w-32 h-32 rounded-full shadow-md border border-gray-300"
                            />
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-4">
                                {user.firstName || "N/A"} {user.lastName || "N/A"}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                        </div>

                        {/* User Details */}
                        <div className="grid grid-cols-2 gap-6 text-gray-900 dark:text-gray-200">
                            <div>
                                <h2 className="text-lg font-semibold">Personal Info</h2>
                                <div className="mt-2">
                                    <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
                                    <p><strong>Date of Birth:</strong> {user.dateOfBirth || "N/A"}</p>
                                    <p><strong>Gender:</strong> {user.gender || "N/A"}</p>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold">Address</h2>
                                <div className="mt-2">
                                    <p><strong>Address Line 1:</strong> {user.addressLine1 || "N/A"}</p>
                                    <p><strong>City:</strong> {user.city || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UserDetail;
