"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));
var _CarsRepositoryInMemory = require("../../../cars/repositories/in-memory/CarsRepositoryInMemory");
var _RentalsRepositoryInMemorys = require("../../repository/in-memory/RentalsRepositoryInMemorys");
var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");
var _AppError = require("../../../../shared/errors/AppError");
var _CreateRentalUseCase = require("./CreateRentalUseCase");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let createRentalUseCase;
let rentalRepositoryInMemory;
let carsRepositoryInMemory;
let dayjsDateProvider;
describe("Create Rental", () => {
  const dayAdd24Hours = (0, _dayjs.default)().add(1, "day").toDate();
  beforeEach(() => {
    rentalRepositoryInMemory = new _RentalsRepositoryInMemorys.RentalsRepositoryInMemory();
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    dayjsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(rentalRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
  });
  it("shoul be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 50,
      category_id: "1234",
      brand: "brand"
    });
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
  it("shoul not be able to create a new rental if there is another open to the same user", async () => {
    await rentalRepositoryInMemory.create({
      user_id: "12345",
      car_id: "1111",
      expected_return_date: dayAdd24Hours
    });
    await expect(createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new _AppError.AppError("There's a rental in progress for user!"));
  });
  it("shoul not be able to create a new rental if there is another open to the same car", async () => {
    await rentalRepositoryInMemory.create({
      user_id: "1234",
      car_id: "test",
      expected_return_date: dayAdd24Hours
    });
    await expect(createRentalUseCase.execute({
      user_id: "4321",
      car_id: "test",
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new _AppError.AppError("Car is Unavailable"));
  });
  it("shoul not be able to create a new rental with invalid return time", async () => {
    await expect(createRentalUseCase.execute({
      user_id: "1234",
      car_id: "test",
      expected_return_date: (0, _dayjs.default)().toDate()
    })).rejects.toEqual(new _AppError.AppError("Invalid return time"));
  });
});