import React, {useEffect, useState} from 'react';
import CustomTable from "../../../components/CustomTable";
import Skeleton from "react-loading-skeleton";
import {useDispatch, useSelector} from "react-redux";
import {detail_category} from "../../../redux/actions/category";
import {useParams} from "react-router-dom";
import Layout from "../../../hocs/Layout";

const DetailCategory = () => {
    const {slug} = useParams()
    const category = useSelector(state => state.Category.category)
    const name = useSelector(state => state.Category.name)
    const dispatch = useDispatch()
    console.log()
    useEffect(() => {
        dispatch(detail_category(slug))
    }, [])
    const [columns_detail] = useState([{
        name: 'store', label: 'Almacén', options: {display: true, viewColumns: false, filter: true}
    }, {name: 'product', label: 'Producto', options: {display: true, viewColumns: true, filter: true}},{name: 'stock', label: 'Stock', options: {display: true, viewColumns: false, filter: false
    , 'customBodyRender': (value, tableMeta, updateValue) => {
            return(
                <div>
                    <h2 className={`font-bold text-white ${value>0?"bg-green-300":"bg-red-300"} text-center rounded-full p-2`}>{value}</h2>
                </div>

            )
                }
    }},]);
    return (<Layout>
        {category && category !== null ? <CustomTable data={category} title={`Registro de Productos ${name}`} columns={columns_detail}/> :
            <Skeleton count={25}/>}
    </Layout>);
};

export default DetailCategory;
