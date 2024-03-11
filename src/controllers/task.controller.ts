import { Request, Response } from "express";
import { ITask } from "../types";
import { AuthRequest } from "../middleware";
import Task from "../models/task-model";

export const getAlltasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user;

    const tasks = await Task.find({
      user: userId,
    });

    return res.send(tasks);
  } catch (error) {
    console.log("Erro ao buscar tarefas", error);
    throw error;
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user;
    const { name, date, categoryId }: ITask = req.body;

    const task = await Task.create({
      name,
      date,
      categoryId,
      user: userId,
    });

    return res.status(201).json({ message: "Tarefa cadastrada com Sucesso!" });
  } catch (error) {
    console.log("error ao criar a tarefa", error);
    res.send({ message: "Algo deu errado" });
    throw error;
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    console.log("Deleting category with ID:", id);

    await Task.deleteOne({ _id: id });
    res.send({ message: "Categoria deletada" });
  } catch (error) {
    console.log("erro ao deletar uma categoria", error);
    throw error;
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { _id, date, isCompleted, name }: ITask = req.body;
    await Task.updateOne(
      {
        _id,
      },
      {
        $set: {
          name,
          date,
          isCompleted,
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