import React, {useEffect} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {login} from "../../../redux/actions/auth";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {TailSpin} from "react-loader-spinner";
import {toast} from "react-toastify";
import background from "../../../assets/bg.jpg";
import {Helmet} from "react-helmet";


export default function Login() {
    const alert = useSelector(state => state.Alert);
    useEffect(() => {
        {
            alert?.text && alert?.type && toast(alert.text, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                type: alert.type
            });
        }
    }, [alert]);


    const isAuthenticated = useSelector(state => state.Auth.isAuthenticated);
    const loading = useSelector(state => state.Auth.loading);
    const dispatch = useDispatch();
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            dispatch(login(form))
        }
    })

    if (isAuthenticated) return <Navigate to='/' replace/>;

    return (

        <>
            <Helmet>
            <title>Muebles Guillen</title>
            <meta name="description" content="Inicio de Sesión - Muebles Guillen"/>
        </Helmet>
            <main>
                <section className="absolute w-full h-full">
                    <div
                        className="absolute top-0 w-full h-full "
                        style={{
                            backgroundImage:
                                `url(${background})`,

                            backgroundRepeat: "repeat"
                        }}
                    ></div>
                    <div className=" min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 z-50">
                        <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
                            <img
                                className="mx-auto h-24  w-24"
                                src={require("../../../assets/logo.png")}
                                alt="Guillent"
                            />
                            <h2 className="mt-6 text-center text-lg sm:text-2xl relative lg:text-3xl font-extrabold text-[#00579b]-900 sm:text-[#00579b]  hover:text-[#f21c26]">Muebles Guillen</h2>

                        </div>

                        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
                            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                                <form className="space-y-6 relative">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Correo electrónico
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                name="email"
                                                value={formik.values.email}
                                                onChange={e => formik.setFieldValue('email', e.target.value)}
                                                type="email"
                                                required
                                                className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${formik.errors.email && 'border border-red-500'}`}/>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Contraseña
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                name="password"
                                                value={formik.values.password}
                                                onChange={e => formik.setFieldValue('password', e.target.value)}
                                                type="password"
                                                required
                                                className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${formik.errors.password && 'border border-red-500'}`}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        {loading ? <button type={"button"}
                                                           className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            <TailSpin ariaLabel="loading-indicator" height={20}/>
                                        </button> : <button onClick={formik.handleSubmit} type="button"
                                                            className=" w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00579b] hover:bg-[#f21c26] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Iniciar sesión
                                        </button>}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
const initialValues = () => {
    return {
        email: "", password: "",

    }
}
const newSchema = () => {
    return {
        email: Yup.string().email().required(true),
        password: Yup.string().required(true),
    }
}

