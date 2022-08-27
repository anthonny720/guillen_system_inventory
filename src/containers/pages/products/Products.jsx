import React, {useEffect, useState} from 'react';
import Layout from "../../../hocs/Layout";
import {useDispatch, useSelector} from "react-redux";
import {delete_product, get_inventories} from "../../../redux/actions/products";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlusCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import CustomTable from "../../../components/CustomTable";
import Skeleton from "react-loading-skeleton";
import {MySwal} from "../../../helpers/util";
import Modal from "../../../components/Modal";
import {get_categories} from "../../../redux/actions/category";
import Form from "../../../components/products/Form";


const Products = () => {
    const role = useSelector(state => state.Auth.user.role);
    const products = useSelector(state => state.Inventory.inventories);
    const categories = useSelector(state => state.Category.categories)

    const dispatch = useDispatch()
    const [columns] = useState([{
        name: 'id',
        label: 'Id',
        options: {display: false, viewColumns: false, filter: false}
    }, {name: 'name', label: 'Producto', options: {display: true, viewColumns: false, filter: false}}, {
        name: 'group',
        label: 'Categoria_Id',
        options: {display: false, viewColumns: false, filter: false}
    }, {
        name: 'group_name', label: 'Categoria', options: {display: true, viewColumns: true, filter: true}
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
    }]);

    /*MODAL*/
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)


    const openModal = () => {
        setIsOpen((prev) => !prev)
    }

    const handleOpenModalUpdate = (row) => {
        setTitle("Agregar contacto")
        setIsOpen(true)
        setContent(<Form categories={categories} data={row} close={openModal}/>)
    }
    const handleDelete = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar este contacto?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_product(id))
            }
        })
    }
    const handleOpenModalAdd = () => {
        setTitle("Agregar producto")
        setIsOpen(true)
        setContent(<Form categories={categories} close={openModal}/>)
    }

    useEffect(() => {
        dispatch(get_inventories());
        dispatch(get_categories());
    }, []);

    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>
        <div className="flex flex-wrap flex-row  w-full justify-around   items-center ">
            <div className="w-full">
                {role && role !== "Visualizador" && <FontAwesomeIcon icon={faPlusCircle} onClick={handleOpenModalAdd}
                                                                     className={"mx-[50%] text-red-400 text-xl cursor-pointer"}/>}

                {products && products !== null ?
                    <CustomTable title={"Registro de Productos"} columns={columns} data={products}/> :
                    <Skeleton count={10}/>}
            </div>

        </div>
    </Layout>);
};

export default Products;
