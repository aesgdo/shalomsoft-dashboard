import { SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function DashboardLayout({ children} : { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-row">
      {/* Sidebar */}
      <div>
        <AppSidebar />
        <SidebarTrigger className="md:hidden" />
      </div>

      {/* Contenido */}
      <div className="flex-1 w-full bg-gray-100 p-6">
        {children}
      </div>
    </div>
  );
}
