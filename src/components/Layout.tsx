import React from "react";
import Navbar from "./Navbar";
import { useAuth } from "@/context/Auth";
import SpinnerLoading from "./Loading/spinner";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isCheckingAuth } = useAuth();
  if (isCheckingAuth) return <SpinnerLoading />;
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
