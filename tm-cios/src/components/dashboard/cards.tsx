import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { EquipmentsType } from '@prisma/client';

type CardContentDetail = {
  title: string;
  quantity: number;
  description: string;
};

interface CardsProps {
  cardsContent: CardContentDetail[];
  equipmentType: Pick<EquipmentsType, 'name' | 'description'>[];
  condition: 'new' | 'used';
}

export function Cards({ cardsContent, equipmentType }: CardsProps) {
  return (
    <>
      {equipmentType.map((equipment, index) => {
        const card = cardsContent.find(
          (card) => card.title === equipment.name,
        ) || {
          quantity: 0,
          description: 'Total disponível',
        };

        return (
          <Card key={index} x-chunk={`dashboard-05-chunk-${index}`}>
            <CardHeader className="pb-2 capitalize">
              <CardDescription>{equipment.name}</CardDescription>
              <CardTitle className="text-4xl">{card.quantity}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                {card.description}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
