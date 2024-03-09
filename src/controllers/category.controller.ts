import { Request, Response } from "express";
import Category from "../models/category-model";
import { ICategory } from "../types";
import { AuthRequest } from "../middleware";
import { request } from "http";

export const getAllCategories = async (req: AuthRequest, res: Response) => {
  try {
    const { user } = req;

    const categories = await Category.find({
      user: user,
    });

    return res.send(categories);
  } catch (error) {
    console.log("Erro ao buscar categorias", error);
    throw error;
  }
};

export const createCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { name, color, icon, isEditable }: ICategory = req.body;
    const { user } = req;

    const category = await Category.create({
      name,
      color,
      icon,
      isEditable,
      user,
    });

    return res
      .status(201)
      .json({ message: "Categoria cadastrada com Sucesso!" });
  } catch (error) {
    console.log("error ao criar a categoria", error);
    res.send({ message: "Algo deu errado" });
    throw error;
  }
};
