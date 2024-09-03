'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { getImage } from '@/lib/actions';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function ImageComponent({ filename }: { filename: string }) {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    getImage(filename)
      .then((image) => setImageUrl(image))
      .catch((error) => console.error(error));
  }, [filename]);

  return (
    <>
      {imageUrl ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Image
              src={imageUrl}
              alt="Image"
              width={200}
              height={200}
              priority={true}
              unoptimized={true}
              className="rounded-xl cursor-pointer"
            />
          </AlertDialogTrigger>
          <AlertDialogContent className="w-auto h-auto">
            <Image
              src={imageUrl}
              alt="Image"
              width={750}
              height={750}
              priority={true}
              unoptimized={true}
              className="rounded-xl"
            />
            <AlertDialogFooter className="flex">
              <AlertDialogAction className="flex-1">Fechar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Skeleton className="h-20 w-20 rounded-xl" />
      )}
    </>
  );
}
