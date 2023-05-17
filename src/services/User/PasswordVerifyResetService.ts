import prismaClient from '../../prisma'
import { isAfter, addHours } from 'date-fns';

interface BodyRequest {
    code: string;
}

class PasswordVerifyResetService {
    async execute({ code }: BodyRequest) {

        const passwordCode = await prismaClient.passwordForgot.findFirst({
            where: {
                code: code,
            },
        });

        if (!passwordCode) {
            throw new Error('Código inválido!');
        }

        const dateCreated = passwordCode.create_at;
        const dateLimit = addHours(dateCreated, 2);

        const isCodeExpired = isAfter(new Date(), dateLimit);

        if (isCodeExpired) {
            throw new Error('Código expirou!');
        }

        const user = await prismaClient.user.findFirst({
            where: {
                email: passwordCode.user_email
            }
        })

        return (user)

    }
}

export { PasswordVerifyResetService }