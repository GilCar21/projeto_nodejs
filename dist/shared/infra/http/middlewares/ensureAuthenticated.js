"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuthenticated = ensureAuthenticated;
var _jsonwebtoken = require("jsonwebtoken");
var _auth = _interopRequireDefault(require("../../../../config/auth"));
var _AppError = require("../../../errors/AppError");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";

async function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;
  // const usersTokensRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new _AppError.AppError("Token missing", 401);
  }
  const [, token] = authHeader.split(" ");
  try {
    const {
      sub: user_id
    } = (0, _jsonwebtoken.verify)(token, _auth.default.secret_token);

    // const user = usersTokensRepository.findByUserIdAndRefreshToken(
    //   user_id,
    //   token
    // );

    // if (!user) {
    //   throw new AppError("User does not exists!", 401);
    // }

    req.user = {
      id: user_id
    };
    next();
  } catch {
    throw new _AppError.AppError("Invalid token", 401);
  }
}