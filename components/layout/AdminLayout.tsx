// components/Layout/AdminLayout.tsx
import React, { useMemo } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbar/AdminNavbar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const memoSidebar = useMemo(() => <Sidebar />, []);
  const memoAdminNavbar = useMemo(() => <AdminNavbar />, []);
  
  return (
    <div className="flex h-screen">
      <div className="flex-[14%]">
        {memoSidebar}
      </div>
      <div className="flex-[85%] flex flex-col">
        {memoAdminNavbar}
        <div className="bg-primary-9.8 h-full flex-grow">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
