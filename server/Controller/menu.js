const Menu = require("../Model/menuDB");

exports.getMenuByRestaurantId = (req, res) => {
    const { restId } = req.params;

    Menu.find({restaurantId:restId})
        .then(response => {
            res.status(200).json({
                message: "Menu Fetched successfully By Restaurant Id",
                menuItem: response
            })
        })
        .catch(err => {
            res.status(500).json({ error : err})
        })
}