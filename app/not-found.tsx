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
             <div> 
                <h1>404 - Página no encontrada</h1>
                <a href="/login">Iniciar sesión</a>
            </div>
    )

}