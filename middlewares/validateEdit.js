function validateEdit(req, res, next) {
    const changes = req.body;
    let isInvalidProp = false;
    let invalidPropName = ""; // Used for displaying in res error message

    // Checks that the req.body props are all props that exist within a menu item
    for (const prop in changes) {
        switch (prop) {
            case "id":
                break;

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

    // Handles an empty req.body
    if (!isEmptyObject(changes)) {
        // Handles invalid properties in the req.body
        if (!isInvalidProp) {
            next();
        } else {
            res.status(400).json({
                success: false,
                message: `'${invalidPropName}' is an invalid property to edit. Available properties are 'title', 'desc' and 'price'.`,
            });
        }
    } else {
        res.status(400).json({
            success: false,
            message:
                "No property added. Please make sure to add a property to edit",
        });
    }
}

// Function for readability
function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

module.exports = { validateEdit };
