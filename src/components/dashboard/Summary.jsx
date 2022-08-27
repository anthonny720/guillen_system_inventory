import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faStore} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import {Link} from "react-router-dom";
import {map} from 'lodash'

const Summary = ({stores}) => {

    return (<div className={"flex flex-wrap pb-3 mx-4 md:mx-24 lg:mx-0"}>

            {stores && stores!==null&& map(stores,store =>

                <div key={store.id} className="w-full p-2 lg:w-1/5 md:w-1/3  w-1/2">
                    <Link to={`/store/${store?.slug}/`}>
                        <div
                            className="flex flex-col p-4 text-center overflow-hidden bg-white hover:bg-gradient-to-br hover:from-purple-400 hover:via-blue-400 hover:to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
                            <div className="flex flex-row justify-between items-center">
                                <div className="bg-gray-300  rounded-xl bg-opacity-30">
                                    <FontAwesomeIcon icon={faStore} width="20"/>
                                </div>
                            </div>
                            <h1 className="text-3xl sm:text-2xl xl:text-4xl  font-bold text-gray-700  group-hover:text-gray-50">{store.stock_total}  und</h1>
                            <div className="flex flex-row justify-center group-hover:text-gray-200  ">
                                <h1 className="text-center">{store.location}</h1>
                            </div>
                        </div>
                    </Link>
                </div>)}
        </div>

    );
};

export default Summary;
