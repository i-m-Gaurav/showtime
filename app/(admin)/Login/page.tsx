"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("api/admin/signin", {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("failed to login", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Admin Login</button>
      </form>
    </>
  );
}
