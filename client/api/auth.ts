"use client";

interface AuthResponse {
  message: string;
  data: any | null;
}

export const login = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return { message: "Login successful", data };
  } catch (error) {
    return error instanceof Error
      ? { message: error.message, data: null }
      : { message: "Login failed", data: null };
  }
};

export const signup = async (
  name: string,
  email: string,
  password: string,
): Promise<AuthResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }

    return { message: "Signup successful", data };
  } catch (error) {
    return error instanceof Error
      ? { message: error.message, data: null }
      : { message: "Signup failed", data: null };
  }
};
