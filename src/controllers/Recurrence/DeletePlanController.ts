import { Request, Response } from 'express';
import { DeletePlanService } from '../../services/Recurrence/DeletePlanService';

class DeletePlanController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const deletePlanService = new DeletePlanService

        const plan = await deletePlanService.execute({
            id
        })

        return res.json(plan)
    }
}

export { DeletePlanController }