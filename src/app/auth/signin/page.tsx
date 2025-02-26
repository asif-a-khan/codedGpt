"use client"; // Important to use client side rendering.
import LoginButton from "@/components/Buttons/LoginButton";
import { useState, useEffect } from "react";

export default function SignIn() {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/providers`);
        if (!res.ok) {
          throw new Error("Failed to fetch providers");
        }
        const data = await res.json();
        setProviders(data);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };
    fetchProviders();
  }, []);

  if (!providers) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center mx-auto p-24 max-w-[40rem]">
      <h1 className="font-bold text-3xl">Sign in to your account</h1>
      <div className="flex flex-col items-center gap-y-4 pt-5">
        {Object.values(providers).map(
          (provider: any) =>
            provider.id !== "hasura-credentials" && (
              <LoginButton auth={provider} key={provider.id} />
            )
        )}
      </div>
    </div>
  );
}