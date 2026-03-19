import {
  insertTask,
  getAllTasks,
  fetchTaskById,
  updateTaskDetails,
  updateTaskStatus,
  unassignTask,
  deleteTask,
} from "../model/taskModel.js";

import { AppError } from "../utils/appError.js";

export const createTask = async (taskInfo) => {
  const { title, priority, assignedTo, assignedBy } = taskInfo; // Destructure the task information

  //validate for data Type

  if (
    typeof title !== "string" ||
    typeof priority !== "string" ||
    typeof assignedTo !== "number" ||
    typeof assignedBy !== "number"
  ) {
    throw new Error("A Validation Error Occured");
  }

  // validate for required fields and priority values
  if (!title || !priority || !assignedTo || !assignedBy) {
    throw new AppError("All fields are required.", 400);
  }

  if (!validPriorities.includes(priority.toLowerCase())) {
    throw new AppError("Priority must be one of: low, medium, high.", 400);
  }

  try {
    const newTask = await insertTask({
      title,
      priority,
      assignedTo,
      assignedBy,
    });
    return newTask;
  } catch (e) {
    throw new AppError("Failed to create task: " + e.message, 500);
  }
};

export const fetchTasks = async () => {
  try {
    const tasks = await getAllTasks();
    return tasks;
  } catch (e) {
    throw new AppError("Failed to fetch tasks: " + e.message, 500);
  }
};

const validPriorities = ["low", "medium", "high"];

export const updateTask = async (taskId, updateData, currentUserId) => {
  const { title, priority } = updateData;

  if (!currentUserId) {
    throw new AppError("Invalid Credentials: User ID is required for authorization", 401);
  } 

  

  const existingTask = await fetchTaskById(taskId);
  if (!existingTask) {
    throw new AppError("Task not found", 404);
  }

  if (existingTask.assignedBy !== currentUserId) {
    
    throw new AppError("Authorization Error: Only the user who created the task can update it", 403);
  }

  if (!title && !priority) {
    throw new AppError("All fields must be provided", 400);
  }

  if (priority && !validPriorities.includes(priority.toLowerCase())) {
    throw new AppError("Priority must be one of: low, medium, high", 400);
  }

  if (typeof title !== "string" || typeof priority !== "string") {
    throw new AppError("A Validation Error Occured", 400);
  }

  const updatedTitle = title;
  const updatedPriority = priority;

  await updateTaskDetails(taskId, {
    title: updatedTitle,
    priority: updatedPriority,
  });

  return {
    ...existingTask,
    title: updatedTitle,
    priority: updatedPriority,
  };

}


const validStatuses = ["pending", "in-progress", "completed"];

export const assigneeTaskStatusUpdate = async (
  taskId,
  newStatus,
  currentUserId,
) => {
  const { status } = newStatus;

  const task = await fetchTaskById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  if (!currentUserId) {
    throw new Error(
      "Invalid Credentials: User ID is required for authorization",
    );
  }

  if (task.assignedTo !== currentUserId) {

    throw new AppError("Authorization Error: Only the user assigned to the task can update its status", 403);
  }

  if (!status) {
    throw new AppError("All fields are required.", 400);
  }

  if (!validStatuses.includes(status.toLowerCase())) {
    throw new AppError("Status must be one of: pending, in-progress, completed", 400);
  }

  //checking for passing the same status as the current status
  if (task.status === status) {
    throw new AppError(`Task is already marked as ${status}`, 400);
  }

  await updateTaskStatus(taskId, status);

  return {
    ...task,
    status: status,
  };
};

//unassign task service

export const unassignTaskService = async (taskId, currentUserId) => {
  const task = await fetchTaskById(taskId);
  if (!task) {
    throw new AppError("Task not found", 404);
  }

  if (task.assignedBy !== currentUserId) {
    throw new AppError("Only the assigner can unassign this task", 403);
  }

  const updated = await unassignTask(taskId);
  if (!updated) {
    throw new AppError("Failed to unassign task", 500);
  }

  return true;
};

//delete task service

export const deleteTaskByAssigner = async (taskId, userId) => {
  const task = await fetchTaskById(taskId);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  if (task.assignedBy !== userId) {
    throw new AppError("Only the assigner can delete this task", 403);
  }
  
  const deletedTask = await deleteTask(taskId);
  return true;
};
