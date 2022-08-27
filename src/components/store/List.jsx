import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {add_product_to_store} from "../../redux/actions/store";
import {useParams} from "react-router-dom";
import CustomTable from "../CustomTable";
import Skeleton from "react-loading-skeleton";

const List = (list) => {
    const {store} = useParams();
    const dispatch = useDispatch();
    const columns = [{
        name: 'id',
        label: 'Id',
        options: {display: false, viewColumns: false, filter: false}
    }, {name: 'name', label: 'Producto', options: {display: true, viewColumns: false, filter: false}},
        {
            name: 'actions', label: "Accion", options: {
                display: true, viewColumns: false, filter: false, customBodyRender: (value, tableMeta, updateValue) => {
                    return (<div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row justify-between items-center">
                            <FontAwesomeIcon className={"text-green-400 cursor-pointer"} icon={faPlusCircle} onClick={() => {
                                dispatch(add_product_to_store(store, {'inventory':tableMeta.rowData[0]}))
                            }}/>
                        </div>
                    </div>)
                }
            }
        }];
    const handleAdd = (id) => {
        dispatch(add_product_to_store(store, {'inventory': id}))
    }
    return (
        <div>

                <CustomTable title={`Inventario de almacen`} columns={columns} data={list.list}/>

        </div>

    );
};

export default List;
