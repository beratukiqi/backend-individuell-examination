function checkProductProps(req, res, next) {
    const { title, desc, price } = req.body;
    let hasTitle = typeof title === "string" && title;
    let hasDesc = typeof desc === "string" && desc;
    let hasPrice = typeof price === "number" && price;

    if (hasTitle && hasDesc && hasPrice) {
        next();
    } else if (!hasTitle) {
        res.json({
            success: false,
            message: "Invalid title",
        });
    } else if (!hasDesc) {
        res.json({
            success: false,
            message: "Invalid description",
        });
    } else if (!hasPrice) {
        res.json({
            success: false,
            message: "Invalid price",
        });
    } else {
        res.json({
            success: false,
            message: "Product is invalid",
        });
    }
}

module.exports = { checkProductProps };
