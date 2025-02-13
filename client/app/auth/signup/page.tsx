"use client";
import React, { useState } from "react";
import { Input, Link, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { signup } from "@/api/auth";

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const response = await signup(name, email, password);

    if (response.data) {
      router.push("/auth/login");
    } else {
      setError(response.message);
    }

    setLoading(false);
  };

  return (
    <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
      <Input
        isRequired
        label="Name"
        placeholder="Enter your name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        isRequired
        label="Email"
        placeholder="Enter your email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        isRequired
        label="Password"
        placeholder="Enter your password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500 text-small text-center">{error}</p>}
      <p className="text-center text-small">
        Already have an account?{" "}
        <Link
          size="sm"
          onClick={() => router.push("/auth/login")}
          className="cursor-pointer"
        >
          Login
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={loading}>
          Sign up
        </Button>
      </div>
    </form>
  );
};

export default SignUp;
