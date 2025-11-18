import { Metadata } from "next";

export const metadata : Metadata = {
    title : "ShalomSoft | Page Not Found - Error 404",
    description : "Page not found try with another one..."
}

interface NotFoundPageProps {
    onlyLogo?  : boolean;
    onlyBody?  : boolean;
    showFooter?: boolean;
}

export default function NotFoundPage({onlyLogo = false, onlyBody = false, showFooter = true} : NotFoundPageProps ){    

    return (  
             <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100"> 
                <div className="flex flex-col justify-center items-center p-5 m-auto rounded border border-solid border-gray-300">
                    <h1>404 - Página no encontrada</h1>
                    <p><b><a href="/login">Iniciar sesión</a></b></p>
                </div>
            </div>
    )

}