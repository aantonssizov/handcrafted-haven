"use server";
import "server-only";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { ObjectId } from "mongoose";
import { UserRole } from "@/lib/models/roles";
import { ISessionData } from "@/lib/models/user";

const secretKey = process.env.SESSION_SECRET;
const cookieName = "HANDCRAFTED_HAVEN_USER";

if (!secretKey) {
  throw new Error("Please define the SESSION_SECRET environment variable");
}

export async function createSession(userId: ObjectId, userRole: UserRole) {
  const session = await getIronSession<ISessionData>(await cookies(), {
    password: secretKey,
    cookieName,
  });

  session.userId = userId;
  session.userRole = userRole;

  await session.save();
}

export async function getSession() {
  const session = await getIronSession<ISessionData>(await cookies(), {
    password: secretKey,
    cookieName,
  });

  return session;
}

export async function deleteSession() {
  const session = await getIronSession<ISessionData>(await cookies(), {
    password: secretKey,
    cookieName,
  });

  session.destroy();
}
