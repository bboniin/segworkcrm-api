import { Request, Response } from 'express';
import { ListRecurrencesService } from '../../services/Recurrence/ListRecurrencesService';

class ListRecurrencesController {
    async handle(req: Request, res: Response) {
        const { lead_id } = req.params

        let userId = req.userId

        const listRecurrencesService = new ListRecurrencesService

        const services = await listRecurrencesService.execute({
            lead_id, user_id: userId
        })

        return res.json(services)
    }
}

export { ListRecurrencesController }