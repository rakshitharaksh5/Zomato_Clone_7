const Restaurant = require("../Model/restaurantDB");

exports.getRestaurant = (req, res) => {


    Restaurant.find()
        .then(response => {
            res.status(200).json({
                message: "Restaurant Fetched successfully",
                restaurant: response
            })
        })
        .catch(err => {
            res.status(500).json({ error : err})
        })
}

exports.getRestaurantByLocationId = (req, res) => {

    const {cityId} = req.params;


    Restaurant.find({city : cityId}, {})                //locId
        .then(response => {
            res.status(200).json({
                message: "Restaurant By Location Id Fetched successfully",
                restaurant: response
            })
        })
        .catch(err => {
            res.status(500).json({ error : err})
        })
}

exports.getRestaurantById = (req, res) => {

    const { id } = req.params;


    Restaurant.findById(id)
        .then(response => {
            res.status(200).json({
                message: "Restaurant By Id Fetched successfully",
                restaurant: response
            })
        })
        .catch(err => {
            res.status(500).json({ error : err})
        })
}

//filter part
exports.filteredRestaurant = (req, res) => {
    let { location, mealtype, lcost, hcost, cuisine, sort, page } = req.body;

    sort = sort ? sort : 1;     //1 -> Ascending order -1 -> Decending order
    page = page ? page : 1;

    const itemsPerPage = 2;        // Number of restaurants in a page
    const startIndex = page * itemsPerPage - itemsPerPage;
    const endIndex = page * itemsPerPage;

    var filterObj = {};
    location && (filterObj["city"] = location);     // Inserting a location data passed from the body to the filter object
    mealtype && (filterObj["type.mealtype"] = mealtype);     // Inserting a mealtype data passed from the body to the filter object
    lcost && hcost && (filterObj["cost"] = { $gte: lcost, $lte: hcost});    //Inserting a range to identify the cost of a restaurant given from the body to the filter object.
    cuisine && (filterObj["Cuisine.cuisine"]= { $in: cuisine });

    console.log(filterObj);

    Restaurant.find(filterObj).sort({ cost: sort })     //we have to create a object
        .then(response => {
            const filteredResponse = response.slice(startIndex, endIndex);
            res.status(200).json({
                message: " Restaurant Filtered successfully",
                restaurant: filteredResponse
            })
        })
        .catch(err => {
            res.status(500).json({ error : err})
        })
}