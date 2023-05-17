import { Request, Response } from 'express';
import { ReportLeadsService } from '../../services/Lead/ReportLeadsService';

class ReportLeadsController {
    async handle(req: Request, res: Response) {

        let userId = req.userId

        const reportLeadsService = new ReportLeadsService

        const leads = await reportLeadsService.execute({
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

export { ReportLeadsController }