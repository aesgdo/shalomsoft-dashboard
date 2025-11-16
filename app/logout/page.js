import { redirect } from "next/navigation";

export default async function LogoutPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://localhost:3000";

  await fetch(`${base}/api/logout`, {
    method: "POST",
    cache: "no-store",
  });

  redirect("/login");
}