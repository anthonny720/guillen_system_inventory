import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {get_stores, update_product_to_store} from "../../redux/actions/store";

const Form = ({close, data, slug}) => {
    const dispatch = useDispatch();

    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema(data)),
        validateOnChange: true,
        onSubmit: (form, onSubmitProps) => {
            dispatch(update_product_to_store(data[0], slug, form,), close())
        }
    })


    return (<form className="bg-white  rounded px-8 pt-6 pb-8 mb-4">

        <div>
            <p className={`${formik.errors.count ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Stock:</p>
            <input type={"number"}
                   className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                   value={formik.values.count}
                   onChange={text => formik.setFieldValue('count', text.target.value)}/>
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
        count: data?.[3] || 0
    }
}
const newSchema = (data) => {
    return {
        count: Yup.number().required(true)
    }
}


export default Form;
