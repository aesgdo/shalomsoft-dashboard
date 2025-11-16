"use client"
import { useEffect } from "react";

export default function LogoutPage() {
  
  const logOut = async () => {
    await fetch('/api/logout', {
      method: 'POST',
    });
    window.location.href = '/login'; // Redirigir al login después de cerrar sesión
  };

  useEffect(() => {
    logOut();     
  }, []);

  return null; // por si acaso Next quiere renderizar algo
}