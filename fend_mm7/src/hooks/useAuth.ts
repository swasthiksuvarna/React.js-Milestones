// hooks/useAuth.ts
import { useState } from "react";
import { signIn as amplifySignIn } from "aws-amplify/auth";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { isSignedIn, nextStep } = await amplifySignIn({
        username: email,
        password
      });
      setLoading(false);
      return { success: isSignedIn, nextStep };
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof Error) {
        setError(err.message || "An error occurred during sign in");
        return { success: false, error: err };
      } else {
        setError("An unknown error occurred during sign in");
        return { success: false, error: new Error("Unknown error") };
      }
    }
  };

  return {
    signIn,
    loading,
    error,
  };
}