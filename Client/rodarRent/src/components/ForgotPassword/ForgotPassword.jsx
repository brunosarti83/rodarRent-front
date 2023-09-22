import React, { useState } from 'react';
import { forgotpasswordUrl } from '../../helpers/routes';

const ForgotPassword = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Realiza una solicitud al servidor para restablecer la contraseña
            const response = await axios.post(forgotpasswordUrl, { email });
            setMessage(response.data);

            // Limpia el campo de correo electrónico después de enviar la solicitud
            setEmail('');

            // Cierra el modal después de enviar el correo electrónico
            onClose();
        } catch (error) {
            console.error('Error:', error);
            setMessage(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseModal = () => {
        onClose();
    };

    return (

        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="absolute inset-0 bg-black opacity-30"
                onClick={handleCloseModal}
            ></div>
            <div className="bg-white p-4 rounded-lg z-50">
                <h2 className="font-poppins p-2 text-3xl">Forgot Your Password?</h2>
                <hr className="ml-8 mr-8 p-2 text-gray" />
                <p className='font-poppins text-sm flex m-1 justify-start'>Enter your email.</p>
                <form onSubmit={handleResetPassword}>
                    <input
                        className='w-full font-poppins text-sm text-black flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray'
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <div className="text-right">
                        <button
                            className="font-poppins bg-blue cursor-pointer rounded-lg p-1 m-2 text-white"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Sending...' : 'Reset Password'}
                        </button>
                    </div>
                </form>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default ForgotPassword;
