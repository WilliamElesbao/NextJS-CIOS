'use client';

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type User = {
  id: string;
  name: string;
};

type Worker = {
  name: string;
};

type Attachment = {
  id: number;
  filename: string;
};

type Equipment = {
  id: number;
  description?: string;
  serialNumber?: string;
  equipmentCondition?: string;
  associated?: boolean;
  EquipmentType: {
    name: string;
  };
};

type Record = {
  id: number;
  responsibleManager?: string;
  ticketCode?: string;
  shift?: string;
  CreatedBy: User;
  UpdatedBy?: User;
  Borrower: Worker;
  DeliveredBy: Worker;
  Attachment: Attachment[];
  Equipment: Equipment[];
};

interface DashboardCardsProps {
  records: Record[];
}

function DashboardCards({ records }: DashboardCardsProps) {
  if (!records) return <div>Loading...</div>;

  const entryTypeData = records.reduce((acc, record) => {
    record.Equipment.forEach((equipment) => {
      acc[equipment.entryType] = (acc[equipment.entryType] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const borrowerData = records.reduce((acc, record) => {
    acc[record.Borrower.name] = (acc[record.Borrower.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const equipmentConditionData = records.reduce((acc, record) => {
    record.Equipment.forEach((equipment) => {
      const type = equipment.EquipmentType.name;
      const condition = equipment.equipmentCondition || 'Unknown';
      if (!acc[type]) acc[type] = { New: 0, Used: 0, Discard: 0 };
      acc[type][condition] = (acc[type][condition] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, Record<string, number>>);

  const associatedEquipmentData = records.reduce((acc, record) => {
    record.Equipment.forEach((equipment) => {
      console.log(equipment);
      if (equipment.isAssociated) {
        acc[record.Borrower.name] = (acc[record.Borrower.name] || 0) + 1;
      }
    });
    return acc;
  }, {} as Record<string, number>);

  const entryTypeChartData = {
    labels: Object.keys(entryTypeData),
    datasets: [
      {
        data: Object.values(entryTypeData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const borrowerChartData = {
    labels: Object.keys(borrowerData),
    datasets: [
      {
        data: Object.values(borrowerData),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  const equipmentConditionChartData = {
    labels: ['New', 'Used', 'Discard'],
    datasets: Object.keys(equipmentConditionData).map((type) => ({
      label: type,
      data: Object.values(equipmentConditionData[type]),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    })),
  };

  const associatedEquipmentChartData = {
    labels: Object.keys(associatedEquipmentData),
    datasets: [
      {
        data: Object.values(associatedEquipmentData),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-700">Equipamentos</h3>
        <p className="text-gray-700">Motivo de entrada</p>
        <Doughnut data={entryTypeChartData} />
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-700">
          Registros por comodatário
        </h3>
        <Pie data={borrowerChartData} />
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-700">
          Equipamentos associados por comodatário
        </h3>
        <Pie data={associatedEquipmentChartData} />
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg col-span-2">
        <h3 className="text-xl font-bold mb-4 text-gray-700">
          Quantidade de equipamentos por condição
        </h3>
        <div className="flex flex-wrap justify-between">
          {Object.keys(equipmentConditionData).map((type) => (
            <div key={type} className="mb-6">
              <h4 className="text-lg font-semibold mb-2 text-gray-600">
                {type}
              </h4>
              <Doughnut
                data={{
                  labels: ['New', 'Used', 'Discard'],
                  datasets: [
                    {
                      data: Object.values(equipmentConditionData[type]),
                      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    },
                  ],
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardCards;
