import api from "./axios";

export const loginUser = async (payload) => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};
export const registerUser = async (payload) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};
export const getAllUsers = async () => {
  const { data } = await api.get("/users");
  return data;
};
export const getSingleUser = async (id) => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};
export const updateUser = async ({ id, payload }) => {
  const { data } = await api.put(`/users/${id}`, payload);
  return data;
};
export const deleteUser = async (id) => {
  const { data } = await api.delete(`/users/${id}`);
  return data;
};

export const updateProfile = async (payload) => {
  const { data } = await api.put("/users/profile", payload);
  return data;
};

export const getProfile = async () => {
  const { data } = await api.get("/users/profile");
  return data;
};

export const logoutUser = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};

export const changePassword = async (payload) => {
  const { data } = await api.patch("/auth/change-password", payload);
  return data;
};

export const forgotPassword = async (email) => {
  const { data } = await api.post("/auth/forgot-password", { email });
  return data;
};

export const resetPassword = async ({ token, password }) => {
  const { data } = await api.post(`/auth/reset-password/${token}`, {
    password,
  });
  return data;
};

export const verifyEmail = async (token) => {
  const { data } = await api.post(`/auth/verify-email/${token}`);
  return data;
};

export const resendVerification = async (email) => {
  const { data } = await api.post("/auth/resend-verification", { email });
  return data;
};
