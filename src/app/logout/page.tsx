"use client";

import { logout } from "@/actions/auth";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    (async () => {
      await logout();
    })();
  });
}
