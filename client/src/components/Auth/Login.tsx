"use client";
import { useAuth } from "@/hooks/users";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error, success } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/3 p-8 bg-white rounded-lg pt-14 space-y-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-8 flex justify-center">
            <Image
              src="/images/nepta.png"
              alt="Nepta Logo"
              height={50}
              width={180}
              className="object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold">Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mt-2"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mt-2"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && (
          <p className="text-green-500 font-bold mt-4">Login successful!</p>
        )}
        <div className="mt-7 text-center text-sm text-[#6C6C6C] md:text-lg">
          Need an account?{" "}
          <span className="font-semibold text-nakshaGreen underline">
            <Link href="/register">Create one</Link>
          </span>
        </div>
      </div>

      <div className="w-full md:w-2/3 h-full">
        <Image
          src="/images/voters.jpg"
          alt="Voters"
          width={800}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
