import {combineReducers} from "redux";
import Auth from "./auth";
import Alert from "./alert";
import Store from "./store";
import History from "./history";
import Category from "./category";
import Inventory from "./products";
import Order from "./order";


export default combineReducers({
    Auth, Alert, Store, History, Category, Inventory, Order
})