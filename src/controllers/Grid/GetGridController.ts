import { Request, Response } from 'express';
import { GetGridService } from '../../services/Grid/GetGridService';

class GetGridController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        let userId = req.userId

        const getGridService = new GetGridService

        const grid = await getGridService.execute({
            id, userId
        })


        grid.tables.map((data) => {
            data.leads.map((item) => {
                if (item["photo"]) {
                    item["photo_url"] = "https://segworkcrm-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
                }
            })
        })


        return res.json(grid)
    }
}

export { GetGridController }