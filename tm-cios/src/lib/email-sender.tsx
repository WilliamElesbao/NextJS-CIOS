import CiosEmail from '@/components/react-email-templates/cios-email';
import { render } from '@react-email/components';
import { createTransport } from 'nodemailer';
import { fetchRecordById } from './data';
import { prisma } from '@/services/db/prisma';

const transporter = createTransport({
  host: String(process.env.EMAIL_SERVER_HOST),
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: String(process.env.EMAIL_SERVER_USER),
    pass: String(process.env.EMAIL_SERVER_PASSWORD),
  },
});

export const sendBookingEmail = async (recordId: number) => {
  try {
    const dataForEmail = await fetchRecordById(recordId);
    if (!dataForEmail) throw new Error('Record not found');

    const emailHtml = render(<CiosEmail data={dataForEmail} />);

    // uncomment this line to send email to the manager

    // const managerName = dataForEmail?.Borrower.manager;
    // let managerEmail: { email: string | null } | null = null;
    // if (managerName) {
    //   managerEmail = await prisma.worker.findFirst({
    //     where: { name: managerName },
    //     select: { email: true },
    //   });
    //   console.log(managerEmail?.email);
    // }

    const supervisorName = dataForEmail.DeliveredBy.supervisor;
    console.log(supervisorName);
    let supervisorEmail: { email: string | null } | null = null;
    console.log(supervisorEmail);
    if (supervisorName) {
      supervisorEmail = await prisma.worker.findFirst({
        where: { name: supervisorName },
        select: { email: true },
      });
      console.log(supervisorEmail?.email);
    }

    const emailSendSettings = {
      from: { name: `CIOS`, address: process.env.EMAIL_FROM },
      to: Array.from(
        new Set(
          [dataForEmail.Borrower.email, dataForEmail.DeliveredBy.email].filter(
            (email) => email,
          ),
        ),
      ),

      // uncomment this line to send email to the manager
      // cc: managerEmail?.email ? [managerEmail.email] : [],
      cc: supervisorEmail?.email ? [supervisorEmail.email] : [],
      subject: `TMSA - C•I•O•S - Check In & Out System`,
      html: emailHtml,
    };

    const info = await transporter.sendMail(emailSendSettings as any);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};
