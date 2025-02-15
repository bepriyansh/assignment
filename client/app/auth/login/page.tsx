"use client";
import React, { useState } from "react";
import { Input, Link, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth";


const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const response = await login(email, password);

    if(response?.error){
      setError(response.error);
    }
    setLoading(false);
  };

  return (
    <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
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
        Need to create an account?{" "}
        <Link
          className="cursor-pointer"
          size="sm"
          onPress={() => router.push("/auth/signup")}
        >
          Sign up
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" isLoading={loading} type="submit">
          Login
        </Button>
      </div>
    </form>
  );
};

export default Login;
