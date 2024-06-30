import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface CardFields {
  title: string;
  quantity: string;
  description: string;
}

interface CardsProps {
  cardsContent: Array<CardFields>;
}

export function Cards({ cardsContent }: CardsProps) {
  return (
    <>
      {cardsContent.map((content, index) => (
        <Card key={index} x-chunk={`dashboard-05-chunk-${index}`}>
          <CardHeader className="pb-2">
            <CardDescription>{content.title}</CardDescription>
            <CardTitle className="text-4xl">{content.quantity}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {content.description}
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
