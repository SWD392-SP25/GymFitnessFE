import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    getExerciseCategoriesAPI, 
    getMuscleGroupAPI, 
    createExerciseAPI } from "../../services/UsersService";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";

const CreateExercise = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [muscles, setMuscles] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // State cho các field
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [muscleGroup, setMuscleGroup] = useState("");
    const [difficultyLevel, setDifficultyLevel] = useState(""); 
    const [equipmentNeeded, setEquipmentNeeded] = useState(""); 
    const [instructions, setInstructions] = useState(""); 
    const [precautions, setPrecautions] = useState(""); 
    const [imageFile, setImageFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        try {
            await createExerciseAPI({
                Name: name,
                Description: description,
                MuscleGroupId: muscleGroup,
                CategoryId: category,
                DifficultyLevel: difficultyLevel,
                EquipmentNeeded: equipmentNeeded,
                Instructions: instructions,
                Precautions: precautions,
                imageFile,
                videoFile
            });

            setSuccessMessage("Exercise created successfully!");
            navigate("/Exercise");
        } catch (error) {
            setErrorMessage("Failed to create exercise.");
            console.error("Error:", error);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden p-6">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main className="grow px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Create New Exercise</h2>
                    {successMessage && <div className="mb-4 p-3 text-green-700 bg-green-100 border border-green-400 rounded">{successMessage}</div>}
                    {errorMessage && <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-400 rounded">{errorMessage}</div>}
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name:</label>
                                <input type="text" className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description:</label>
                                <textarea className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200" value={description} onChange={(e) => setDescription(e.target.value)} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category:</label>
                                <select className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200" value={category} onChange={(e) => setCategory(e.target.value)} required>
                                    <option value="">Choose Category</option>
                                    {categories.map((cat) => <option key={cat.categoryId} value={cat.categoryId}>{cat.categoryName}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Muscle Group:</label>
                                <select className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200" value={muscleGroup} onChange={(e) => setMuscleGroup(e.target.value)} required>
                                    <option value="">Choose Muscle Group</option>
                                    {muscles.map((muscle) => <option key={muscle.muscleGroupId} value={muscle.muscleGroupId}>{muscle.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Difficulty Level:</label>
                                <input type="text" className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200" value={difficultyLevel} onChange={(e) => setDifficultyLevel(e.target.value)} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Equipment Needed:</label>
                                <input type="text" className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200" value={equipmentNeeded} onChange={(e) => setEquipmentNeeded(e.target.value)} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Instructions:</label>
                                <textarea className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200" value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Precautions:</label>
                                <textarea className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200" value={precautions} onChange={(e) => setPrecautions(e.target.value)} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Upload Image:</label>
                                <input
                                    type="file"
                                    className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                />
                                {imageFile && <p className="text-sm text-gray-500 mt-1">Selected: {imageFile.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Upload Video:</label>
                                <input
                                    type="file"
                                    className="mt-1 p-2 block w-full border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                    accept="video/mp4, video/quicktime, video/x-msvideo, video/x-matroska"
                                    onChange={(e) => setVideoFile(e.target.files[0])}
                                />
                                {videoFile && <p className="text-sm text-gray-500 mt-1">Selected: {videoFile.name}</p>}
                            </div>
                            <button type="submit" className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-gray-300 transition"
                            >
                                Create Exercise
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CreateExercise;
