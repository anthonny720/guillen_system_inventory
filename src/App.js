import React from 'react';
import Home from "./containers/pages/dashboard/Home";
import store, {Persistor} from "./store";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Error404 from "./containers/errors/Error404";
import Login from "./containers/pages/auth/Login";
import Store from "./containers/pages/store/Store";
import History from "./containers/pages/history/History";
import Users from "./containers/pages/users/Users";
import Categories from "./containers/pages/categories/Categories";
import Products from "./containers/pages/products/Products";
import DetailCategory from "./containers/pages/categories/Detail";
import {PersistGate} from "redux-persist/integration/react";



const App = () => {

    return (<Provider store={store}>
        <PersistGate loading={null} persistor={Persistor}>
        <Router>
            <Routes>

                {/*Error Display*/}
                <Route path="*" element={<Error404/>}/>

                <Route exact path="/" element={<Home/>}/>
                <Route exact path="store/:store" element={<Store/>}/>

                <Route exact path="history/" element={<History/>}/>
                <Route exact path="users/" element={<Users/>}/>
                <Route exact path="categories/" element={<Categories/>}/>
                <Route exact path="category/:slug" element={<DetailCategory/>}/>
                <Route exact path="products/" element={<Products/>}/>


                {/*Authentication*/}
                <Route path="login/" element={<Login/>}/>

            </Routes>
        </Router>
            </PersistGate>
    </Provider>);
}

export default App;
