import { Routes, Route } from "react-router-dom"
import { AuthPage } from "../../features/auth/pages/AuthPage.jsx"
import { DashboardPage } from "../layouts/DashboardPage.jsx"
import { Users } from "../../features/users/components/Users.jsx"
import { Fields } from "../../features/fields/components/Fields.jsx"
import { VerifyEmailPage } from "../../features/auth/pages/verifyEmailPages.jsx"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthPage/>} />
            <Route path="/verify-email" element={<VerifyEmailPage/>} />
            <Route path="/dashboard" element={<DashboardPage/>} >
                <Route path="users" element={<Users/>} />
                <Route path="fields" element={<Fields/>} />
            </Route>
        </Routes>
    )
}
