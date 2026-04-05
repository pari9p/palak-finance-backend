import { Response } from 'express';
import * as recordService from '../services/financialRecordService';
import { AuthRequest } from '../middleware/auth';

export const getAllRecords = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const records = await financialRecordService.getAllRecords(req.user.id, req.query);
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching records' });
  }
};

export const getRecordById = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { id } = req.params;
    const record = await recordService.getRecordById(parseInt(id as string), req.user.id);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get record', error });
  }
};

export const createRecord = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const record = await recordService.createRecord(req.body, req.user.id);
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create record', error });
  }
};

export const updateRecord = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { id } = req.params;
    const record = await recordService.updateRecord(parseInt(id as string), req.body, req.user.id);
    res.status(200).json(record);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update record', error });
  }
};

export const deleteRecord = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { id } = req.params;
    await recordService.deleteRecord(parseInt(id as string), req.user.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete record', error });
  }
};
