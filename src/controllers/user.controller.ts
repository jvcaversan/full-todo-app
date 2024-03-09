import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user-model";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import { IUser } from "../types";

const getUserToken = (_id: string | Types.ObjectId) => {
  const authenticatedUserToken = jwt.sign({ _id }, "express", {
    expiresIn: "7d",
  });

  return authenticatedUserToken;
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Usuário já cadastrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "Usuário cadastrado com Sucesso!" });
  } catch (error) {
    console.log("error ao criar usuario", error);
    throw error;
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: IUser = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(409).json({ message: "Email ou Senha incorretos." });
    }

    const isPasswordIdentical = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (isPasswordIdentical) {
      const token = getUserToken(existingUser._id);
      return res.send({
        token,
        user: {
          email: existingUser.email,
          name: existingUser.name,
        },
      });
    } else {
      return res.status(400).json({ message: "Usuário ou Senha incorretos." });
    }
  } catch (error) {
    console.log("erro", error);
    throw error;
  }
};
