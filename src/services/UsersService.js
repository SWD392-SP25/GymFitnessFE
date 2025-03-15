
import instance from "./customize-axios";

//Endpoints đã làm:
// 1 login
// 2 refreshToken
// 3 logout
// 4 send noti all
// 5 send noti 1 
// 6 get all exercise
// 7 get exercise by id 
// 8 get all cate 
// 9 get all muscle
// 10 update exercise: data 
// 11 update exercise: img and video 1/2
// 12 delete exercise //
// 13 create exercise 1/2

//---------------------------------------------------AuthEndpoints----------------------------------------------
const AuthEndpoints = {
  login: "/auth/login", 
  refreshToken: "/auth/refresh-token", 
  logout: "/auth/logout", 
};

// login
export const loginAPI = async (idToken) => {
  try {
    const response = await instance.post(AuthEndpoints.login, {
      idToken,
    });
    return response;
  } catch (error) {
    console.error("❌ Lỗi đăng nhập:", error);
    throw error;
  }
};


// Refresh Token
export const refreshTokenAPI = async (refreshToken) => {
  try {
    const response = await instance.post(AuthEndpoints.refreshToken, { refreshToken });
    return response;
  } catch (error) {
    console.error("❌ Lỗi làm mới token:", error);
    throw error;
  }
};

// logout
export const logoutAPI = async () => {
  try {
    const token = localStorage.getItem("token"); // Lấy access token từ localStorage

    if (!token) throw new Error("Không tìm thấy access token!");

    // Gửi request logout lên backend kèm token theo đúng format yêu cầu
    await instance.post(AuthEndpoints.logout, { accessToken: token });
    // Xóa dữ liệu đăng nhập khỏi localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");

    return true;
  } catch (error) {
    console.error("❌ Lỗi đăng xuất:", error);
    return false;
  }
};


//---------------------------------------------------NotificationEndpoints----------------------------------------------
const NotificationEndpoints = {
  sendAll: "/Notification/sendall", 
  sendIndividual: "/Notification/sendindividual", 

};

// send all
export const sendAllNotificationAPI = async ({ title, message, type, deviceToken }) => {
  try {
    console.log("📢 Dữ liệu gửi đi:", { title, message, type, deviceToken });

    const response = await instance.post(NotificationEndpoints.sendAll, {
      title,
      message,
      type,
      deviceToken,
    });

    return response;
  } catch (error) {
    console.error("❌ Lỗi gửi thông báo:", error.response?.data || error);
    throw error;
  }
};

// send 1
export const sendIndividualNotificationAPI = async ({ title, message, type, deviceToken }) => {
  try {
    console.log("📩 Gửi thông báo cá nhân:", { title, message, type, deviceToken });

    const response = await instance.post(NotificationEndpoints.sendIndividual, {
      title,
      message,
      type,
      deviceToken,
    });

    return response;
  } catch (error) {
    console.error("❌ Lỗi gửi thông báo cá nhân:", error.response?.data || error);
    throw error;
  }
};


//---------------------------------------------------ExerciseEndpoints----------------------------------------------
const ExerciseEndpoints = {
  getExercises: "/Exercise", 
  getExerciseById: "/Exercise/{id}",
  updateExerciseDataById: "/Exercise/{id}",
  updateExerciseMediaById: "/Exercise/{id}/upload",
  createExercises: "/Exercise", 
};

// get all exercise
export const getExercisesAPI = async ({ 
  filterOn = "", 
  filterQuery = "", 
  sortBy = "", 
  isAscending = true, 
  pageNumber = 1, 
  pageSize = 5 
} = {}) => {
  try {
    const response = await instance.get(ExerciseEndpoints.getExercises, {
      params: {
        filterOn,
        filterQuery,
        sortBy,
        isAscending,
        pageNumber,
        pageSize,
      },
    });

    return response;
  } catch (error) {
    console.error("❌ Lỗi lấy danh sách bài tập:", error.response?.data || error);
    throw error;
  }
};

// get exercise by id
export const getExerciseByIdAPI = async (id) => {
  try {
    const response = await instance.get(ExerciseEndpoints.getExerciseById.replace("{id}", id));
    return response;
  } catch (error) {
    console.error(`❌ Lỗi lấy bài tập có ID ${id}:`, error.response?.data || error);
    throw error;
  }
};

// update exercise data
export const updateExerciseDataByIdAPI = async (id, updateData) => {
  try {
    console.log("🔄 Gửi request PATCH với data:", JSON.stringify(updateData, null, 2));

    const response = await instance.patch(
      ExerciseEndpoints.updateExerciseDataById.replace("{id}", id),
      updateData, // Đảm bảo giữ nguyên định dạng JSON Patch
      {
        headers: { "Content-Type": "application/json-patch+json" },
      }
    );

    console.log("✅ Response:", response.data);
    return response;
  } catch (error) {
    console.error(
      `❌ Lỗi cập nhật bài tập có ID ${id}:`,
      error?.response?.data ?? error.message
    );
    throw error;
  }
};

// update exercise media 
export const updateExerciseMediaByIdAPI = async (id, imageFile, videoFile) => {
  try {
    const formData = new FormData();
    if (imageFile) formData.append("ImageFile", imageFile);
    if (videoFile) formData.append("VideoFile", videoFile);

    console.log("🔄 Uploading media for exercise...");

    const response = await instance.patch(
      ExerciseEndpoints.updateExerciseMediaById.replace("{id}", id),
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    console.log("✅ Upload successful:", response.data);
    return response.data;
  } catch (error) {
    console.error(`❌ Error uploading media for exercise ID ${id}:`, error.response?.data || error);
    throw error;
  }
};

// create new exercise
export const createExerciseAPI = async ({ Name, Description, MuscleGroupId, CategoryId, DifficultyLevel, EquipmentNeeded, Instructions, Precautions, imageFile, videoFile }) => {
  try {
      const formData = new FormData();
      formData.append("Name", Name);
      formData.append("Description", Description);
      formData.append("MuscleGroupId", MuscleGroupId);
      formData.append("CategoryId", CategoryId);
      formData.append("DifficultyLevel", DifficultyLevel);
      formData.append("EquipmentNeeded", EquipmentNeeded);
      formData.append("Instructions", Instructions);
      formData.append("Precautions", Precautions);

      if (imageFile) formData.append("ImageFile", imageFile);
      if (videoFile) formData.append("VideoFile", videoFile);

      console.log("🆕 Creating new exercise...");

      const response = await instance.post(ExerciseEndpoints.createExercises, formData, {
          headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Exercise created successfully:", response.data);
      return response.data;
  } catch (error) {
      console.error("❌ Error creating exercise:", error.response?.data || error);
      throw error;
  }
};





//---------------------------------------------------CategoryEndpoints----------------------------------------------
const CategoryEndpoints = {
  getCategories: "/ExerciseCategory", 
};

// get all cate 
export const getExerciseCategoriesAPI = async ({ 
  filterOn = "", 
  filterQuery = "", 
  pageNumber = 1, 
  pageSize = 10 
} = {}) => {
  try {
    const response = await instance.get(CategoryEndpoints.getCategories, {
      params: {
        filterOn,
        filterQuery,
        pageNumber,
        pageSize,
      },
    });

    return response;
  } catch (error) {
    console.error("❌ Lỗi lấy danh sách danh mục bài tập:", error.response?.data || error);
    throw error;
  }
};


//---------------------------------------------------MuscleEndpoints----------------------------------------------
const MuscleEndpoints = {
  getMuscles: "/MuscleGroup", 
};


// get all muscle group
export const getMuscleGroupAPI = async ({ 
  filterOn = "", 
  filterQuery = "", 
  pageNumber = 1, 
  pageSize = 10 
} = {}) => {
  try {
    const response = await instance.get(MuscleEndpoints.getMuscles, {
      params: {
        filterOn,
        filterQuery,
        pageNumber,
        pageSize,
      },
    });

    return response;
  } catch (error) {
    console.error("❌ Lỗi lấy danh sách nhóm cơ:", error.response?.data || error);
    throw error;
  }
};


// ✅ Đăng xuất
// export const logoutAPI = async () => {
//   try {
//     const token = localStorage.getItem("token"); // Lấy access token từ localStorage

//     if (!token) throw new Error("Không tìm thấy access token!");

//     // Gửi request logout lên backend kèm token
//     await instance.post(AuthEndpoints.logout, {body: `${token}`}, { 
//       // headers: {
//       //   Authorization: `Bearer ${token}`, // Truyền token vào header
//       // },
//     });

//     // Đăng xuất Firebase
//     await auth.signOut();

//     // Xóa dữ liệu đăng nhập khỏi localStorage
//     localStorage.removeItem("token");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("role");

//     return true;
//   } catch (error) {
//     console.error("❌ Lỗi đăng xuất:", error);
//     return false;
//   }
// };