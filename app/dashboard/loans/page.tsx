import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { ShadCnSearchForm } from "./ShadCnSearchForm";

export default async function LoansPage() {

    const cookieStore = await cookies();

    const session = cookieStore.get("session");
    
    const id = Number(session?.value);
    //const id = 2;

    interface userProps {
        id: string;
        name: string;
        user: string;
        email: string;
    }

    const user : userProps = await prisma.user.findUnique({
        where: { id },
        select: { id: true, name: true, user: true, email: true },
    });

   

    return (
        <ShadCnSearchForm userData={user} />
    );
}
