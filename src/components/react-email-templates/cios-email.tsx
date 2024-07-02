import { configDataTableColumnsEmail } from '@/lib/constants';
import { ExtendsRecords } from '@/lib/definitions';
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface CiosEmailProps {
  data: ExtendsRecords | null;
}

export const CiosEmail = ({ data }: CiosEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Preview</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="bg-white border border-[#eee] rounded-lg shadow-md my-5 mx-auto p-[20px] max-w-[800px]">
            {/* <Section className="mt-[32px]">
              <Img
                src={`/logos/logo.png`}
                width={60}
                height={60}
                alt="CIOS"
                className="my-0 mx-auto rounded-full"
              />
            </Section> */}
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              <strong>C</strong>heck <strong>I</strong>n & <strong>O</strong>ut{' '}
              <strong>S</strong>ystem
            </Heading>

            <Text className="text-black text-[14px] leading-[24px]">
              Olá {data?.Borrower.name},
            </Text>

            <Text className="text-black text-[14px] leading-[24px]">
              O seu usuário foi associado ao registro{' '}
              <strong>CIOS-{data?.id}/2024</strong> na plataforma{' '}
              <strong>C•I•O•S</strong>.
            </Text>

            <Text className="text-black text-[14px] leading-[24px]">
              Detalhes do registro:
            </Text>

            {/* Check-in */}
            {data!.Equipment.filter((equipment) => equipment.flow === 'checkIn')
              .length > 0 && (
              <>
                <Section>
                  <Text className="text-black text-[14px] leading-[24px] font-bold mt-12">
                    Materiais entregues à TI:
                  </Text>
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
                  <Text className="text-black text-[14px] leading-[24px] font-bold mt-12">
                    Materiais entregues pela TI:
                  </Text>
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

            <Section>
              <Text className="text-[#666666] text-[12px] leading-[24px]">
                Se não estiveres de acordo com alguma das informações acima,
                informe ao departamento de TI quais os dados que não estão de
                acordo neste e-mail.
              </Text>
              {/* <Text className="text-[#666666] text-[12px] leading-[24px]">
                Se não estiveres de acordo com alguma das informações acima,
                favor clicar no botão abaixo para ser redirecionado à plataforma
                de abertura de chamado (SATI), informando ao departamento de TI
                quais os dados que não estão de acordo neste e-mail.
              </Text> */}
            </Section>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            {/* <Section>
              <Button
                className="mx-0 w-full rounded bg-[#000000] py-3 text-center text-[12px] font-semibold text-white no-underline"
                href="#"
                target="_blank"
              >
                Não estou de acordo com uma ou mais informações deste e-mail
              </Button>
            </Section> */}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default CiosEmail;
