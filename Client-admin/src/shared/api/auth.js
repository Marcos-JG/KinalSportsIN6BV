import { axiosAuth } from "./api";

export const login = async (data) => {
    return await axiosAuth.post("/auth/login", data)
}

export const getAllUsers = async () => {
    const { data } = await axiosAuth.get("/auth/users")
    return { users: data }
}

export const register = async (data) => {
    return await axiosAuth.post("/auth/register", data,{
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export const updateUserRole = async (userId, rolename) => {
    return await axiosAuth.put(`/users/${userId}/role`, { rolename })
}

export const verifyEmail = async (token) => {
    return await axiosAuth.post("/auth/verify-email", { token })
}