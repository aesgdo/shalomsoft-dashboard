"use client"

import {
  Card,
  //CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { FormEvent, FormEventHandler, useState } from "react";
import { loansAction } from "./actions";

interface userDataProps {
    id: string;
    name: string;
    user: string;
    email: string;
}

export function ShadCnSearchForm(userData: { userData: userDataProps }) {

    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(false);
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        
        setError("");
        setDisabled(true);
        event.preventDefault();
        const target = event.target as HTMLFormElement;

        const formData = new FormData(target);
        // Aquí iría la lógica para manejar la búsqueda con formData
    }

    return (

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex w-full md:max-w-md">
            <Input 
              type="text" 
              id="clientId" 
              name="clientId" 
              placeholder="buscar por cédula o número de préstamo"
              className="rounded-none rounded-l-lg"
              required
              disabled={disabled}
              />
            <Button
                type="submit"
                className="rounded-none rounded-r-lg bg-blue-600 hover:bg-blue-700 cursor-pointer min-w-[74.52px]"
                disabled={disabled}
            >
                { !disabled ? <span>Buscar</span> :
                <div className="h-4 w-4 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                }
                </Button>
          </div>

        
        </form>
    );
}