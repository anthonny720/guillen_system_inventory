import React, {useEffect, useState} from 'react';
import Layout from "../../../hocs/Layout";
import CustomTable from "../../../components/CustomTable";
import {useDispatch, useSelector} from "react-redux";
import {get_history} from "../../../redux/actions/history";
import Skeleton from "react-loading-skeleton";

const History = () => {
    const dispatch = useDispatch();
    const activities = useSelector(state => state.History.activities);
    const [columns, setColumns] = useState([{
        name: 'id',
        options: {display: false, filter: false}
    }, {name: 'user', label: "Usuario", options: {filter: false}}, {
        name: 'action',
        label: 'Acción',
        options: {filter: false}
    }, {name: 'date', label: 'Fecha', options: {filter: false}},]);
    useEffect(() => {
        dispatch(get_history());
    }, []);

    return (<Layout>
        <div className="w-full h-full z-0 mt-6">
            {activities && activities !== null?
                <CustomTable data={activities} title={"Historial de ediciones"} columns={columns}/>:<Skeleton count={10}/>}
        </div>
    </Layout>);
};

export default History;
