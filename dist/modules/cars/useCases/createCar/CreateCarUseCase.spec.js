"use strict";

var _CarsRepositoryInMemory = require("../../repositories/in-memory/CarsRepositoryInMemory");
var _AppError = require("../../../../shared/errors/AppError");
var _CreateCarUseCase = require("./CreateCarUseCase");
let createCarUseCase;
let carsRepositoryInMemory;
describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createCarUseCase = new _CreateCarUseCase.CreateCarUseCase(carsRepositoryInMemory);
  });
  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category"
    });
    expect(car).toHaveProperty("id");
  });
  it("shoul not be able to create a car if with exist license plate", async () => {
    await createCarUseCase.execute({
      name: "Car1",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category"
    });
    expect(createCarUseCase.execute({
      name: "Car2",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category"
    })).rejects.toEqual(new _AppError.AppError("Car already exists!"));
  });
  it("should be able to create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Name car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABCd-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category"
    });
    expect(car.available).toBe(true);
  });
});