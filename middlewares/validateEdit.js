function validateEdit(req, res, next) {
    const changes = req.body;
    let isInvalidProp = false;
    let invalidPropName = "";

    for (const prop in changes) {
        switch (prop) {
            case "title":
                break;

            case "desc":
                break;

            case "price":
                break;

            default: // This runs when no matches are made
                isInvalidProp = true;
                invalidPropName = prop;
                break;
        }
    }

    if (!isEmptyObject(changes)) {
        if (!isInvalidProp) {
            next();
        } else {
            res.json({
                success: false,
                message: `'${invalidPropName}' is an invalid property to edit. Available properties are 'title', 'desc' and 'price'.`,
            });
        }
    } else {
        res.json({
            success: false,
            message:
                "No property added. Please make sure to add a property to edit",
        });
    }
}

function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

module.exports = { validateEdit };
