import { axiosAdmin } from "./api";

export const getFields = () => {
    return axiosAdmin.get("/fields");
}

export const createField = async (data) => {
    return await axiosAdmin.post("/fields", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}