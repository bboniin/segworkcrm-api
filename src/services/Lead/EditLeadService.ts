import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface LeadRequest {
    name: string;
    email: string;
    photo: string;
    phone_number: string;
    userId: string;
    observation: string;
    value: number;
    id: string;
    table_id: string;
}

class EditLeadService {
    async execute({ name, id, table_id, userId, email, phone_number, photo, observation, value }: LeadRequest) {

        if (!name || !table_id || !userId) {
            throw new Error("Nome é obrigatório")
        }

        let data = {
            name: name,
            user_id: userId,
            table_id: table_id,
            email: email,
            observation: observation,
            value: value,
            phone_number: phone_number
        }

        if (photo) {
            const s3Storage = new S3Storage()

            const upload = await s3Storage.saveFile(photo)

            data["photo"] = upload
        }

        const lead = await prismaClient.lead.update({
            where: {
                id: id,
            },
            data: data,
        })

        return (lead)
    }
}

export { EditLeadService }