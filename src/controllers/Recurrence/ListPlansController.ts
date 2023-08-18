import { Request, Response } from 'express';
import { ListPlansService } from '../../services/Recurrence/ListPlansService';

class ListPlansController {
    async handle(req: Request, res: Response) {
        let userId = req.userId

        const listPlansService = new ListPlansService

        const plans = await listPlansService.execute({
            user_id: userId
        })

        return res.json(plans)
    }
}

export { ListPlansController }