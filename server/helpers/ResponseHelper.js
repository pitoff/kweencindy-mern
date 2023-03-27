class ResponseHelper {
    
    success(message = null, data = {}) {

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