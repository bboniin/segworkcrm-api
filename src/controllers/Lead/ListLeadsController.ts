import { Request, Response } from 'express';
import { ListLeadsService } from '../../services/Lead/ListLeadsService';

class ListLeadsController {
    async handle(req: Request, res: Response) {

        let userId = req.userId

        const listLeadsService = new ListLeadsService

        const leads = await listLeadsService.execute({
            userId
        })

        leads.map((item) => {
            if (item["photo"]) {
                item["photo_url"] = "https://segworkcrm-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
            }
        })

        return res.json(leads)
    }
}

export { ListLeadsController }