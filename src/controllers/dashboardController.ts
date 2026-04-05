import { Response } from 'express';
import * as dashboardService from '../services/dashboardService';
import { AuthRequest } from '../middleware/auth';

export const getSummary = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const summary = await dashboardService.getSummary(req.user.id);
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get summary', error });
  }
};
