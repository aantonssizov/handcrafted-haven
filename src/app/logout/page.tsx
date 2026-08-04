"use client";

import { logout } from "@/actions/auth";
import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    (async () => {
      await logout();
    })();
  });
}
