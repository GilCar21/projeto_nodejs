"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUsesrController = void 0;
var _tsyringe = require("tsyringe");
var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");
class AuthenticateUsesrController {
  async handle(req, res) {
    const {
      password,
      email
    } = req.body;
    const authenticateUserUseCase = _tsyringe.container.resolve(_AuthenticateUserUseCase.AuthenticateUserUseCase);
    const token = await authenticateUserUseCase.execute({
      password,
      email
    });
    return res.json(token);
  }
}
exports.AuthenticateUsesrController = AuthenticateUsesrController;