import { Request, Response } from 'express';
import { EditUserService } from '../../services/User/EditUserService';

class EditUserController {
    async handle(req: Request, res: Response) {
        const { name, email, phone_number, password } = req.body

        let photo = ""

        if (req.file) {
            photo = req.file.filename
        }

        let userId = req.userId

        const editUserService = new EditUserService

        const user = await editUserService.execute({
            name, email, phone_number, photo, password, userId
        })

        if (user["photo"]) {
            user["photo_url"] = "https://segworkcrm-data.s3.sa-east-1.amazonaws.com/" + user["photo"];
        }

        return res.json(user)
    }
}

export { EditUserController }