"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  //CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEvent, FormEventHandler, useState } from "react";
import { loginAction } from "./actions";

export function ShadCnLoginForm() {

    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(false);
    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

        setError("");
        setDisabled(true);

        e.preventDefault();

        const target = e.target as HTMLFormElement;

        const formData = new FormData(target);
        const res = await loginAction(formData);

        if (res?.error) {
            setTimeout(() => {
                setError(res.error);
                setDisabled(false);
                return;
            }, 1000); // Simular retardo de 1 segundo
        }  

        // Login OK → redirigir
        // window.location.href = "/dashboard";
        // Usar redirect del servidor en lugar de window.location para mejor experiencia
    }

  return (
    <Card className="w-full max-w-sm">
      <form id="login-form" onSubmit={handleSubmit} >
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="font-ubuntu text-[24px] md:text-[36px] text-blue-600">SHALOMSOFT</CardTitle>
        <CardDescription className="font-bold">
          Consulta de Saldo
        </CardDescription>        
      </CardHeader>
      <CardContent>
        
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="user">Usuario</Label>
              <Input
                id="user"
                name="user"
                type="text"                
                required
                disabled={disabled}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
                {/* <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a> */}
              </div>
              <Input id="password" name="password" type="password" required disabled={disabled} />
            </div>
          </div>       
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full bg-blue-600 font-bold cursor-pointer hover:bg-blue-700" disabled={disabled} >
          { !disabled ? <span>Iniciar sesión</span> :
          <div className="h-8 w-8 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
          }
        </Button>
        <div><p className="text-red-500 min-h-[24.01px]">{error}</p></div>        
      </CardFooter>
      </form>
    </Card>
  )
}
