import React, {useEffect, useState} from 'react';
import Layout from "../../../hocs/Layout";
import CustomTable from "../../../components/CustomTable";
import {useDispatch, useSelector} from "react-redux";
import {delete_user, get_users} from "../../../redux/actions/auth";
import {faEdit, faEye, faPen, faPlusCircle, faTrash, faUserGear} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Form from "../../../components/users/Form";
import Modal from "../../../components/Modal";
import {MySwal} from "../../../helpers/util";
import Skeleton from "react-loading-skeleton";

const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.Auth.users);
    const role = useSelector(state => state.Auth.user.role);
    const [columns] = useState([{name: 'id', label: "Id", options: {filter: false}}, {
        name: 'email', label: "Correo", options: {filter: false}
    }, {name: 'first_name', label: "Nombre", options: {filter: false}}, {
        name: 'last_name', label: "Apellidos", options: {filter: false}
    }, {
        name: 'role', label: "Rol", options: {
            customBodyRender: (value, tableMeta, updateValue) => {
                return (<FontAwesomeIcon
                        icon={value === "Administrador" && faUserGear || value === "Editor" && faPen || value === "Visualizador" && faEye}/>)
            }

        }
    }, {
        name: "actions", label: "Acciones", options: {
            viewColumns: false, filter: false, customBodyRender: (value, tableMeta, updateValue) => {
                return (<div>
                        <FontAwesomeIcon icon={faTrash} className={"cursor-pointer text-red-500"}
                                         onClick={(e) => {
                                             role&&role === "Administrador" && handleDelete(tableMeta.rowData[0])
                                         }}
                        />
                        <FontAwesomeIcon icon={faEdit} className={"cursor-pointer ml-6 text-blue-500"}
                                         onClick={(e) => {
                                             role&&role === "Administrador" && handleOpenModalUpdate(tableMeta.rowData)
                                         }}
                        />

                    </div>

                );
            }
        }
    }])
    /*Modal*/
    const [title, setTitle] = useState("");
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen((prev) => !prev)
    }
    const handleOpenModalAdd = () => {
        setTitle("Agregar usuario")
        setIsOpen(true)
        setContent(<Form close={openModal}/>)
    }
    const handleOpenModalUpdate = (row) => {
        setTitle("Editar usuario")
        setIsOpen(true)
        setContent(<Form data={row} close={openModal}/>)
    }
    const handleDelete = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar este usuario?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_user(id));
            }
        })
    }
    useEffect(() => {
        dispatch(get_users())
    }, []);

    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>

        <div className="w-full h-full mt-6">
            {role&&role == "Administrador" &&
                <FontAwesomeIcon icon={faPlusCircle} className={"mx-[50%] text-red-400 text-xl cursor-pointer"}
                                 onClick={handleOpenModalAdd}/>}

            {users && users !== null ? <CustomTable columns={columns} data={users} title={"Registro de usuarios"}/> :
                <Skeleton count={10}/>}
        </div>
    </Layout>);
};

export default Users;
