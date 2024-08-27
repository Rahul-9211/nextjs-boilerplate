// import Sidebar from "@/components/Sidebar/Sidebar";
// import AdminNavbar from "@/components/Navbar/AdminNavbar";

// const Orders = () => {
//   return (
//     <div className="flex">
//       <div className="flex-[20%]">
//         <Sidebar />
//       </div>
//       <div className="flex-[80%] ">
//         <div className="">
//           <AdminNavbar />{" "}
//         </div>
//         <div className="bg-primary-9.8 h-full">content</div>
//       </div>
//     </div>
//   );
// };

// export default Orders;


// pages/orders.tsx
import AdminLayout from "@/components/layout/AdminLayout";

const Orders = () => {
  return (
    <div>
      {/* Page-specific content goes here */}
      {/* Orders content */}
    </div>
  );
};

Orders.getLayout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default Orders;
