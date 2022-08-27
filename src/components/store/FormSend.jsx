import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {get_stores, update_product_to_store} from "../../redux/actions/store";
import {add_order} from "../../redux/actions/order";

const Form = ({close, data,slug}) => {
    const dispatch = useDispatch();

    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema(data)),
        validateOnChange: true,
        onSubmit: (form, onSubmitProps) => {
            dispatch(add_order(form,slug), close())
        }
    })


    return (<form className="bg-white  rounded px-8 pt-6 pb-8 mb-4">

        <div>
            <p className={`${formik.errors.count ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Stock:</p>
            <input type={"number"} min={1} max={data[3]}
                   className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                   value={formik.values.count}
                   onChange={text => formik.setFieldValue('count', text.target.value)}/>
        </div>
        <div>
            <p className={`${formik.errors.type ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Destino:</p>
            <select onChange={(value) => formik.setFieldValue('type', value.target.value)}
                    value={formik.values.type} className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example">
                <option  value={"Huancayo"}>{"Huancayo"}</option>
                <option  value={"Tarma"}>{"Tarma"}</option>
                <option  value={"La Merced"}>{"La Merced"}</option>
                <option  value={"Pichanaqui"}>{"Pichanaqui"}</option>
                <option value={"Fabrica"}>{"Fabrica"}</option>
                <option value={"Venta"}>{"Venta"}</option>
            </select>
        </div>


        <div className="w-full flex justify-center">
            <button onClick={formik.handleSubmit} type="button"
                    className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                <FontAwesomeIcon icon={faPaperPlane}/>
            </button>
        </div>

    </form>);
};


const initialValues = (data) => {
    return {
        count: data?.[3] || 1,
        id: data?.[0],
        type: "Venta"
    }
}
const newSchema = (data) => {
    return {
        id: Yup.number().required(),
        count: Yup.number().integer().min(1).required(true),
        type: Yup.string().required(true)
    }
}


export default Form;
