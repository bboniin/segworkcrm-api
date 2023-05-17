import { Request, Response } from 'express';
import { EditLeadService } from '../../services/Lead/EditLeadService';

class EditLeadController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        const { name, email, phone_number, table_id, value, observation } = req.body

        let photo = ""

        if (req.file) {
            photo = req.file.filename
        }

        let userId = req.userId

        const editLeadService = new EditLeadService

        const lead = await editLeadService.execute({
            name, email, phone_number, photo, userId, table_id, value: value ? parseFloat(value) : 0, observation, id
        })

        if (lead["photo"]) {
            lead["photo_url"] = "https://segworkcrm-data.s3.sa-east-1.amazonaws.com/" + lead["photo"];
        }

        return res.json(lead)
    }
}

export { EditLeadController }