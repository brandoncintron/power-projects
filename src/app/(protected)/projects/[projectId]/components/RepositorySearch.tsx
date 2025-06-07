"use client";

import { LuSearch } from "react-icons/lu";

import { Input } from "@/components/ui/input";

import type { RepositorySearchProps } from "../types/types";

export function RepositorySearch({ 
  value, 
  onChange, 
  placeholder = "Search repositories..." 
}: RepositorySearchProps) {
  return (
    <div className="relative">
      <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
} 