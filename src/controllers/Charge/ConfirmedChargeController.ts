import { Request, Response } from 'express';
import { ConfirmedChargeService } from '../../services/Charge/ConfirmedChargeService';

class ConfirmedChargeController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        let userId = req.userId

        const confirmedChargeService = new ConfirmedChargeService

        const charge = await confirmedChargeService.execute({
            id, user_id: userId
        })

        return res.json(charge)
    }
}

export { ConfirmedChargeController }