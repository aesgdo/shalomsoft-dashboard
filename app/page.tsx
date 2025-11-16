"use client";
import { redirect } from "next/navigation";

export default function Home() {

  // redireccionar a la página de login
  redirect('/login');

  return <></>;
}
