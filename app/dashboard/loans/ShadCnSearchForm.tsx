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
import ClientCard from "./ClientCard";


interface userDataProps {
    id: string;
    name: string;
    user: string;
    email: string;
}

export function ShadCnSearchForm(userData: { userData: userDataProps }) {

    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(false);    

    const [clientData, setClientData] = useState({} as {
      id: number;
      dni: string;
      name: string;
      email: string;
      phone: string;
      address: string;
      createdAt: string;
      updatedAt: string;
      loans: {
        id: number;
        customId: string;
        clientId: number;
        userId: number;
        lenderName: string;
        amount: number;
        ratesPerYear: number;
        term: number;
        frequency: string;
        startDate: string;
        endDate: string;
        createdAt: string;
        updatedAt: string;
        details: {
          id: number;
          loanId: number;
          userId: number;
          installment: number;
          paymentDate: string;
          amountPaid: number;
          createdAt: string;
          updatedAt: string;
          paymentDistributions: {
            id: number;
            loanDetailsId: number;
            principalAmount: number;
            interestAmount: number;
            lateinterestAmount: number;
            feesAmount: number;
            createdAt: string;
            updatedAt: string;
          }[];
        }[];
      }[];
    });

    const getClientData = async (formData : FormData) => {
      
      //formData.append("userId", userData.userData.id);
      //console.log("Form Data to send:", Array.from(formData.entries()));

      // obtenemos los datos del cliente
      const response = await fetch(`/api/clients/search`, {
        method: "POST",
        body: formData,
        cache: "no-store",
      });

      

      if (!response.ok) {
        setError("Error al obtener los datos del cliente.");
      }
      
      const jsonData = await response.json();

      console.log("Client data response:", jsonData);

      setClientData(jsonData);
      setDisabled(false);

    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError("");
        setDisabled(true);
        
        const target = event.target as HTMLFormElement;

        const formData = new FormData(target);
                
        getClientData(formData);

    }

    return (

      <section>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <h2 className="font-bold">Consulta de Préstamo</h2>
          <div className="flex w-full md:max-w-md">
            <Input 
              type="text" 
              id="dni" 
              name="dni" 
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

        <div className="mt-6">
          <ClientCard data={clientData}/>
        </div>

      </section>
    );
}