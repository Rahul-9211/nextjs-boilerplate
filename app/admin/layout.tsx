// app/admin/layout.tsx
import AdminLayout from "@/components/layout/AdminLayout";
import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function Admin({ children }: AdminLayoutProps) {
  return <AdminLayout>{children}</AdminLayout>;
}
