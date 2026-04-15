import { Routes, Route } from "react-router-dom"
import { AuthPage } from "../../features/auth/pages/AuthPage.jsx"
import { DashboardPage } from "../layouts/DashboardPage.jsx"
import { Users } from "../../features/users/components/Users.jsx"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthPage/>} />
            <Route path="/dashboard" element={<DashboardPage/>} >
                <Route path="users" element={<Users/>} />
            </Route>
        </Routes>
    )
}
