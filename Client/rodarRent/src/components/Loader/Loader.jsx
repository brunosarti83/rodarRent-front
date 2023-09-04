import React, { useEffect } from "react";
import "./Loader.css";

const Loader = () => {
    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
            // Cambiar la URL a la que deseas redirigir
            window.location.href = "/home/notfound"; 
        }, 5000); // 10000 milisegundos (10 segundos)

        return () => clearTimeout(redirectTimeout);
    }, []);

    return (
        <div className="spinner-container">
            <div className="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Loader;
