import { Request, Response } from "express";
import Category from "../models/category-model";
import { ICategory } from "../types";
import { AuthRequest } from "../middleware";

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

export const deleteCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    console.log("Deleting category with ID:", id);

    await Category.deleteOne({ _id: id });
    res.send({ message: "Categoria deletada" });
  } catch (error) {
    console.log("erro ao deletar uma categoria", error);
    throw error;
  }
};

export const updateCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { _id, color, icon, isEditable, name }: ICategory = req.body;
    await Category.updateOne(
      {
        _id,
      },
      {
        $set: {
          name,
          color,
          icon,
          isEditable,
        },
      }
    );

    return res
      .status(201)
      .json({ message: "Categoria atualizada com Sucesso!" });
  } catch (error) {
    console.log("error ao atualizar a categoria", error);
    res.send({ message: "Algo deu errado" });
    throw error;
  }
};
