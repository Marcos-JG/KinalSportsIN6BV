import { Navbar } from "./Navbar"
import { Sidebar } from "./Sidebar"

export const DashboardContainer = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar />
            </div>
        </div>
    )
}
