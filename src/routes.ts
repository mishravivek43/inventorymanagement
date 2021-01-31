import {UserController} from "./controller/UserController";
import {ProductController} from "./controller/ProductController";
const uri = "/api"
export const Routes = [{
    method: "get",
    route: uri + "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: uri + "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: uri + "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: uri + "/users/:id",
    controller: UserController,
    action: "remove"
},{
    method: "post",
    route: uri + "/login",
    controller: UserController,
    action: "login"
},{
    method: "get",
    route: uri + "/products",
    controller: ProductController,
    action: "all"
}, {
    method: "get",
    route: uri + "/products/:id",
    controller: ProductController,
    action: "one"
}, {
    method: "post",
    route: uri + "/products",
    controller: ProductController,
    action: "save"
}, {
    method: "delete",
    route: uri + "/products/:id",
    controller: ProductController,
    action: "remove"
}
];