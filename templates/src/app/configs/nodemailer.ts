import nodemailer from 'nodemailer';


export const smtp = (host: string, port: number, user: string, pass: string) => {
   const transport = nodemailer.createTransport({
        port,
        host,
        auth: {
            user,
            pass
        }
    });

    return transport
}