import { Request, Response } from 'express';
import { EditChargeService } from '../../services/Charge/EditChargeService';

class EditChargeController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        const { name, value,  date_charge } = req.body

        let userId = req.userId

        const editChargeService = new EditChargeService

        const charge = await editChargeService.execute({
            id, name, value,  date_charge, user_id: userId
        })

        return res.json(charge)
    }
}

export { EditChargeController } 