"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthData {
  email: string;
  password: string;
}

interface RegisterData extends AuthData {
  name: string;
  number: string;
}
interface User {
  id: string;
  name: string;
  email: string;
  token: string;
  hasVoted: boolean;
}

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const router:any = useRouter();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("data", data.user);

        setSuccess(true);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("authToken", data.user.token);
        
        router.push("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      console.log("User updated:", user);
      router.push("/dashboard");
    }
  }, [user]);
  async function register(data: RegisterData) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to register: ${response.statusText}`);
      }

      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
        window.location.href = "/";
      } else {
        throw new Error("Failed to log out");
      }
    } catch (err) {
      console.error("Logout error:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };
  return { register, login, logout, user, loading, error, success };
}
