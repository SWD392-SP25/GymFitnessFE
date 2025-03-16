import React, { useState, useEffect } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import {
    getExercisesAPI,
    getExerciseCategoriesAPI,
    getMuscleGroupAPI,
    deleteExerciseAPI } from "../../services/UsersService";
import { Link, useNavigate } from "react-router-dom";

const Exercise = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const [exercises, setExercises] = useState([]);
    const [categories, setCategories] = useState([]);
    const [muscles, setMuscles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedMuscle, setSelectedMuscle] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const totalPages = 10;
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
                console.log("Categories fetched:", response);
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
                console.log("Muscles fetched:", response);
                setMuscles(response || []);
            } catch (error) {
                console.error("Lỗi khi lấy nhóm cơ:", error);
            }
        };
        fetchMuscles();
    }, []);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await getExercisesAPI({
                    filterOn: "name",
                    filterQuery: searchQuery,
                    sortBy: "name",
                    isAscending: true,
                    pageNumber: currentPage,
                    pageSize: pageSize,
                });
                console.log("Exercises fetched:", response);
                setExercises(response || []);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách bài tập:", error);
                setError("Không thể lấy dữ liệu");
            } finally {
                setLoading(false);
            }
        };
        fetchExercises();
    }, [currentPage, searchQuery, selectedCategory]);

    const handleDeleteExercise = async (id) => {
        if (window.confirm("You really want to delete this exercise?")) {
            try {
                await deleteExerciseAPI(id);
                setExercises((prev) => prev.filter((exercise) => exercise.exerciseId !== id));
                console.log(`Exercise ID ${id} deleted successfully`);
            } catch (error) {
                console.error(`Lỗi khi xóa bài tập ID ${id}:`, error);
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
                        <h1 className="text-2xl font-semibold">Exercises List</h1>
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
                            className="border border-gray-300 rounded w-1/5 p-2"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category.categoryId} value={category.categoryName}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                        <select
                            className="border border-gray-300 rounded w-1/5 p-2"
                            value={selectedMuscle}
                            onChange={(e) => setSelectedMuscle(e.target.value)}
                        >
                            <option value="">Muscle Group</option>
                            {muscles.map((muscle) => (
                                <option key={muscle.muscleGroupId} value={muscle.name}>
                                    {muscle.name}
                                </option>
                            ))}
                        </select>
                        <Link
                            to="/Create-Exercise"
                            className="ml-auto p-2 rounded text-white font-semibold bg-[#8470FF] hover:bg-[#6b5acd] transition"
                        >
                            Create Exercise
                        </Link>
                    </div>


                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">Lỗi: {error}</p>}
                    {exercises.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200 text-left">
                                        <th className="border p-3">Id</th>
                                        <th className="border p-3">Name</th>
                                        <th className="border p-3">Description</th>
                                        <th className="border p-3">Muscle</th>
                                        <th className="border p-3">Category</th>
                                        <th className="border p-3">Difficulty</th>
                                        <th className="border p-3">Equipment</th>
                                        <th className="border p-3 text-center">Delete</th>
                                        <th className="border p-3">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {exercises.length > 0 ? (
                                        exercises.map((exercise) => (
                                            <tr key={exercise.exerciseId} className="border">
                                                <td className="border p-3">{exercise.exerciseId}</td>
                                                <td className="border p-3">{exercise.name}</td>
                                                <td className="border p-3">{exercise.description}</td>
                                                <td className="border p-3">{exercise.muscleGroupName}</td>
                                                <td className="border p-3">{exercise.categoryName}</td>
                                                <td className="border p-3">{exercise.difficultyLevel}</td>
                                                <td className="border p-3">{exercise.equipmentNeeded}</td>
                                                <td className="border p-3">
                                                    <button
                                                        onClick={() => handleDeleteExercise(exercise.exerciseId)}
                                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                                <td className="p-3 text-center">
                                                    <Link
                                                        to={`/Exercise-Detail/${exercise.exerciseId}`}
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
                        <p>No exercises found!</p>
                    )}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button
                            className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Exercise;