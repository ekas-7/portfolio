import React from "react";
import Link from "next/link";
import { 
  Home, 
  PencilIcon, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import ModeToggle from "./ui/mode-toggle";

const DATA = {
  navbar: [
    { href: "#", icon: Home, label: "Home" },
    { href: "#", icon: PencilIcon, label: "Blog" },
  ],
  contact: {
    social: {
      GitHub: { name: "GitHub", url: "#", icon: Github },
      LinkedIn: { name: "LinkedIn", url: "#", icon: Linkedin },
      X: { name: "Twitter", url: "#", icon: Twitter },
      Email: { name: "Email", url: "#", icon: Mail },
    },
  },
};

const DockItem = React.memo(({ 
  href, 
  icon: Icon, 
  label 
}: { 
  href: string; 
  icon: React.ElementType; 
  label: string; 
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          aria-label={label}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition-transform group relative"
          )}
        >
          <Icon className="w-5 h-5 transition-transform group-hover:rotate-6" />
          <div 
            className={cn(
              "absolute inset-0 bg-white/20 rounded-full opacity-0",
              "group-hover:opacity-100 transition-opacity duration-300",
              "-z-10 scale-75 group-hover:scale-100"
            )}
          />
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
));

const Separator = () => (
  <div className="h-8 w-px bg-white/20 mx-2" aria-hidden="true" />
);

const GlassDock = () => (
    <div 
      className={cn(
        "fixed bottom-4 left-1/2 transform -translate-x-1/2",
        "bg-black/10 backdrop-blur-md rounded-full p-2 shadow-lg z-50", // Lower opacity here
        "w-auto hover:bg-black/20 transition-all duration-500" // Lower hover opacity
      )}
    >
      <div className="flex items-center space-x-2">
        {/* Navigation Items */}
        {DATA.navbar.map((item) => (
          <DockItem 
            key={item.label} 
            href={item.href} 
            icon={item.icon} 
            label={item.label} 
          />
        ))}
  
        {/* Separator */}
        <Separator />
  
        {/* Social Links */}
        {Object.entries(DATA.contact.social).map(([name, social]) => (
          <DockItem 
            key={name} 
            href={social.url} 
            icon={social.icon} 
            label={social.name} 
          />
        ))}
  
        {/* Separator */}
        <Separator />
  
        {/* Theme Toggle */}
        <div className="w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition-transform">
          <ModeToggle />
        </div>
      </div>
    </div>
  );

export default GlassDock;
