import { getUser } from "@/actions/user";
import EditUserForm from "@/components/EditUserForm";
import { IUser } from "@/lib/models/user";
import { getSession } from "@/lib/session";

export default async function Page() {
  const session = await getSession();
  const user = await getUser(session.userId);
  const userClient: IUser = {
    ...user._doc,
    _id: user._id.toString(),
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-md self-center rounded-[32px] border border-slate-200 bg-white p-10 shadow-2xl shadow-slate-200/50">
          <EditUserForm user={userClient} />
        </div>
      </div>
    </main>
  );
}
