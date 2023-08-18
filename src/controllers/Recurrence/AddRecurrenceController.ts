import { Request, Response } from 'express';
import { AddRecurrenceService } from '../../services/Recurrence/AddRecurrenceService';

class AddRecurrenceController {
    async handle(req: Request, res: Response) {
        const { lead_id } = req.params
        const { plan_id } = req.body
        
        let userId = req.userId

        const addRecurrenceService = new AddRecurrenceService

        const addRecurrence = await addRecurrenceService.execute({
             lead_id, user_id: userId, plan_id
        })

        return res.json(addRecurrence)
    }
}

export { AddRecurrenceController }