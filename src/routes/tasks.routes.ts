import express from 'express'
import { validateResource } from '../middleware/validateResource';
import { createTaskSchema } from '../schemas/tasks.schema';
import { createTaskHandler } from '../controller/tasks.controller';

export const tasksRouter = express.Router();

tasksRouter.post('/:userId', validateResource(createTaskSchema), createTaskHandler)