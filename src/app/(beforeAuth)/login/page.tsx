"use client";

import { login } from "@/api/login";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const data = await login({ email, password });

    if (data) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center h-screen gap-4">
      <input
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
        placeholder="email"
        className="border p-2"
      />
      <input
        value={password}
        placeholder="pwd"
        type="password"
        onChange={(e) => setPassword(e.currentTarget.value)}
        className="border p-2"
      />
      <button onClick={handleLogin}>login</button>
    </div>
  );
}
