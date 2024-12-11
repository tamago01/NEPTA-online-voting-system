"use client";
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
  isAdmin: boolean;
}

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/users`,
          {
            credentials: "include",
          }
        );

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
        console.log("users", user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  //register
  const register = async (data: RegisterData) => {
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
  };

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
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setUser(data);
        window.location.href = "/dashboard";
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

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        setUser(null);
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
