import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user-model";

//A adaptação da interface AuthRequest é necessária porque o módulo jsonwebtoken acrescenta a propriedade user diretamente no objeto Request padrão do Express, e o TypeScript precisa estar ciente dessa nova propriedade.

export interface AuthRequest extends Request {
  user: string;
}

export const authenticationMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: "Erro na autenticação" });
    }

    const token = authorization;
    const { _id } = jwt.verify(token, "express");
    const existingUser = await User.findOne({ _id });

    if (existingUser) {
      req.user = existingUser.id;
    }

    next();
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
