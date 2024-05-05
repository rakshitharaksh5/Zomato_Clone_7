const express = require('express');

const locationController = require("../Controller/location");
const restaurantController = require("../Controller/restaurant");
const mealtypeController = require("../Controller/mealtype");
const userController = require("../Controller/user");
const menuController = require("../Controller/menu");

const route = express.Router();

route.get('/location', locationController.getLocation);

route.get('/rest/:cityId', restaurantController.getRestaurantByLocationId);
route.get('/restaurant/:id', restaurantController.getRestaurantById);
route.get('/mealtype', mealtypeController.getMealtype);
route.post('/signup', userController.postSignUp);
route.post('/login', userController.postLogin);
route.get('/menu/:restId', menuController.getMenuByRestaurantId);

//Filter
route.get('/restaurant', restaurantController.getRestaurant);
route.post('/filter', restaurantController.filteredRestaurant);
route.get('/meal/:mealId', mealtypeController.getMealtypeById);

module.exports = route;
