import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export type IEmail = {
    to: string,
    subject: string,
    template: string,
    user?: string
}


export const sendEmailByDefaultAccount = async(email: IEmail) => {
    resend.emails.send({
        from: `${email.user}<leya@savanapoint.com>`,
        to: email.to,
        subject: email.subject,
        html: `${email.template}`
      });
}