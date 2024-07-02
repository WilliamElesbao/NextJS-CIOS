import CiosEmail from '@/components/react-email-templates/cios-email';
import { render } from '@react-email/components';
import { createTransport } from 'nodemailer';
import { fetchRecordById } from './data';

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
  const dataForEmail = await fetchRecordById(recordId);

  const emailHtml = render(<CiosEmail data={dataForEmail} />);

  const emailSendSettings = {
    from: { name: `CIOS`, address: process.env.EMAIL_FROM! },
    to: [
      dataForEmail?.CreatedBy.email!,
      dataForEmail?.Borrower.email!,
      dataForEmail?.DeliveredBy.email!,
    ],
    subject: `C•I•O•S - Check In & Out System`,
    html: emailHtml,
  };

  try {
    const info = await transporter.sendMail(emailSendSettings!);
    console.log('sent message:::', info);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};
