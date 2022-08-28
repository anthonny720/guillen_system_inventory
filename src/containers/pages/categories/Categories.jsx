import React, {useEffect, useState} from 'react';
import Layout from "../../../hocs/Layout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faLink, faPlusCircle, faQrcode, faTrash} from "@fortawesome/free-solid-svg-icons";
import CustomTable from "../../../components/CustomTable";
import Skeleton from "react-loading-skeleton";
import {useDispatch, useSelector} from "react-redux";
import {delete_category, get_categories} from "../../../redux/actions/category";
import {Link} from "react-router-dom";
import Modal from "../../../components/Modal";
import QRCode from "react-qr-code";
import {MySwal} from "../../../helpers/util";
import Form from "../../../components/categories/Form";

const Categories = () => {
    const categories = useSelector(state => state.Category.categories)
    const role = useSelector(state => state.Auth.user.role);
    const dispatch = useDispatch();
    const [columns] = useState([{
        name: 'id', label: 'Id', options: {display: false, viewColumns: false, filter: false}
    }, {
        name: 'name', label: 'Grupo de articulos', options: {display: true, viewColumns: false, filter: false}
    }, {
        name: 'slug', label: 'Slug', options: {display: false, viewColumns: false, filter: false}
    }, {
        name: "qr", label: "qr", options: {
            viewColumns: false, filter: false, customBodyRender: (value, tableMeta, updateValue) => {
                return (<div className="flex gap-4 justify-center">
                    <FontAwesomeIcon className={" cursor-pointer"} icon={faQrcode}
                                     onClick={() => handleOpenModal(tableMeta.rowData[1], tableMeta.rowData[2])}/>

                </div>);
            }
        }
    }, {
        name: "link", label: "Link", options: {
            viewColumns: false, filter: false, customBodyRender: (value, tableMeta, updateValue) => {
                return (<div className="flex gap-4 justify-center">
                    <Link to={`/category/${tableMeta.rowData[2]}`}>
                        <FontAwesomeIcon icon={faLink}/>
                    </Link>
                </div>);
            }
        }
    }, {
        name: "actions", label: "Acciones", options: {
            viewColumns: false, filter: false, customBodyRender: (value, tableMeta, updateValue) => {
                return (<div className="flex gap-4 justify-center">
                    {role && role !== "Visualizador" &&
                        <FontAwesomeIcon icon={faEdit} className={"text-cyan-500 cursor-pointer"}
                                         onClick={(e) => handleOpenModalUpdate(tableMeta.rowData)}/>}
                    {role && role === "Administrador" &&
                        <FontAwesomeIcon icon={faTrash} className={"text-red-400 cursor-pointer"}
                                         onClick={(e) => handleDelete(tableMeta.rowData[0])}/>}
                </div>);
            }
        }
    }])


    /*MODAL*/
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)


    const openModal = () => {
        setIsOpen((prev) => !prev)
    }

    const handleOpenModalUpdate = (row) => {
        setTitle("Editar categoria")
        setIsOpen(true)
        setContent(<Form data={row} close={openModal}/>)
    }

    const handleDelete = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar esta categoria?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_category(id))
            }
        })
    }
    const handleOpenModalAdd = () => {
        setTitle("Agregar categoria")
        setIsOpen(true)
        setContent(<Form close={openModal}/>)
    }

    const handleOpenModal = (name, url) => {
        setTitle(`${name}`)
        setIsOpen(true)
        setContent(<QRCode className={"self-center"} value={`http:localhost:3000/api/category/${url}`}/>)
    }

    useEffect(() => {
        dispatch(get_categories());
    }, []);
    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>

        <div className="flex flex-wrap flex-row  w-full justify-around   items-center ">
            <div className=" w-full">
                {role && role !== "Visualizador" && <FontAwesomeIcon icon={faPlusCircle} onClick={handleOpenModalAdd}
                                                                     className={"mx-[50%] text-red-400 text-xl cursor-pointer"}/>}

                {categories && categories !== null ?
                    <CustomTable title={"Registro de Categorias"} columns={columns} data={categories}/> :
                    <Skeleton count={10}/>}
            </div>
        </div>
    </Layout>);
};

export default Categories;
