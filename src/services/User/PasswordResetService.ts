import prismaClient from '../../prisma'
import { isAfter, addHours } from 'date-fns';
import { hash } from "bcryptjs"

interface BodyRequest {
    code: string;
    password: string;
}

class PasswordResetService {
    async execute({ code, password }: BodyRequest) {


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

        const hashedPassword = await hash(password, 8);

        await prismaClient.user.update({
            where: {
                email: passwordCode.user_email
            },
            data: {
                password: hashedPassword
            }
        })

        await prismaClient.passwordForgot.deleteMany({
            where: {
                code: code,
            },
        });

        return ({ message: "Senha alterada com sucesso" })


    }
}

export { PasswordResetService }