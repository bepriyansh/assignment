"use server";

import { AuthError } from "next-auth";

import { signIn, signOut } from "@/auth";

export const logOut = async () => {
  await signOut();
};

export const login = async (email: string, password: string) => {
  const data = {
    email,
    password,
    redirectTo: "/",
  };

  try {
    await signIn("credentials", data);
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }

    throw error;
  }
};

export const signup = async (name: string, email: string, password: string) => {
  const data = {
    name,
    email,
    password,
    redirectTo: "/",
  };

  try {
    await signIn("credentials", data);
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }

    throw error;
  }
};
