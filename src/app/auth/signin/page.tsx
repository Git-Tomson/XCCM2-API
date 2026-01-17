"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const result = await signIn("google", { 
      redirect: false,
      callbackUrl: "/auth/signin"
    });

    if (result?.ok) {
      router.push(result.url || "/dashboard");
    }
  };

  const handleMicrosoftSignIn = async () => {
    const result = await signIn("azure-ad", { 
      redirect: false,
      callbackUrl: "/auth/signin"
    });

    if (result?.ok) {
      router.push(result.url || "/dashboard");
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh",
      flexDirection: "column",
      gap: "20px"
    }}>
      <h1>Connexion XCCM</h1>
      <button
        onClick={handleGoogleSignIn}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#1f2937",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Se connecter avec Google
      </button>
      <button
        onClick={handleMicrosoftSignIn}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#0078d4",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Se connecter avec Microsoft
      </button>
    </div>
  );
}
