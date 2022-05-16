import Joi from "joi"

import { User } from "../models";
import CustomErrorHandler from "../services/CustomErrorHandler";


const formController = {
    async submitForm(req,res,next){
        // validation    
        const formSchema = Joi.object({
            email:Joi.string().email().required(),
            name:Joi.string().required(),
        })

        const {error} = formSchema.validate(req.body);
        if (error) {
            return next(error)
        }

        //check if user is already exits in database

        try {
            const exit = await User.exists({email:req.body.email});
            if (exit) {
                return next(CustomErrorHandler.alredayExits('email is already exit'))
            }
        } catch (err) {
            return next(err);
        }

        const {email,name} = req.body;

      
        const user = new User({
            email,
            name
        })

        try {
            const result = await user.save();
        } catch (err) {
            return next(err)
        }

         res.json({status:1,message:'sucessfully submit'})
     }
   
}

export default formController