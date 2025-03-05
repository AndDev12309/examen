import SpinnerLoading from "@/components/Loading/spinner";
import { useRole } from "@/hooks/useRole";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function withAuthRole(Component: React.FC, role: string) {
  return function RoleProtectedComponent(props: any) {
    const { isAuthorized, isCheckingAuth } = useRole(role);
    const router = useRouter();

    useEffect(() => {
      if (!isAuthorized && !isCheckingAuth) {
        router.push("/");
      }
    }, [isAuthorized, isCheckingAuth]);

    if (!isAuthorized && isCheckingAuth) return <SpinnerLoading />;
    return <Component {...props} />;
  };
}
