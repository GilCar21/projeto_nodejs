"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCArController = void 0;
var _tsyringe = require("tsyringe");
var _CreateCarUseCase = require("./CreateCarUseCase");
class CreateCArController {
  async handle(req, res) {
    const {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    } = req.body;
    const createCarUseCase = _tsyringe.container.resolve(_CreateCarUseCase.CreateCarUseCase);
    const car = await createCarUseCase.execute({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    });
    return res.status(201).json(car);
  }
}
exports.CreateCArController = CreateCArController;