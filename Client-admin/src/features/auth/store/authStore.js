import { create } from "zustand";
import { persist } from "zustand/middleware";

import { login as loginRequest, register as registerRequest } from "../../../shared/api"
import { showError } from "../../../shared/utils/toast";

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            refreshToken: null,
            expiresAt: null,
            loading: false,
            error: null,
            isAuthenticated: false,
            isLoadingAuth: true,

            checkAuth: () => {
                const token = get().token;
                const role = get().user?.role;
                const isAdmin = role === "ADMIN_ROLE";
                if (token && !isAdmin) {
                    set({
                        user: null,
                        token: null,
                        refreshToken: null,
                        expiresAt: null,
                        isAuthenticated: false,
                        isLoadingAuth: true,
                        error: "No tienes permisos para acceder a esta área"
                    });
                    return;
                }

                set({
                    isLoadingAuth: false,
                    isAuthenticated: Boolean(token) && isAdmin
                })
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    expiresAt: null,
                    isAuthenticated: false,
                    isLoadingAuth: false
                });
            },

            register: async (formData) => {
                try {
                    set({ loading: true, error: null });
                    const { data } = await registerRequest(formData);
                    set({ loading: false });
                    return { success: true, emailVerificationRequired: data?.emailVerificationRequired, data };
                } catch (err) {
                    const message = err.response?.data?.message || "Error al registrar usuario";
                    set({ error: message, loading: false });
                    return { success: false, error: message };
                }
            },

            login: async ({ emailOrUsername, password }) => {
                try {
                    set({ loading: true, error: null });

                    const { data } = await loginRequest({ emailOrUsername, password })

                    console.log("Login response: ", data);

                    const role = data.userDetails?.role;
                    if (role !== "ADMIN_ROLE") {
                        const message =
                            "No tienes permisos para acceder a esta área"
                        set({
                            user: null,
                            token: null,
                            refreshToken: null,
                            expiresAt: null,
                            isAuthenticated: false,
                            isLoadingAuth: true,
                            loading: false,
                            error: message,
                            isLoadingAuth: false
                        })

                        showError(message);
                        return { success: false, error: message }
                    }
                    set({

                        user: data.userDetails,
                        token: data.accessToken,
                        refreshToken: data.refreshToken,
                        expiresAt: data.expiresAt,
                        loading: false,
                        isAuthenticated: true
                    })

                    return { success: true }

                } catch (err) {
                    console.error("Login error: ", err);
                    const message =
                        err.response?.data?.message || "Error de autenticación";
                    set({ error: message, loading: false })
                    return { success: false, error: message }
                }
            }
        }),
        { name: "auth-storage" }
    )
)