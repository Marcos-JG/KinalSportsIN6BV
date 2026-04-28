import { Routes, Route } from "react-router-dom"
import { AuthPage } from "../../features/auth/pages/AuthPage.jsx"
import { DashboardPage } from "../layouts/DashboardPage.jsx"
import { Users } from "../../features/users/components/Users.jsx"
import { Fields } from "../../features/fields/components/Fields.jsx"
import { VerifyEmailPage } from "../../features/auth/pages/verifyEmailPages.jsx"
import { UnauthorizedPages } from "../../features/auth/pages/UnauthorizedPages.jsx"
import { ProtectedRoute } from "./ProtectedRoute.jsx"
import { RoleGuard } from "./RoleGuard.jsx"

export const AppRoutes = () => {
    return (
        <Routes>
            {/* RUTAS PUBLICAS */}
            <Route path="/" element={<AuthPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPages />} />

            {/* PROTECTED ROUTES + ROLE */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <RoleGuard allowedRole={["ADMIN_ROLE"]}>
                            <DashboardPage />
                        </RoleGuard>
                    </ProtectedRoute>
                }
            >
                <Route path="users" element={<Users />} />
                <Route path="fields" element={<Fields />} />
            </Route>
        </Routes>
    )
}