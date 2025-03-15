import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    getExerciseByIdAPI,
    getExerciseCategoriesAPI,
    getMuscleGroupAPI,
    updateExerciseDataByIdAPI,
    updateExerciseMediaByIdAPI }from "../../services/UsersService";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";

const ExerciseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [exercise, setExercise] = useState(null);
    const [categories, setCategories] = useState([]);
    const [muscles, setMuscles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [updateStatus, setUpdateStatus] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [mediaUpdateStatus, setMediaUpdateStatus] = useState(null);
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
        const fetchCategories = async () => {
            try {
                const response = await getExerciseCategoriesAPI();
                setCategories(response || []);
            } catch (error) {
                console.error("Lỗi khi lấy danh mục bài tập:", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchMuscles = async () => {
            try {
                const response = await getMuscleGroupAPI();
                setMuscles(response || []);
            } catch (error) {
                console.error("Lỗi khi lấy nhóm cơ:", error);
            }
        };
        fetchMuscles();
    }, []);

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                const response = await getExerciseByIdAPI(id);
                console.log("info:", response);
                if (!response || typeof response !== "object") {
                    throw new Error("Không tìm thấy bài tập!");
                }
                setExercise(response);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchExercise();
    }, [id]);

    const handleUpdate = async () => {
        if (!exercise) return;

        // Dữ liệu cập nhật
        const updateData = [
            { op: "replace", path: "/name", value: exercise.name },
            { op: "replace", path: "/description", value: exercise.description },
            { op: "replace", path: "/categoryId", value: exercise.categoryId },
            { op: "replace", path: "/muscleGroupId", value: exercise.muscleGroupId },
            { op: "replace", path: "/EquipmentNeeded", value: exercise.equipmentNeeded },
            { op: "replace", path: "/Instructions", value: exercise.instructions },
            { op: "replace", path: "/Precautions", value: exercise.precautions },
        ];

        try {
            await updateExerciseDataByIdAPI(id, updateData);
            setUpdateStatus({ success: true, message: "ERROR!!!!!!!!!!!!!!!!" });
        } catch (error) {
            console.error("Lỗi khi cập nhật bài tập:", error);
            setUpdateStatus({ success: false, message: "Cập nhật thất bại!" });
        }
    };

    const handleUploadMedia = async () => {
        try {
            await updateExerciseMediaByIdAPI(id, imageFile, videoFile);
            setMediaUpdateStatus({ success: true, message: "ERROR!!!!!!!!!!" });
    
            // Refresh dữ liệu sau khi cập nhật thành công
            const updatedExercise = await getExerciseByIdAPI(id);
            setExercise(updatedExercise);
        } catch (error) {
            console.error("Lỗi khi cập nhật media:", error);
            setMediaUpdateStatus({ success: false, message: "Cập nhật media thất bại!" });
        }
    };

    if (loading) {
        return <p className="text-center text-lg text-blue-500 dark:text-blue-300">Đang tải...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 font-semibold dark:text-red-300">{error}</p>;
    }

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden p-6">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main className="grow px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 space-y-6">

                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-6">
                                {exercise.name}
                            </h1>

                            <div className="space-y-4">
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Name:</label>
                                <input
                                    type="text"
                                    className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                    value={exercise.name}
                                    onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
                                />

                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Description:</label>
                                <textarea
                                    className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                    value={exercise.description}
                                    onChange={(e) => setExercise({ ...exercise, description: e.target.value })}
                                />

                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Category:</label>
                                <select
                                    className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                    value={exercise?.categoryId || ""}
                                    onChange={(e) => setExercise({ ...exercise, categoryId: Number(e.target.value) })}
                                >
                                    <option value="">Choose Category</option>
                                    {categories.map((category) => (
                                        <option key={category.categoryId} value={category.categoryId}>
                                            {category.categoryName}
                                        </option>
                                    ))}
                                </select>

                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Muscle Group:</label>
                                <select
                                    className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                    value={exercise?.muscleGroupId || ""}
                                    onChange={(e) => setExercise({ ...exercise, muscleGroupId: Number(e.target.value) })}
                                >
                                    <option value="">Choose Muscle Group</option>
                                    {muscles.map((muscle) => (
                                        <option key={muscle.muscleGroupId} value={muscle.muscleGroupId}>
                                            {muscle.name}
                                        </option>
                                    ))}
                                </select>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Equipment:</label>
                                <input
                                    type="text"
                                    className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                    value={exercise.equipmentNeeded}
                                    onChange={(e) => setExercise({ ...exercise, equipmentNeeded: e.target.value })}
                                />
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Instructions:</label>
                                <input
                                    type="text"
                                    className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                    value={exercise.instructions}
                                    onChange={(e) => setExercise({ ...exercise, instructions: e.target.value })}
                                />
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Precautions:</label>
                                <input
                                    type="text"
                                    className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                    value={exercise.precautions}
                                    onChange={(e) => setExercise({ ...exercise, precautions: e.target.value })}
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

                        <hr className="border-gray-300 dark:border-gray-600" />

                    
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-4">Media</h2>

                        <div className="mb-6 flex flex-col items-start space-y-4">
                            {exercise.imageUrl ? (
                                <img
                                    src={exercise.imageUrl}
                                    alt={exercise.name}
                                    className="w-full h-full object-cover rounded-lg shadow-md border border-gray-300 dark:border-gray-700"
                                />
                            ) : (
                                <p className="text-gray-500 dark:text-gray-300">No Image Found</p>
                            )}

                            {exercise.videoUrl ? (
                                <video controls className="w-full max-w-md rounded-lg shadow-md border border-gray-300 dark:border-gray-700">
                                    <source src={exercise.videoUrl} type="video/mp4" />
                                    Your browser does not support video playback.
                                </video>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-300">No Video Found</p>
                            )}
                        </div>

                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Upload New Image:</label>
                        <input
                            type="file"
                            className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}
                        />

                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Upload New Video:</label>
                        <input
                            type="file"
                            className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                            accept="video/mp4, video/quicktime, video/x-msvideo, video/x-matroska"
                            onChange={(e) => setVideoFile(e.target.files[0])}
                        />

                        <button
                            className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-gray-300 transition"
                            onClick={handleUploadMedia}
                        >
                            Save Media
                        </button>

                        {mediaUpdateStatus && (
                            <p className={`text-center mt-4 font-semibold ${mediaUpdateStatus.success ? "text-green-500" : "text-red-500"}`}>
                                {mediaUpdateStatus.message}
                            </p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ExerciseDetail;
