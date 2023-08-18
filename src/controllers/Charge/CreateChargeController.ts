import { Request, Response } from 'express';
import { CreateChargeService } from '../../services/Charge/CreateChargeService';

class CreateChargeController {
    async handle(req: Request, res: Response) {
        const { name, value, lead_id, date_charge } = req.body

        let userId = req.userId

        const createChargeService = new CreateChargeService

        const charge = await createChargeService.execute({
            name, value, lead_id, date_charge, user_id: userId
        })

        return res.json(charge)
    }
}

export { CreateChargeController }