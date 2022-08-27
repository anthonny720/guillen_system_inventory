import React, {useEffect, useState} from 'react';
import Layout from "../../../hocs/Layout";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import CustomTable from "../../../components/CustomTable";
import Skeleton from "react-loading-skeleton";
import {delete_product_to_store, get_store, get_store_list_products, get_stores} from "../../../redux/actions/store";
import List from "../../../components/store/List";
import {MySwal} from "../../../helpers/util";
import Modal from "../../../components/Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPaperPlane, faTrash} from "@fortawesome/free-solid-svg-icons";
import Form from "../../../components/store/Form";
import FormSend from "../../../components/store/FormSend";

const Store = () => {
    const {store} = useParams();

    const role = useSelector(state => state.Auth.user.role);
    const inventories = useSelector(state => state.Store.inventories);
    const list = useSelector(state => state.Store.list);
    /*MODAL*/
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)


    const openModal = () => {
        setIsOpen((prev) => !prev)
    }
    const dispatch = useDispatch();
    const [columns] = useState([{
        name: 'id', label: 'Id', options: {display: false, viewColumns: false, filter: false}
    }, {
        name: 'product_name', label: 'Producto', options: {display: true, viewColumns: false, filter: false}
    }, {
        name: 'category_name', label: 'Categoria', options: {display: true, viewColumns: false, filter: true}
    }, {
        name: 'count', label: 'Stock', options: {
            display: true, viewColumns: false, filter: false, 'customBodyRender': (value, tableMeta, updateValue) => {
                return (<div>
                        <h2 className={`font-bold text-white ${value > 0 ? "bg-green-300" : "bg-red-300"} text-center rounded-full p-2`}>{value}</h2>
                    </div>

                )
            }
        }
    }, {
        name: 'store', label: 'Almacen_id', options: {display: false, viewColumns: false, filter: false}
    }, {name: 'inventory', label: 'Inventory_id', options: {display: false, viewColumns: false, filter: false}}, {
        name: 'actions', label: 'Acciones', options: {
            display: true, viewColumns: false, filter: false, customBodyRender: (value, tableMeta, updateValue) => {
                return (<div className="flex gap-4 justify-center">
                    {role && role === "Administrador" &&
                        <FontAwesomeIcon icon={faTrash} onClick={(e) => handleDelete(tableMeta.rowData[0])}
                                         className={"text-red-400 cursor-pointer"}/>}
                    {role && role !== "Visualizador" &&
                        <FontAwesomeIcon icon={faEdit} onClick={(e) => handleOpenModalUpdate(tableMeta.rowData)}
                                         className={"text-blue-400 cursor-pointer"}/>}

                    {tableMeta.rowData[3] > 0 && role && role !== "Visualizador" &&
                        <FontAwesomeIcon className={"text-green-400 cursor-pointer"} icon={faPaperPlane}
                                         onClick={(e) => handleOpenModalSend(tableMeta.rowData)}/>}

                </div>);
            }
        }
    }])
    useEffect(() => {
        dispatch(get_store(store))
        dispatch(get_store_list_products(store))
    }, [store]);
    const handleDelete = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar este producto del almacén?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_product_to_store(id, store))
                dispatch(get_stores())
            }
        })
    }
    const handleOpenModalUpdate = (row) => {
        setTitle("Actualizar Stock")
        setIsOpen(true)
        setContent(<Form data={row} slug={store} close={openModal}/>)
    }
    const handleOpenModalSend = (row) => {
        setTitle("Realizar Movimiento")
        setIsOpen(true)
        setContent(<FormSend data={row} slug={store} close={openModal}/>)
    }


    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>
        <div className="flex flex-wrap flex-row  w-full justify-around   items-center ">
            <div className="lg:w-6/12 w-full">
                {inventories && inventories !== null ?
                    <CustomTable title={`Inventario de almacen`} columns={columns} data={inventories}/> :
                    <Skeleton count={10}/>}
            </div>

            {list && list !== null && list.length > 0 && <div className={"lg:w-4/12 w-full  "}>
                <List list={list} store={store}/></div>}


        </div>
    </Layout>);
};

export default Store;
