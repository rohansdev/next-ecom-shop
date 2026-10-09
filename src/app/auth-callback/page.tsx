"use client";

import { useQuery } from "@tanstack/react-query";
import { useSyncExternalStore, useCallback } from "react";
import { getAuthStatus } from "./actions";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

function useConfigId(): number | null {
  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
  }, []);

  const getSnapshot = useCallback((): number | null => {
    const raw = localStorage.getItem("configurationId");
    const id = Number(raw);
    return id || null;
  }, []);

  // Server snapshot: always null (no localStorage on server)
  const getServerSnapshot = useCallback((): number | null => null, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const Page = () => {
  const router = useRouter();
  const configId = useConfigId();

  const { data } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  });

  if (data?.success) {
    if (configId) {
      // localStorage.removeItem("configurationId");
      router.push(`/configure/preview?id=${configId}`);
    } else {
      router.push("/");
    }
  }

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        <h3 className="font-semibold text-xl">Signing in...</h3>
        <p>You will be redirected shortly.</p>
      </div>
    </div>
  );
};

export default Page;
