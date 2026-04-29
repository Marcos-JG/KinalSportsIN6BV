import { Navigate } from "react-router-dom";
import { Spinner } from "../../shared/components/layout/Spinner";
import { useAuthStore } from "../../features/auth/store/authStore";
import { useEffect } from "react";

/*
 const checkAuth = useAuthStore((state) => state.checkAuth);
 
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);*/

export const ProtectedRoute= ({ children }) => {
    
    const isAuthenticated = useAuthStore ((state) => state.isAuthenticated);
    const isLoadingAuth = useAuthStore((state) => state.isLoadingAuth);

    
    if(isLoadingAuth) return <Spinner />

    if(!isAuthenticated) return <Navigate to="/" replace />

    return children;
}