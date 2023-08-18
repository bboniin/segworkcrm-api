import { Request, Response } from 'express';
import { ListChargesService } from '../../services/Charge/ListChargesService';

class ListChargesController {
    async handle(req: Request, res: Response) {
        let userId = req.userId

        const listChargesService = new ListChargesService

        const charges = await listChargesService.execute({
            user_id: userId
        })

        return res.json(charges)
    }
}

export { ListChargesController }