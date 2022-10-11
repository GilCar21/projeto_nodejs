"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rentalRoutes = void 0;
var _express = require("express");
var _CreateRentalControllers = require("../../../../modules/rentals/useCases/createRental/CreateRentalControllers");
var _DevolutionRentalController = require("../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalController");
var _listRentalsByUserController = require("../../../../modules/rentals/useCases/listRentalsByUser/listRentalsByUserController");
var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const rentalRoutes = (0, _express.Router)();
exports.rentalRoutes = rentalRoutes;
const createRentalController = new _CreateRentalControllers.CreateRentalController();
const devolutionRentalController = new _DevolutionRentalController.DevolutionRentalController();
const listRentalsByUserController = new _listRentalsByUserController.ListRentalsByUserController();
rentalRoutes.post("/", _ensureAuthenticated.ensureAuthenticated, createRentalController.handle);
rentalRoutes.post("/devolution/:id", _ensureAuthenticated.ensureAuthenticated, devolutionRentalController.handle);
rentalRoutes.get("/user", _ensureAuthenticated.ensureAuthenticated, listRentalsByUserController.handle);