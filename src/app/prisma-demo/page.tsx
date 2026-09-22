import { db } from "@/prisma/db";

export const dynamic = "force-dynamic";

export default async function PrismaDemoPage() {
  const user = await db.orm.public.User.select("id", "email", "createdAt")
    .orderBy((u) => u.createdAt.desc())
    .first();

  return (
    <main className="mx-auto max-w-2xl p-10 text-slate-900">
      <h1 className="mb-6 text-3xl font-bold">Prisma demo</h1>

      {user ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Latest user
          </p>
          <p className="mt-3 text-xl font-semibold">{user.email}</p>
          <p className="mt-2 text-sm text-slate-600">
            Created: {new Date(user.createdAt).toLocaleString()}
          </p>
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-600">
          No users yet in the database.
        </p>
      )}
    </main>
  );
}
