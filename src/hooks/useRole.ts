import { useAuth } from "@/context/Auth";

export function useRole(role?: string) {
  const { user, isCheckingAuth } = useAuth();
  console.log("user", user);
  return {
    isAuthorized: user && user.role.name === role,
    isCheckingAuth: isCheckingAuth,
  };
}
