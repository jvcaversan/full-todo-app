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

export const toggleTaskStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { isCompleted } = req.body;
    const { id } = req.params;

    const task = await Task.updateOne(
      {
        _id: id,
      },
      {
        isCompleted,
      }
    );

    res.send(task);
  } catch (error) {
    console.log("erro", error);
    res.send({ message: "erro ao selecionar tarefa" });
  }
};

export const getAllTasksByCategory = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user;
    const { id } = req.params;

    const tasks = await Task.find({
      user: userId,
      categoryId: id,
    });
    res.send(tasks);
  } catch (error) {
    console.log("erro ao buscar tarefas dessa categoria", error);
    res.send({ message: "erro ao buscar tarefas" });
    throw error;
  }
};

export const getAllCompletedTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user;

    const tasks = await Task.find({
      user: userId,
      isCompleted: true,
    });
    res.send(tasks);
  } catch (error) {
    console.log("erro ao buscar tarefas completadas", error);
    res.send({ message: "erro ao buscar tarefas completadas" });
    throw error;
  }
};

export const getTasksForToday = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user;

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const tasks = await Task.find({
      user: userId,
      date: currentDate.toISOString(),
    });
    res.send(tasks);
  } catch (error) {
    console.log("erro ao buscar tarefas de hoje", error);
    res.send({ message: "erro ao buscar tarefas de hoje" });
    throw error;
  }
};

// export const deleteTask = async (req: AuthRequest, res: Response) => {
//   try {
//     const { id } = req.params;
//     console.log("Deleting task with ID:", id);

//     await Task.deleteOne({ _id: id });
//     res.send({ message: "Tarefa deletada" });
//   } catch (error) {
//     console.log("erro ao deletar uma tarefa", error);
//     throw error;
//   }
// };

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { _id, date, categoryId, name }: ITask = req.body;
    await Task.updateOne(
      {
        _id,
      },
      {
        $set: {
          name,
          date,
          categoryId,
        },
      }
    );

    return res.status(201).json({ message: "Tarefa atualizada com Sucesso!" });
  } catch (error) {
    console.log("error ao atualizar a tarefa", error);
    res.send({ message: "Algo deu errado" });
    throw error;
  }
};
