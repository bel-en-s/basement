"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ReloadOnReturn() {
  const pathname = usePathname();

  useEffect(() => {
    if (sessionStorage.getItem("reloaded") === pathname) {
      sessionStorage.removeItem("reloaded");
      return;
    }
    sessionStorage.setItem("reloaded", pathname);
    window.location.reload();
  }, [pathname]);

  return null;
}