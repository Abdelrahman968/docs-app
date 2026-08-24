"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { templates } from "@/constants/templates";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { toast } from "@/components/ui/toast";

const TemplateGallery = () => {
  const router = useRouter();

  const { isLoaded, isSignedIn } = useAuth();

  const create = useMutation(api.documents.createDocument);

  const [isCreating, setIsCreating] = useState<boolean>(false);

  const onTemplateClick = async (title: string, initialContent: string) => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.push("/login");
      return;
    }

    setIsCreating(true);

    create({ title, initialContent })
      .then((documentID) => {
        toast.add({
          type: "success",
          description: "Created document",
        });
        router.push(`/documents/${documentID}`);
      })
      .catch(() => {
        toast.add({
          type: "error",
          description: "Failed to create document",
        });
      })
      .finally(() => {
        setIsCreating(false);
      });
  };

  return (
    <div className="bg-[#F1F3F4]">
      <div className="max-w-7xl mx-auto px-16 py-6 flex flex-col gap-y-4">
        <h3 className="font-medium">Start a new Document</h3>

        <Carousel>
          <CarouselContent className="-ml-4">
            {templates.map(({ id, label, image }) => (
              <CarouselItem
                key={id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/7 pl-4"
              >
                <div
                  className={cn(
                    "aspect-3/4 flex flex-col gap-y-2.5",
                    isCreating && "pointer-events-none opacity-50",
                  )}
                >
                  <Button
                    disabled={isCreating || !isLoaded}
                    variant="ghost"
                    // TODO: add InitialContent
                    onClick={() => onTemplateClick(label, "")}
                    className="relative size-full overflow-hidden rounded-sm border bg-white transition hover:border-blue-500"
                  >
                    <Image
                      src={image}
                      alt={label}
                      className="absolute inset-0 size-full object-cover"
                      fill
                    />
                  </Button>

                  <p className="text-sm font-medium truncate text-center">
                    {label}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default TemplateGallery;
