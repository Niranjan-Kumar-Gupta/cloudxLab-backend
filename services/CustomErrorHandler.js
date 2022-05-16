

class CustomErrorHandler extends Error{
    constructor(status,msg){
        super()
        this.status = status;
        this.msg = msg;
    }
    static alredayExits(message){
        return new CustomErrorHandler(409,message)
    }
    static serverError(message='Internal server error'){
        return new CustomErrorHandler(400,message);
    }
}

export default CustomErrorHandler