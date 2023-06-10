function validatePrice(req, res, next) {
    const price = req.body.price;

    if (price) {
        if (typeof price === "number") {
            next();
        } else {
            res.status(400).json({
                success: false,
                message: "Price needs to be of the datatype 'number",
            });
        }
    } else {
        res.status(404).json({
            success: false,
            message: "Need a price, no price property was found",
        });
    }
}

module.exports = { validatePrice };
