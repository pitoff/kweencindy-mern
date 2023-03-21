class ResponseHelper {
    
    success(message = null, data = null) {

        return ({
            status: 'OK',
            data: data,
            message: message
        })
    }

    failure(message = null) {
        return ({
            status: 'FAILURE',
            message: message
        })
    }
}

module.exports = ResponseHelper