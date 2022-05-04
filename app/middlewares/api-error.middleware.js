class APIError extends Error {

    constructor(statusCode, message, isOperational = true, stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        return (req, res, next) => {
            return res.json({ message });
        }


    }
}

module.exports = APIError