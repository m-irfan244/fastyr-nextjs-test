'use client'
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Users,
  Album
} from "lucide-react";

type SidebarProps = React.HTMLAttributes<HTMLDivElement>

 interface IProps  extends  SidebarProps{
  OpenSidebar: (value: boolean) => void
 }
 

export function Sidebar({ className, OpenSidebar }: IProps) {
  const pathname = usePathname();

  const routes = [
 
    {
      label: "Users",
      icon: Users,
      href: "/users",
      color: "text-violet-500",
    },
    {
      label: "Albums",
      icon: Album,
      href: "/albums",
      color: "text-pink-700",
    }
  ];

  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Overview
          </h2>
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={pathname === route.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname === route.href && "bg-muted"
                )}
                asChild
              >
                <Link href={route.href} onClick={() => OpenSidebar(false)}>
                  <route.icon className={cn("mr-2 h-4 w-4", route.color)} />
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
       
      </div>
    </div>
  );
}
