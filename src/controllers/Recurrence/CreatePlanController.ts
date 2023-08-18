import { Request, Response } from 'express';
import { CreatePlanService } from '../../services/Recurrence/CreatePlanService';

class CreatePlanController {
    async handle(req: Request, res: Response) {
        const { name, value, period_in_days } = req.body

        let userId = req.userId

        const createPlanService = new CreatePlanService

        const plan = await createPlanService.execute({
            name, value: value ? parseFloat(value) : 0, period_in_days: period_in_days ? parseInt(period_in_days) : 0, user_id: userId
        })

        return res.json(plan)
    }
}

export { CreatePlanController }