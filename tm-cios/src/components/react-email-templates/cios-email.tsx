import { configDataTableColumnsEmail } from '@/lib/constants';
import { ExtendsRecords } from '@/lib/definitions';
import {
  capitalizeName,
  formatDateToBr,
  getFirstAndLastName,
} from '@/lib/utils';
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import Link from 'next/link';

interface CiosEmailProps {
  data: ExtendsRecords | null;
}

export const CiosEmail = ({ data }: CiosEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>[Notificação TMSA - CIOS]</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="bg-white border border-[#eee] rounded-lg shadow-md my-5 mx-auto p-[20px] max-w-[800px]">
            {/* Email header */}
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              <div>
                <Img
                  src={`https://portal.tmsa.ind.br/portal/assets/img/logos/logo-login.png`}
                  width={60}
                  height={60}
                  alt="CIOS"
                  className="my-0 mx-auto rounded-full"
                />
              </div>
              <div>
                <strong>TMSA - C•I•O•S</strong>
              </div>
              <div>
                <strong>C</strong>heck <strong>I</strong>n & <strong>O</strong>
                ut <strong>S</strong>ystem
              </div>
            </Heading>

            {/* Greetings */}
            <Text className="text-black text-[14px] leading-[24px]">
              Olá {capitalizeName(getFirstAndLastName(data?.Borrower.name!))},
            </Text>

            {/* Check-in */}
            {data!.Equipment.filter((equipment) => equipment.flow === 'checkIn')
              .length > 0 && (
              <>
                <Section>
                  <Text className="text-black text-[14px] leading-[24px] mt-12">
                    Na data,{' '}
                    <strong>{formatDateToBr(data?.deliveryAt!)}</strong>, no
                    turno da{' '}
                    <strong>
                      {data?.shift === 'morning' && 'Manhã'}
                      {data?.shift === 'afternoon' && 'Tarde'}
                    </strong>
                    , o{' '}
                    <strong>
                      {capitalizeName(
                        getFirstAndLastName(data?.Borrower.name!),
                      )}
                    </strong>
                    , entregou à TI{' '}
                    {data?.DeliveredBy.name !== data?.Borrower.name
                      ? `através do colaborador, ${capitalizeName(
                          getFirstAndLastName(data?.DeliveredBy.name!),
                        )}, os equipamentos:`
                      : `os equipamentos: `}
                  </Text>

                  {/* Header from email table */}
                  <Row className="font-semibold text-left text-sm">
                    {configDataTableColumnsEmail.map((config) => (
                      <Column
                        key={config.value}
                        className={`min-w-[${config.width}] w-[${config.width}] text-xs`}
                      >
                        {config.name}
                      </Column>
                    ))}
                  </Row>

                  <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

                  {/* Body from email table */}
                  {data!.Equipment.filter(
                    (equipment) => equipment.flow === 'checkIn',
                  ).map((equipment) => (
                    <>
                      <Row key={equipment.id} className="text-left text-sm">
                        <Column className="min-w-[100px] w-[100px]">
                          {equipment.EquipmentType.name || 'N/A'}
                        </Column>
                        <Column className="min-w-[200px] w-[200px]">
                          {equipment.description || 'N/A'}
                        </Column>
                        <Column className="min-w-[100px] w-[100px] text-xs">
                          {equipment.patrimonyNumber || 'N/A'}
                        </Column>
                        <Column className="min-w-[120px] w-[120px] text-xs">
                          {equipment.serialNumber || 'N/A'}
                        </Column>
                        <Column className="min-w-[100px] w-[100px] text-xs">
                          {equipment.equipmentCondition || 'N/A'}
                        </Column>
                        <Column className="min-w-[100px] w-[100px] text-xs">
                          {equipment.entryType || 'N/A'}
                        </Column>
                        <Column className="min-w-[150px] w-[150px] text-xs">
                          {equipment.observations || 'N/A'}
                        </Column>
                      </Row>
                      <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                    </>
                  ))}
                </Section>
              </>
            )}

            {/* Check-out */}
            {data!.Equipment.filter(
              (equipment) => equipment.flow === 'checkOut',
            ).length > 0 && (
              <>
                <Section>
                  <Text className="text-black text-[14px] leading-[24px] mt-12">
                    A TI entregou para,{' '}
                    <strong>
                      {capitalizeName(
                        getFirstAndLastName(data?.Borrower.name!),
                      )}
                    </strong>
                    , na data,{' '}
                    <strong>{formatDateToBr(data?.deliveryAt!)}</strong>, no
                    turno da{' '}
                    <strong>
                      {data?.shift === 'morning' && 'Manhã'}
                      {data?.shift === 'afternoon' && 'Tarde'}
                    </strong>
                    ,{' '}
                    {data?.DeliveredBy.name !== data?.Borrower.name
                      ? `através do colaborador, ${capitalizeName(
                          getFirstAndLastName(data?.DeliveredBy.name!),
                        )}, os equipamentos:`
                      : ` os equipamentos:`}
                  </Text>

                  {/* Header from email table */}
                  <Row className="font-semibold text-left text-sm">
                    {configDataTableColumnsEmail.map((config) => (
                      <Column
                        key={config.value}
                        className={`min-w-[${config.width}] w-[${config.width}] text-xs`}
                      >
                        {config.name}
                      </Column>
                    ))}
                  </Row>

                  <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

                  {/* Body from email table */}
                  {data!.Equipment.filter(
                    (equipment) => equipment.flow === 'checkOut',
                  ).map((equipment) => (
                    <>
                      <Row className="text-left text-sm">
                        <Column className="min-w-[100px] w-[100px]">
                          {equipment.EquipmentType.name || 'N/A'}
                        </Column>
                        <Column className="min-w-[200px] w-[200px]">
                          {equipment.description || 'N/A'}
                        </Column>
                        <Column className="min-w-[100px] w-[100px] text-xs">
                          {equipment.patrimonyNumber || 'N/A'}
                        </Column>
                        <Column className="min-w-[120px] w-[120px] text-xs">
                          {equipment.serialNumber || 'N/A'}
                        </Column>
                        <Column className="min-w-[100px] w-[100px] text-xs">
                          {equipment.equipmentCondition || 'N/A'}
                        </Column>
                        <Column className="min-w-[100px] w-[100px] text-xs">
                          {equipment.entryType || 'N/A'}
                        </Column>
                        <Column className="min-w-[150px] w-[150px] text-xs">
                          {equipment.observations || 'N/A'}
                        </Column>
                      </Row>
                      <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                    </>
                  ))}
                </Section>
              </>
            )}

            {/* Warning */}
            <Section className="bg-zinc-300 text-zinc-800 border p-1 rounded-md">
              <Text className="text-[12px] leading-[24px] m-1">
                <strong>TMSA - Check In & Out System:</strong> Se alguma das
                informações deste e-mail estiverem incorretas ou divergente,
                você deve entrar em contato com o departamento de TI através do{' '}
                <a href={'http://sati.tmsa.ind.br'}>
                  SATI (http://sati.tmsa.ind.br)
                </a>{' '}
                para que as devidas correções sejam realizadas.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default CiosEmail;
