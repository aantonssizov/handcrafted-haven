import "server-only";

import { getSession } from "@/lib/session";
import { cache } from "react";
import { redirect } from "next/navigation";

export const verifySession = cache(async () => {
  const session = await getSession();

  console.log(session);

  if (!session.userId) {
    redirect("/login");
  }

  return { isAuth: true, userId: session.userId, userRole: session.userRole };
});
