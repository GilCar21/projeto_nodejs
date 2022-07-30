import { Router } from "express";

import { AuthenticateUsesrController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUsesrController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);

export { authenticateRoutes };
