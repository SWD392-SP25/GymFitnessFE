
import instance from "./customize-axios";

const AuthEndpoints = {
  login: "/auth/login",
  register: "/auth/register",
  refreshToken: "/auth/refresh-token",
  getUserProfile: "/auth/profile",
  logout: "/auth/logout",
};

// ✅ Đăng nhập
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

// ✅ Đăng ký (nếu có)
export const registerAPI = async (userData) => {
  try {
    const response = await instance.post(AuthEndpoints.register, userData);
    return response;
  } catch (error) {
    console.error("❌ Lỗi đăng ký:", error);
    throw error;
  }
};

// ✅ Refresh Token
export const refreshTokenAPI = async (refreshToken) => {
  try {
    const response = await instance.post(AuthEndpoints.refreshToken, { refreshToken });
    return response;
  } catch (error) {
    console.error("❌ Lỗi làm mới token:", error);
    throw error;
  }
};

// ✅ Lấy thông tin người dùng
export const getUserProfileAPI = async () => {
  try {
    const response = await instance.get(AuthEndpoints.getUserProfile);
    return response;
  } catch (error) {
    console.error("❌ Lỗi lấy thông tin user:", error);
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