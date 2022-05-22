import { useAuthenticated } from "@/shared/auth";

export const MyProfile = () => {
  const authenticated = useAuthenticated();

  return (
    <div>
      <h1>MyProfile</h1>
      <p>Authenticated: {String(authenticated)}</p>
    </div>
  );
};
