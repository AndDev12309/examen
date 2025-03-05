import SpinnerLoading from "@/components/Loading/spinner";
import { useAuth } from "@/context/Auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function withAuth(Component: React.FC) {
  return function AuthenticatedComponent(props: any) {
    const { user, isCheckingAuth } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user && !isCheckingAuth) router.push("/");
    }, [user, isCheckingAuth]);

    if (!user && isCheckingAuth) return <SpinnerLoading />;
    return <Component {...props} />;
  };
}
