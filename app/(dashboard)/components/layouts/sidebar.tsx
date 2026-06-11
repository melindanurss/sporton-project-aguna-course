"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiBox,
  FiCreditCard,
  FiLayers,
  FiLogOut,
  FiShoppingCart,
} from "react-icons/fi";
import Swal from "sweetalert2";
import { logout } from "@/app/services/auth.service";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "Products", icon: FiBox, link: "/admin/products" },
    { name: "Categories", icon: FiLayers, link: "/admin/categories" },
    { name: "Transactions", icon: FiShoppingCart, link: "/admin/transactions" },
    { name: "Bank Information", icon: FiCreditCard, link: "/admin/bank-info" },
  ];

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of the admin dashboard.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff5f3f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      logout();
      await Swal.fire({
        icon: "success",
        title: "Logged Out!",
        text: "You have been successfully logged out.",
        timer: 1500,
        showConfirmButton: false,
        background: "#fff",
        iconColor: "#22c55e",
      });
      router.push("/admin/login");
    }
  };

  return (
    <aside className="w-72 min-h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 shadow-sm">
      <div className="py-8 px-6 border-b border-gray-100">
        <Image
          src="/images/logo-admin.svg"
          alt="logo admin"
          width={180}
          height={30}
          className="w-auto h-8"
        />
      </div>
      <div className="flex flex-col gap-1 mt-6 px-4">
        {menuItems.map((item, index) => {
          const isActive = item.link === pathname;
          return (
            <Link
              href={item.link}
              key={index}
              className={`flex gap-3 items-center py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-gray-800 hover:bg-gray-50 hover:text-primary"
              }`}
            >
              <item.icon size={20} />
              <span className="font-semibold">{item.name}</span>
            </Link>
          );
        })}
      </div>
      <button
        onClick={handleLogout}
        className="flex gap-3 items-center py-3 px-4 mx-4 mt-auto mb-6 text-gray-800 hover:bg-gray-50 hover:text-red-500 rounded-xl transition-all duration-200"
      >
        <FiLogOut size={20} />
        <span className="font-semibold">Log Out</span>
      </button>
    </aside>
  );
};

export default Sidebar;