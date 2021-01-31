import { Product } from './../entity/Product';
import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";


export class ProductController {

    private productRepository = getRepository(Product);

    async all(request: Request, response: Response, next: NextFunction) {
        // if(request.session){
        //     if(request.session.user){
        //         return this.productRepository.find();
        //     }else{
        //         return {'status':0,'message':"Unauthorised access"}
        // }
        // }else{
        //     return {'status':0,'message':"Unauthorised access"}
        // }
        return this.productRepository.find();

    }

    async one(request: Request, response: Response, next: NextFunction) {
        if(request.session){
            if(request.session.user){
                return this.productRepository.findOne(request.params.id);
            }else{
                return {'status':0,'message':"Unauthorised access"}
        }
        }else{
            return {'status':0,'message':"Unauthorised access"}
        }

    }

    async save(request: Request, response: Response, next: NextFunction) {
        if(request.session){
            if(request.session.user){
                return this.productRepository.save(request.body);
            }else{
                return {'status':0,'message':"Unauthorised access"}
        }
        }else{
            return {'status':0,'message':"Unauthorised access"}
        }

    }

    async remove(request: Request, response: Response, next: NextFunction) {
        if(request.session){
            if(request.session.user){
                let productToRemove = await this.productRepository.findOne(request.params.id);
                await this.productRepository.remove(productToRemove);
            }else{
                return {'status':0,'message':"Unauthorised access"}
        }
        }else{
            return {'status':0,'message':"Unauthorised access"}
        }

    }

}