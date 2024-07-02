import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface CardsProps {
  notebooks: {
    title: string;
    quantity: number;
    description: string;
  };
  workstations: {
    title: string;
    quantity: number;
    description: string;
  };
  monitors: {
    title: string;
    quantity: number;
    description: string;
  };
}

export function Cards({ cardsContent }: { cardsContent: CardsProps }) {
  const cardsArray = Object.values(cardsContent);

  return (
    <>
      {cardsArray.map((equipmentType, index) => (
        <Card key={index} x-chunk={`dashboard-05-chunk-${index}`}>
          <CardHeader className="pb-2">
            <CardDescription>{equipmentType.title}</CardDescription>
            <CardTitle className="text-4xl">{equipmentType.quantity}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {equipmentType.description}
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
