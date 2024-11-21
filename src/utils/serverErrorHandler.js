const serverErrorHandler = (error, message = "something went wrong , please try again") => {
    if(error.response){
        return (
            error.response.data.error_description || 
            error.response.data.message || 
            error.response.data.msg || 
            error.response.data.error
        )
    }else if (error.request){
        if(error.code === "ERR_NETWORK"){
            return "Network error, please check your internet connection"
        }
        return "No response received from the server";
    }else{
        return error.message || message
    }
};

export default serverErrorHandler;