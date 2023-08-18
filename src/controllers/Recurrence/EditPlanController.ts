import { Request, Response } from 'express';
import { EditPlanService } from '../../services/Recurrence/EditPlanService';

class EditPlanController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        const { name, value, period_in_days } = req.body

        let userId = req.userId

        const editPlanService = new EditPlanService

        const plan = await editPlanService.execute({
            id, name, value: value ? parseFloat(value) : 0, period_in_days: period_in_days ? parseInt(period_in_days) : 0, user_id: userId
        })

        return res.json(plan)
    }
}

export { EditPlanController } 