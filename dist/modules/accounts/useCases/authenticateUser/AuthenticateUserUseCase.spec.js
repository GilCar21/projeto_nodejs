"use strict";

var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");
var _UsersTokensRepositoryInMemory = require("../../repositories/in-memory/UsersTokensRepositoryInMemory");
var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");
var _AppError = require("../../../../shared/errors/AppError");
var _CreateUserUseCase = require("../createUser/CreateUserUseCase");
var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");
let authenticateUserUseCase;
let usersRepositoryInMemory;
let userTokensRepositoryInMemory;
let dateProvider;
let createUserUseCase;
describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    userTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, userTokensRepositoryInMemory, dateProvider);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
  });
  it("shold be able to authenticate an user", async () => {
    const user = {
      driver_license: "000123",
      email: "user@test.com",
      password: "1234",
      name: "User test"
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty("token");
  });
  it("should not be able to authenticate an nonexistent user", async () => {
    await expect(authenticateUserUseCase.execute({
      email: "false@email.com",
      password: "1234"
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect!"));
  });
  it("should not be able to authenticate with incorrect password", async () => {
    const user = {
      driver_license: "000321",
      email: "user@user.com",
      password: "1234",
      name: "User Test Error"
    };
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: "user@user.com",
      password: "incorrectPassword"
    })).rejects.toEqual(new _AppError.AppError("Email or passwor incorrect!"));
  });
});