import {Resend} from 'resend';
import {checkRateLimit, MailSend} from "@/shared/api";
import { sanitize } from "isomorphic-dompurify";
export const runtime = 'nodejs';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body: MailSend = await req.json()
        const cleanText = sanitize(body.description);
        if (body.hidden) {
            return Response.json({ error: "Bot detected" }, { status: 400 });
        }
        const ip =
            req.headers.get('x-forwarded-for')?.split(',')[0] ||
            'unknown';

        if (!checkRateLimit(ip)) {
            return Response.json(
                { error: "Too many requests" },
                { status: 429 }
            );
        }


        const {data, error} = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: 'vaironfop@mail.ru',
            subject: 'Баг-репорт',
            html: `
                <div>
                    <h1>Баг-репорт</h1>
                    <p><b>От:</b> ${body.contact}</p>
                    <p><b>Описание проблемы:</b></p>
                    <p>${cleanText}</p>
                </div>
            `
        });

        if (error) {
            return Response.json({error}, {status: 500});
        }

        return Response.json(data);
    } catch (error) {
        console.log(error)
        return Response.json({error}, {status: 500});
    }
}