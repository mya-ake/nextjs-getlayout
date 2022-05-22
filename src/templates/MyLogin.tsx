import { useAuthenticate } from "@/shared/auth";
import { useRouter } from "next/router";
import { useCallback } from "react";

export const MyLogin = () => {
  const router = useRouter();
  const authenticate = useAuthenticate();

  const handleClickLogin = useCallback(() => {
    authenticate();
    router.replace("/my/profile");
  }, [authenticate, router]);

  return (
    <div>
      <h1>MyLogin</h1>
      <button onClick={handleClickLogin}>Login</button>
    </div>
  );
};
