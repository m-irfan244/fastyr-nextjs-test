import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@radix-ui/react-dialog";
import { Card, CardContent } from "../ui/card";
import { X } from "lucide-react"; // Import X icon for close button
import Image from "next/image";
import { Photo } from "@/types/common";

interface PhotoCardProps {
  photo: Photo;
}

export function PhotoCard({ photo }: PhotoCardProps) {
  console.log(photo, 'photo')
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-2">
            <div className="relative aspect-square">
              <Image
                src={photo.thumbnailUrl}
                alt={photo.title}
                unoptimized={true}
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
        <DialogTitle className="sr-only">
          {photo.title}
        </DialogTitle>
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <div className="relative aspect-square w-full">
          <Image
            src={photo.url}
            unoptimized={true}
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