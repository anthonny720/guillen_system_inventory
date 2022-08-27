import React, {Fragment, useEffect} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {DateFormat} from "../../helpers/util";
import DatePicker from 'react-date-picker';
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, SelectorIcon} from "@heroicons/react/solid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {filter, map} from "lodash";
import {useNavigate} from "react-router-dom";
import {add_lot, update_lot} from "../../redux/actions/lots";


const FormRaw = ({data, close, providers, categories}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            data ? dispatch(update_lot(data.lot, form), close(), navigate(`/`)) : dispatch(add_lot(form), close())
        }
    })
    console.log(data)
    return (
        <div className="w-full z-20">
            <form className="bg-white px-8 pt-6 pb-8 mb-4">
                {/*PRODUCT*/}
                <div>
                <p className={`${formik.errors.category ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Producto:</p>
                <select value={formik.values.category} onChange={(value) => formik.setFieldValue('category', value.target.value)}
                         className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-label="Default select example">
                    <option value={null}>Seleccione una categoria</option>
                    {categories !== null && map(categories, category => (
                        <option key={category.id} value={category.id}>{category.nombre}</option>))}
                </select>
            </div>


                {/*Origin*/}
                <div>
                    <p className={`${formik.errors.origin ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Origen:</p>
                    <input
                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase"
                        value={formik.values.origin}
                        onChange={text => formik.setFieldValue('origin', text.target.value)}/>
                </div>
                {/*Provider*/}
                 <div>
                <p className={`${formik.errors.provider ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Proveedor:</p>
                <select onChange={(value) => formik.setFieldValue('provider', value.target.value)}
                        defaultValue={formik.values.provider} className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-label="Default select example">
                    <option value={null}>Seleccione un remitente</option>
                    {providers !== null && map(providers, provider => (
                        <option key={provider.id} value={provider.id}>{provider.nombre}</option>))}
                </select>
            </div>

                {/*Parcel*/}
                <div>
                    <p className={`${formik.errors.parcel ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Parcela:</p>
                    <input className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                           value={formik.values.parcel}
                           onChange={text => formik.setFieldValue('parcel', text.target.value)}/>
                </div>
                {/*providerGuide*/}
                <div>
                    <p className={`${formik.errors.providerGuide ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Guia
                        de proveedor:</p>
                    <input maxLength={12} className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                           value={formik.values.providerGuide}
                           onChange={text => formik.setFieldValue('providerGuide', text.target.value)}/>
                </div>
                {/*CarrierGuide*/}
                <div>
                    <p className={`${formik.errors.carrierGuide ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Guia
                        de transportista:</p>
                    <input maxLength={12} className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                           value={formik.values.carrierGuide}
                           onChange={text => formik.setFieldValue('carrierGuide', text.target.value)}/>
                </div>
                {/*DateAdmission*/}
                <div className="mb-4">
                    <p className={`${formik.errors.entryDate && "text-red-400"} text-base mt-4 font-medium leading-none text-gray-800`}>Fecha
                        de ingreso:</p>
                    <DatePicker format={"yyyy-MM-dd"} value={new Date(formik.values.entryDate)}
                                onChange={(value) => {
                                    formik.setFieldValue("entryDate",
                                        DateFormat(value)
                                    )
                                }}
                                className={`w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 -xl text-gray-400 `}/>
                </div>
                {/*DateDownload*/}
                <div className="mb-4">
                   <p className={`${formik.errors.downloadDate ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Fecha
                        de descarga:</p>
                    <DatePicker format={"yyyy-MM-dd"} value={new Date(formik.values.downloadDate)}
                                onChange={(value) => {
                                    formik.setFieldValue("downloadDate",
                                        DateFormat(value)
                                    )
                                }}
                                className={`w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 -xl text-gray-400`}/>
                </div>


                {/*LOT*/}
                <div>
                    <p className={`${formik.errors.lot ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Lote:</p>
                    <input
                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase"
                        value={formik.values.lot}
                        onChange={text => formik.setFieldValue('lot', text.target.value)} maxLength={13}/>
                </div>
                {/*QUALITY*/}
                <div>
                    <p className={`${formik.errors.quality ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Muestra
                        Calidad:</p>
                    <input maxLength={4} className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                           value={formik.values.quality} type={"decimal"}
                           onChange={text => formik.setFieldValue('quality', text.target.value)}/>
                </div>


                <div className="w-full flex justify-center">
                    <button onClick={formik.handleSubmit} type="button"
                            className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                        <FontAwesomeIcon icon={faPaperPlane}/>
                    </button>
                </div>
            </form>

        </div>
    );
};
const initialValues = (data) => {
    return {
        provider: data?.provider || null,
        origin: data?.origin || "",
        parcel: data?.parcel || "",
        carrierGuide: data?.carrierGuide || "",
        providerGuide: data?.providerGuide || "",
        entryDate: data?.entryDate || new Date(),
        downloadDate: data?.downloadDate || new Date(),
        lot: data?.lot || "",
        quality: data?.quality || 0,
        category: data?.category || null,
    }
}
const newSchema = () => {
    return {
        provider: Yup.number().required(true),
        origin: Yup.string().min(3, "Ingrese correctamente").required(true),
        carrierGuide: Yup.string().min(6, "Ingrese correctamente").max(12, "Ingrese correctamente").required(true),
        providerGuide: Yup.string().min(6, "Ingrese correctamente").max(12, "Ingrese correctamente").required(true),
        entryDate: Yup.string().min(8, "Ingrese correctamente").max(10, "Ingrese correctamente").required(true),
        downloadDate: Yup.string().min(8, "Ingrese correctamente").max(10, "Ingrese correctamente").required(true),
        lot: Yup.string().min(12, "Ingrese correctamente").max(13, "Ingrese correctamente").required(true),
        quality: Yup.number().max(100).required(true),
        category: Yup.number().required(true),
    }
}
export default FormRaw;
