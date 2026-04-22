import { create } from "zustand";

import { getFields as getFieldsRequest } from "../../../shared/api";

export const useFieldStore = create((set ,get) => ({
    fields: [],
    loading: false,
    error: null,
    getFields: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getFieldsRequest();
            console.log(response);
            set({ 
                fields: response.data.data, 
                loading: false 
            });
        } catch (error) {
            set ({
                error: error.response?.data?.message || "Error al obtener los campos",
                loading: false
            })
        }
    }
    
}))