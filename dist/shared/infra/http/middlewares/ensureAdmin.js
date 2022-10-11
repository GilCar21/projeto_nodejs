"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAdmin = ensureAdmin;
var _UserRepository = require("../../../../modules/accounts/infra/typeorm/repositories/UserRepository");
var _AppError = require("../../../errors/AppError");
async function ensureAdmin(req, res, next) {
  const {
    id
  } = req.user;
  const userRepository = new _UserRepository.UsersRepository();
  const user = await userRepository.findById(id);
  if (!user.isAdmin) {
    throw new _AppError.AppError("User isn't admin");
  }
  return next();
}