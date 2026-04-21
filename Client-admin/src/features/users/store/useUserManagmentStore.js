import { create } from "zustand";
import * as authApi from "../../../shared/api/auth.js";

const getAllUsers = authApi.getAllUsers;
const updateUserRoleRequest = authApi.updateUserRole;

export const useUserManagmentStore = create((set, get) => ({
    users: [],
    loading: false,
    error: null,
    filters: {},

    setFilters: (filters) => set({ filters }),

    setUsers: (users) => set({ users }),

    updateUserRole: async (userId, newRole) => {
        set({ loading: true, error: null });
        try {
            if (typeof updateUserRoleRequest !== "function") {
                throw new Error("La funcion de userRole no esta disponible");
            }
            const { data: updatedUser } = await updateUserRoleRequest(userId, newRole);

            // actualizar el usuario al estado actual
            const users = get().users.map((u) =>
                u.id === updatedUser.id ? { ...u, role: updatedUser.role } : u
            );
            set({ users, loading: false });
            return {
                success: true,
                user: updatedUser,
            };

        } catch (err) {
            set({ error: err.response?.data?.message || "Error al actualizar rol del usuario", loading: false });
            return {
                success: false,
                error: err.response?.data?.message || err.message,
            };
        }
    },

    fetchUsers: async (apiFn = getAllUsers, options = {}) => {
        const { force = false } = options;
        const state = get();
        // evitar llamadas duplicadas
        if (state.loading) return;

        if (!force && state.users.length > 0) return;

        set({ loading: true, error: null });

        try {
            const fetcher = typeof apiFn === "function" ? apiFn : getAllUsers;
            const result = await fetcher();
            set({ users: result.users || result, loading: false });

        } catch (error) {
            set({ error: error.message || "Error al cargar users", loading: false });
        }

    }

}));