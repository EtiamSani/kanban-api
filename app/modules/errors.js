const errors = {
    error500: (res, err) => {
        res.status(500).json({
            statusCode: 500,
            message: "Server error",
            // on utilise toString() pour récupérer le message d'erreur "épuré"
            fullErrorMessage: err.toString()
        });
    },
    error400: (res) => {
        res.status(400).json({
            statusCode: 400,
            message: "Bad request"
        });
    }
};

module.exports = errors;