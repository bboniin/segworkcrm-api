import { Request, Response } from 'express';
import { CreateLeadService } from '../../services/Lead/CreateLeadService';

class CreateLeadController {
    async handle(req: Request, res: Response) {
        const { name, email, phone_number, table_id, value, observation } = req.body

        let photo = ""

        if (req.file) {
            photo = req.file.filename
        }

        let userId = req.userId

        const createLeadService = new CreateLeadService

        const lead = await createLeadService.execute({
            name, email, phone_number, photo, table_id, userId, value: value ? parseFloat(value) : 0, observation
        })

        if (lead["photo"]) {
            lead["photo_url"] = "https://segworkcrm-data.s3.sa-east-1.amazonaws.com/" + lead["photo"];
        }

        return res.json(lead)
    }
}

export { CreateLeadController }