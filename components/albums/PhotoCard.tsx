import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { Card, CardContent } from "../ui/card";
import Image from "next/image"
import { Photo } from "@/types/common";

interface PhotoCardProps {
    photo: Photo;
  }
  
  export function PhotoCard({ photo }: PhotoCardProps) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-2">
              <div className="relative aspect-square">
                <Image
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <p className="mt-2 text-sm text-muted-foreground truncate">
                {photo.title}
              </p>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <div className="relative aspect-square w-full">
            <Image
              src={photo.url}
              alt={photo.title}
              fill
              className="object-contain"
            />
          </div>
          <p className="mt-2 text-center">{photo.title}</p>
        </DialogContent>
      </Dialog>
    );
  }