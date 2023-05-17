import prismaClient from '../../prisma'
import IsEmail from '../../utils/isEmail';
import { resolve } from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import handlebars from "handlebars";

interface InviteRequest {
    email: string;
    name: string;
    id: string;
    userId: string
}

class InviteGridService {
    async execute({name, email, id, userId }: InviteRequest) {

        if (!name || !email || !id || !userId) {
            throw new Error("Email, nome e Id do quadro é obrigatório")
        }

        const grid = await prismaClient.grid.findUnique({
            where: {
                id: id
            },
            include: {
                user: true
            }
        })

        const inviteGrid = await prismaClient.gridInvitations.findFirst({
            where: {
                grid_id: id,
                email: email
            },
        })

        if (!grid) {
            throw new Error("Este quadro não existe mais")
        }

        if(grid.team.indexOf(userId) != -1 || inviteGrid){
            throw new Error("Este colaborador já está na equipe ou já foi convidado")
        }

        if (grid["user"].email == email) {
            throw new Error("Você não pode convidar você mesmo")
        }

        if(!IsEmail(email)){
            throw new Error("Email é inválido")
        }
        
        const user = await prismaClient.user.findUnique({
            where: {
                email: email
            }
        })

        const gridInvitation = await prismaClient.gridInvitations.create({
            data: {
                name: user ? user.name : name,
                grid_id: id,
                email: email,
                status: "enviado"
            }
        })

        if(user){
        const path = resolve(
            __dirname,
            "..",
            "..",
            "views",
            "inviteGrid.hbs"
        );

        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        const templateParse = handlebars.compile(templateFileContent);

        const templateHTML = templateParse({
            grid: grid["name"],
            code: gridInvitation["id"],
            name: user["name"],
        });

        var transport = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: "leonardo@guruseg.com.br",
                pass: "suimoooumyjdbqct",
            },
        });

        await transport.sendMail({
            from: {
                name: "Equipe SegWorkCRM",
                address: "leonardo@guruseg.com.br",
            },
            to: {
                name: user["name"],
                address: email,
            },
            subject: "[SegWorkCRM] Convite para o Quadro",
            html: templateHTML,
        });
        }else{
            const path = resolve(
                __dirname,
                "..",
                "..",
                "views",
                "inviteGridNewUser.hbs"
            );
    
            const templateFileContent = fs.readFileSync(path).toString("utf-8");
    
            const templateParse = handlebars.compile(templateFileContent);
    
            const templateHTML = templateParse({
                grid: grid["name"],
                code: gridInvitation["id"],
                name: name,
            });
    
            var transport = await nodemailer.createTransport({
                host: "smtp.gmail.com",
                service: "gmail",
                port: 465,
                secure: true,
                auth: {
                    user: "leonardo@guruseg.com.br",
                    pass: "suimoooumyjdbqct",
                },
            });
    
            await transport.sendMail({
                from: {
                    name: "Equipe SegWorkCRM",
                    address: "leonardo@guruseg.com.br",
                },
                to: {
                    name: name,
                    address: email,
                },
                subject: "[SegWorkCRM] Convite para o Quadro",
                html: templateHTML,
            });
        }

        return (gridInvitation)
    }
}

export { InviteGridService }