"use client";

import Button from "@/app/(website)/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { login } from "@/app/services/auth.service";

const LoginPage = () => {
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password) {
      await Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please enter both email and password.",
        confirmButtonColor: "#ef4444",
        confirmButtonText: "OK",
      });
      return;
    }

    setIsLoading(true);

    try {
      const data = await login({ email, password });

      if (data.token) {
        await Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Welcome to SportOn Admin Dashboard",
          timer: 1500,
          showConfirmButton: false,
          background: "#fff",
          iconColor: "#22c55e",
        });
        push("/admin/products");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      await Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: error.message || "Invalid email or password. Please try again.",
        confirmButtonColor: "#ef4444",
        confirmButtonText: "Try Again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[544px] w-full bg-white rounded-xl border-t-4 border-primary py-12 px-[72px] shadow-lg">
      <Image
        src="/images/logo-admin.svg"
        alt="logo admin"
        width={304}
        height={51}
        className="mx-auto mb-4"
      />
      <p className="text-gray-500 text-sm text-center mb-9">
        Enter your credentials to access the dashboard
      </p>

      <form onSubmit={handleSubmit}>
        <div className="input-group-admin mb-5">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="admin@sporton.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            required
          />
        </div>
        <div className="input-group-admin mb-8">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            required
          />
        </div>
        <Button type="submit" variant="primary" className="w-full rounded-lg" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;