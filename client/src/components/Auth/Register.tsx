"use client";
import { useAuth } from "@/hooks/users";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const defaultValues = {
  name: "",
  email: "",
  number: "",
  password: "",
};

export default function Register() {
  const [formData, setFormData] = useState(defaultValues);
  const { register, loading, error, success } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(formData);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      <div className="w-full md:w-1/3 p-8 bg-white rounded-lg space-y-6">
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

          <h2 className="text-2xl font-bold">Register</h2>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-2"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-2"
            required
          />

          <input
            type="tel"
            name="number"
            placeholder="Phone Number"
            value={formData.number}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-2"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-2"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600"
          >
            {loading ? "Submitting..." : "Register"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && (
          <p className="text-green-500 font-bold mt-4">
            Registration successful!
          </p>
        )}
        <div className="mt-7 text-center text-sm text-[#6C6C6C] md:text-lg">
          Already have an account?{" "}
          <span className="font-semibold text-nakshaGreen underline">
            <Link href="/login">Login?</Link>
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
}
