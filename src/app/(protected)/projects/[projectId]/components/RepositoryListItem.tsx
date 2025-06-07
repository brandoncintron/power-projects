"use client";

import { formatDistanceToNow } from "date-fns";
import { LuGitBranch, LuLock, LuStar } from "react-icons/lu";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import type { RepositoryListItemProps } from "../types/types";

export function RepositoryListItem({ 
  repository, 
  isSelected, 
  onSelect 
}: RepositoryListItemProps) {
  const formatLanguageColor = (language: string | null) => {
    // Simple color mapping for common languages
    const colors: Record<string, string> = {
      JavaScript: "bg-yellow-500",
      TypeScript: "bg-blue-500",
      Python: "bg-green-500",
      Java: "bg-orange-500",
      "C++": "bg-blue-600",
      Go: "bg-cyan-500",
      Rust: "bg-orange-600",
      Ruby: "bg-red-500",
      PHP: "bg-purple-500",
      Swift: "bg-orange-400",
      Kotlin: "bg-purple-600",
      Dart: "bg-blue-400",
    };
    
    return colors[language || ""] || "bg-gray-500";
  };

  return (
    <div
      className={cn(
        "p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md",
        isSelected 
          ? "border-primary bg-primary/5 shadow-sm" 
          : "border-border hover:border-primary/50"
      )}
      onClick={() => onSelect(repository)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          {/* Repository Name and Visibility */}
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-foreground truncate">
              {repository.name}
            </h3>
            {repository.private && (
              <LuLock className="h-4 w-4 text-muted-foreground" />
            )}
          </div>

          {/* Description */}
          {repository.description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {repository.description}
            </p>
          )}

          {/* Repository Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {repository.language && (
              <div className="flex items-center gap-1">
                <div 
                  className={cn("w-3 h-3 rounded-full", formatLanguageColor(repository.language))}
                />
                <span>{repository.language}</span>
              </div>
            )}
            
            <div className="flex items-center gap-1">
              <LuStar className="h-3 w-3" />
              <span>{repository.stargazers_count}</span>
            </div>

            <div className="flex items-center gap-1">
              <LuGitBranch className="h-3 w-3" />
              <span>{repository.forks_count}</span>
            </div>

            <span>
              Updated {formatDistanceToNow(new Date(repository.updated_at), { addSuffix: true })}
            </span>
          </div>
        </div>

        {/* Selection Indicator */}
        {isSelected && (
          <Badge variant="default" className="ml-3">
            Selected
          </Badge>
        )}
      </div>
    </div>
  );
} 