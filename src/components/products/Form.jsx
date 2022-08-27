import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {map} from "lodash";
import {add_product, update_product} from "../../redux/actions/products";

const Form = ({close, data, categories}) => {
    const dispatch = useDispatch();

    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema(data)),
        validateOnChange: true,
        onSubmit: (form, onSubmitProps) => {
            data ? dispatch(update_product(form, data[0]), close()) : dispatch(add_product(form), close())
        }
    })


    return (<form className="bg-white  rounded px-8 pt-6 pb-8 mb-4">

            <div>
                <p className={`${formik.errors.name ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Nombre:</p>
                <input type={"text"}
                       className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                       value={formik.values.name}
                       onChange={text => formik.setFieldValue('name', text.target.value)}/>
            </div>
            <div>
                <p className={`${formik.errors.group ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Categoria:</p>
                <select onChange={(value) => formik.setFieldValue('group', value.target.value)}
                        value={formik.values.group} className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-label="Default select example">
                    <option value={null}>{"Seleccione una categoria"}</option>
                    {categories && categories !== null && map(categories, (category, index) => {
                        return <option key={index} value={category.id}>{category.name}</option>
                    })}
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
        name: data?.[1] || "", group: data?.[2] || "",
    }
}
const newSchema = (data) => {
    return {
        name: Yup.string().required(true), group: Yup.number().required(true),
    }
}


export default Form;
