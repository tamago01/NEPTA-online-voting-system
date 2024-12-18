"use client";
import { useAuth } from "@/hooks/useAuth";
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
    <div className="relative h-screen flex items-center justify-center w-full">
      <div className="absolute inset-0 w-full">
        <Image
          src="https://img.freepik.com/premium-photo/engaged-audience-financial-seminar-group-image_853163-18959.jpg"
          alt="Voters"
          width={800}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 w-full max-w-lg p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text- mb-6">Register</h2>
          <div className="flex items-center gap-2 border bg-white px-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 48 48"
            >
              <g
                fill="none"
                stroke="gray"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
              >
                <circle cx="24" cy="11" r="7" />
                <path d="M4 41c0-8.837 8.059-16 18-16m9 17l10-10l-4-4l-10 10v4z" />
              </g>
            </svg>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 focus:outline-none rounded "
              required
            />
          </div>
          <div className="my-8 flex items-center gap-2 border bg-white px-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 48 48"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M38.735 15.224L24 26.072L9.265 15.224"
              />
              <rect
                width="39"
                height="26.582"
                x="4.5"
                y="10.709"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                rx="4"
                ry="4"
              />
            </svg>
            <input
              type="email"
              name="email"
              placeholder="Write your email here"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 focus:outline-none rounded "
            />
          </div>
          <div className="my-8 flex items-center gap-2 border bg-white px-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="gray"
                fillRule="evenodd"
                d="M5.733 2.043c1.217-1.21 3.221-.995 4.24.367l1.262 1.684c.83 1.108.756 2.656-.229 3.635l-.238.238a.65.65 0 0 0-.008.306c.063.408.404 1.272 1.832 2.692s2.298 1.76 2.712 1.824a.7.7 0 0 0 .315-.009l.408-.406c.876-.87 2.22-1.033 3.304-.444l1.91 1.04c1.637.888 2.05 3.112.71 4.445l-1.421 1.412c-.448.445-1.05.816-1.784.885c-1.81.169-6.027-.047-10.46-4.454c-4.137-4.114-4.931-7.702-5.032-9.47l.749-.042l-.749.042c-.05-.894.372-1.65.91-2.184zm3.04 1.266c-.507-.677-1.451-.731-1.983-.202l-1.57 1.56c-.33.328-.488.69-.468 1.036c.08 1.405.72 4.642 4.592 8.492c4.062 4.038 7.813 4.159 9.263 4.023c.296-.027.59-.181.865-.454l1.42-1.413c.578-.574.451-1.62-.367-2.064l-1.91-1.039c-.528-.286-1.146-.192-1.53.19l-.455.453l-.53-.532c.53.532.529.533.528.533l-.001.002l-.003.003l-.007.006l-.015.014a1 1 0 0 1-.136.106c-.08.053-.186.112-.319.161c-.27.101-.628.155-1.07.087c-.867-.133-2.016-.724-3.543-2.242c-1.526-1.518-2.122-2.66-2.256-3.526c-.069-.442-.014-.8.088-1.07a1.5 1.5 0 0 1 .238-.42l.032-.035l.014-.015l.006-.006l.003-.003l.002-.002l.53.53l-.53-.531l.288-.285c.428-.427.488-1.134.085-1.673z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="tel"
              name="number"
              placeholder="Phone Number"
              value={formData.number}
              onChange={handleChange}
              className="w-full p-3 focus:outline-none rounded "
              required
            />
          </div>
          <div className="my-8 flex items-center gap-2 border bg-white px-3">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeWidth="1.5"
                stroke="gray"
                d="M18 11.0041C17.4166 9.91704 16.273 9.15775 14.9519 9.0993C13.477 9.03404 11.9788 9 10.329 9C8.67911 9 7.18091 9.03404 5.70604 9.0993C3.95328 9.17685 2.51295 10.4881 2.27882 12.1618C2.12602 13.2541 2 14.3734 2 15.5134C2 16.6534 2.12602 17.7727 2.27882 18.865C2.51295 20.5387 3.95328 21.8499 5.70604 21.9275C6.42013 21.9591 7.26041 21.9834 8 22"
              ></path>
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                stroke="gray"
                d="M6 9V6.5C6 4.01472 8.01472 2 10.5 2C12.9853 2 15 4.01472 15 6.5V9"
              ></path>
              <path
                fill="gray"
                d="M21.2046 15.1045L20.6242 15.6956V15.6956L21.2046 15.1045ZM21.4196 16.4767C21.7461 16.7972 22.2706 16.7924 22.5911 16.466C22.9116 16.1395 22.9068 15.615 22.5804 15.2945L21.4196 16.4767ZM18.0228 15.1045L17.4424 14.5134V14.5134L18.0228 15.1045ZM18.2379 18.0387C18.5643 18.3593 19.0888 18.3545 19.4094 18.028C19.7299 17.7016 19.7251 17.1771 19.3987 16.8565L18.2379 18.0387ZM14.2603 20.7619C13.7039 21.3082 12.7957 21.3082 12.2394 20.7619L11.0786 21.9441C12.2794 23.1232 14.2202 23.1232 15.4211 21.9441L14.2603 20.7619ZM12.2394 20.7619C11.6914 20.2239 11.6914 19.358 12.2394 18.82L11.0786 17.6378C9.86927 18.8252 9.86927 20.7567 11.0786 21.9441L12.2394 20.7619ZM12.2394 18.82C12.7957 18.2737 13.7039 18.2737 14.2603 18.82L15.4211 17.6378C14.2202 16.4587 12.2794 16.4587 11.0786 17.6378L12.2394 18.82ZM14.2603 18.82C14.8082 19.358 14.8082 20.2239 14.2603 20.7619L15.4211 21.9441C16.6304 20.7567 16.6304 18.8252 15.4211 17.6378L14.2603 18.82ZM20.6242 15.6956L21.4196 16.4767L22.5804 15.2945L21.785 14.5134L20.6242 15.6956ZM15.4211 18.82L17.8078 16.4767L16.647 15.2944L14.2603 17.6377L15.4211 18.82ZM17.8078 16.4767L18.6032 15.6956L17.4424 14.5134L16.647 15.2945L17.8078 16.4767ZM16.647 16.4767L18.2379 18.0387L19.3987 16.8565L17.8078 15.2945L16.647 16.4767ZM21.785 14.5134C21.4266 14.1616 21.0998 13.8383 20.7993 13.6131C20.4791 13.3732 20.096 13.1716 19.6137 13.1716V14.8284C19.6145 14.8284 19.619 14.8273 19.6395 14.8357C19.6663 14.8466 19.7183 14.8735 19.806 14.9391C19.9969 15.0822 20.2326 15.3112 20.6242 15.6956L21.785 14.5134ZM18.6032 15.6956C18.9948 15.3112 19.2305 15.0822 19.4215 14.9391C19.5091 14.8735 19.5611 14.8466 19.5879 14.8357C19.6084 14.8273 19.6129 14.8284 19.6137 14.8284V13.1716C19.1314 13.1716 18.7483 13.3732 18.4281 13.6131C18.1276 13.8383 17.8008 14.1616 17.4424 14.5134L18.6032 15.6956Z"
              ></path>
            </svg>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 focus:outline-none rounded "
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-lg font-bold text-white p-2 rounded mt-4 hover:bg-green-600"
          >
            {loading ? "Submitting..." : "Register"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {success && (
          <p className="text-green-500 font-bold mt-4 text-center">
            Registration successful!
          </p>
        )}

        <div className="mt-7 text-center text-sm text-[#6C6C6C] md:text-lg">
          Already have an account?{" "}
          <span className="font-semibold text-green-600 underline">
            <Link href="/">Login?</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
