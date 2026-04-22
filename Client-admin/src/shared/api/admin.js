import { axiosAdmin } from "./api";

export const getFields = () => {
    return axiosAdmin.get("/fields");
}
