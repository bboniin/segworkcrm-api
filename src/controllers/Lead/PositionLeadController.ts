import { Request, Response } from 'express';
import { PositionLeadService } from '../../services/Lead/PositionLeadService';

class PositionLeadController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        const { table_id, label } = req.body

        let userId = req.userId

        const positionLeadService = new PositionLeadService

        const lead = await positionLeadService.execute({
            table_id, label, id
        })

        if (lead["photo"]) {
            lead["photo_url"] = "https://segworkcrm-data.s3.sa-east-1.amazonaws.com/" + lead["photo"];
        }

        return res.json(lead)
    }
}

export { PositionLeadController }