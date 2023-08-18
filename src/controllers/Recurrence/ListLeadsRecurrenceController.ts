import { Request, Response } from 'express';
import { ListLeadsRecurrenceService } from '../../services/Recurrence/ListLeadsRecurrenceService';

class ListLeadsRecurrenceController {
    async handle(req: Request, res: Response) {
        let userId = req.userId

        const listLeadsRecurrenceService = new ListLeadsRecurrenceService

        const leadsRecurrence = await listLeadsRecurrenceService.execute({
            user_id: userId
        })

        return res.json(leadsRecurrence)
    }
}

export { ListLeadsRecurrenceController }