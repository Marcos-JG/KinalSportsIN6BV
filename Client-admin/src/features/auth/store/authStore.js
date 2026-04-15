import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login as loginRequest } from "../../../shared/api"

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            expiresAt: null,
            loading: false,
            error: null,
            isAuthenticated: false,

            logout: () => {
                set({
                    user: null,
                    token: null,
                    expiresAt: null,
                    isAuthenticated: false
                });
            },

            login: async ({ emailOrUsername, password }) => {
                try {
                    set({ loading: true, error: null });

                    const { data } = await loginRequest({ emailOrUsername, password })

                    console.log("Login response: ", data);

                    set({
                        user: data.userDetails,
                        token: data.accessToken,
                        expiresAt: data.expiresAt,
                        loading: false,
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