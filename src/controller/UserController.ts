import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";

export class UserController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        if(request.session){
            if(request.session.user){
                return this.userRepository.find();
            }else{
                return {'status':0,'message':"Unauthorised access"}
        }
        }else{
            return {'status':0,'message':"Unauthorised access"}
        }

    }

    async one(request: Request, response: Response, next: NextFunction) {
        if(request.session){
            if(request.session.user){
                return this.userRepository.findOne(request.params.id);
            }else{
                return {'status':0,'message':"Unauthorised access"}
        }
        }else{
            return {'status':0,'message':"Unauthorised access"}
        }

    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
          if(request.session){
            if(request.session.user){
                let userToRemove = await this.userRepository.findOne(request.params.id);
                await this.userRepository.remove(userToRemove);
            }else{
                return {'status':0,'message':"Unauthorised access"}
        }
        }else{
            return {'status':0,'message':"Unauthorised access"}
        }

    }
     async login(request: Request, response: Response, next: NextFunction) {
        console.log(request.body);
        let loggedInUser = await this.userRepository.findOne({'username':request.body.username,'password':request.body.password});
        if (loggedInUser){
            request.session.user = request.body.username;
            return {'status':1,'message':"Logged in Successfully"}
        }else{
            return {'status':0,'message':"Wrong Credentials"}
        }
    }

}