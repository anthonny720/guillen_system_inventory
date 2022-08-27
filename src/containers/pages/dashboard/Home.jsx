import React, {useEffect, useState} from 'react';
import Layout from "../../../hocs/Layout";
import {useDispatch, useSelector} from "react-redux";
import {get_stores} from "../../../redux/actions/store";
import Summary from "../../../components/dashboard/Summary";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import CustomTable from "../../../components/CustomTable";
import Skeleton from "react-loading-skeleton";
import {delete_order, get_orders, get_summary} from "../../../redux/actions/order";
import {MySwal} from "../../../helpers/util";
import BarChart from "../../../components/BarChart";
import {map} from 'lodash';


const Home = () => {
    const dispatch = useDispatch();
    const role = useSelector(state => state.Auth.user?.role);

    const stores = useSelector(state => state.Store.stores)
    const orders = useSelector(state => state.Order.orders)
    const summary = useSelector(state => state.Order.summary)
    const [columns] = useState([
        {name: 'id', label: 'Id', options: {display: false, viewColumns: false, filter: false}},
        {
            name: 'location', label: 'Lugar', options: {
                display: true, viewColumns: false, filter: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div>
                            <h2 className={`font-bold text-white ${value === "Huancayo" && "bg-orange-400" || value === "Tarma" && "bg-red-400" || value === "La merced" && "bg-cyan-400" || value === "Pichanaqui" && "bg-amber-300" || value === "Fabrica" && "bg-lime-300"} text-center rounded-full p-2`}>{value}</h2>
                        </div>
                    )
                }
            }
        },
        {name: 'slug', label: 'Slug', options: {display: false, viewColumns: false, filter: false}},
        {
            name: 'address', label: 'Dirección', options: {display: true, viewColumns: false, filter: false}
        },]);
    const [columns2] = useState([
        {'name': 'id', 'label': 'Id', 'options': {'display': false, 'viewColumns': true, 'filter': false}},
        {'name': 'year', 'label': 'Año', 'options': {'display': true, 'viewColumns': false, 'filter': true}},
        {'name': 'month', 'label': 'Mes', 'options': {'display': true, 'viewColumns': false, 'filter': true}},
        {'name': 'day', 'label': 'Día', 'options': {'display': true, 'viewColumns': false, 'filter': true}},
        {
            'name': 'store', 'label': 'Almacén', 'options': {
                'display': true, 'viewColumns': false, 'filter': true
                , 'customBodyRender': (value, tableMeta, updateValue) => {
                    return (
                        <div>
                            <h2 className={`font-bold text-white ${value === "Huancayo" && "bg-orange-400" || value === "Tarma" && "bg-red-400" || value === "La merced" && "bg-cyan-400" || value === "Pichanaqui" && "bg-amber-300" || value === "Fabrica" && "bg-lime-300"} text-center rounded-full p-2`}>{value}</h2>
                        </div>

                    )
                }
            }
        },
        {
            'name': 'product', 'label': 'Producto', 'options': {
                'display': true, 'viewColumns': false, 'filter': true
                , 'customBodyRender': (value, tableMeta, updateValue) => {
                    return (
                        <div>
                            <h2 className={"font-light text-white bg-gray-400 text-center rounded-full p-2"}>{value}</h2>
                        </div>

                    )
                }
            }
        },
        {
            'name': 'count', 'label': 'Cantidad', 'options': {
                'display': true, 'viewColumns': false, 'filter': false
                , 'customBodyRender': (value, tableMeta, updateValue) => {
                    return (
                        <div>
                            <h2 className={"font-bold text-white bg-green-300 text-center rounded-full p-2"}>{value}</h2>
                        </div>

                    )
                }
            }
        },
        {
            'name': 'motion', 'label': 'Destinatario', 'options': {
                'display': true, 'viewColumns': false, 'filter': false
                , 'customBodyRender': (value, tableMeta, updateValue) => {
                    return (
                        <div>
                            <h2 className={`font-bold text-white ${value === "Huancayo" && "bg-orange-400" || value === "Tarma" && "bg-red-400" || value === "La merced" && "bg-cyan-400" || value === "Pichanaqui" && "bg-amber-300" || value === "Fabrica" && "bg-lime-300" || value === "Venta" && "bg-black text-white"} text-center rounded-full p-2`}>{value}</h2>
                        </div>

                    )
                }
            }
        },
        {
            'name': 'actions', 'label': 'Acciones', 'options': {
                'display': true, 'viewColumns': false, 'filter': false
                , 'customBodyRender': (value, tableMeta, updateValue) => {
                    return (
                        <div>
                            {role && role !== null && role !== "Visualizador" &&
                                <FontAwesomeIcon className={"text-red-400 ml-12 cursor-pointer"}
                                                 onClick={(e) => handleDelete(tableMeta.rowData[0])} icon={faTrash}/>}

                        </div>

                    )
                }
            }
        },
    ])

    const handleDelete = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar este movimiento?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_order(id))
            }
        })
    }

    useEffect(() => {
        dispatch(get_stores());
        dispatch(get_orders());
        dispatch(get_summary())
    }, []);
    return (<Layout>

        <Summary stores={stores}/>
        <div className="flex flex-wrap flex-row  w-full justify-around   items-center ">
            <div className="lg:w-5/12 w-full">
                {stores && stores !== null ?
                    <CustomTable title={"Registro de Almacenes"} columns={columns} data={stores}/> :
                    <Skeleton count={10}/>}
            </div>
            <div className={"lg:w-4/12 w-full flex flex-col gap-2"}>
                {stores && stores !== null ?
                    <BarChart title={"Stock"} scores={map(stores, (loc, index) => loc.stock_total)}
                              labels={map(stores, (loc, index) => loc.location)}/> :
                    <Skeleton count={10}/>}
                {summary && summary !== null ?
                    <BarChart title={"Resumen - 2022"} scores={map(Object.values(summary), (s, index) => s)}
                              labels={map(Object.keys(summary), (s, index) => s)}/> :
                    <Skeleton count={10}/>}
            </div>
            <div className="w-full mt-6">
                {orders && orders !== null ?
                    <CustomTable title={"Registro de Movimientos"} columns={columns2} data={orders}/> :
                    <Skeleton count={10}/>}
            </div>
        </div>
    </Layout>);
};

export default Home;
