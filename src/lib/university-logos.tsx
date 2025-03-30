import React from "react";
import Image from "next/image";

export interface UniversityOption {
  name: string;
  value: string;
  domain: string;
}

// List of universities with their domains
export const universities: UniversityOption[] = [
  { name: "University of Central Florida", value: "ucf", domain: "ucf.edu" },
  { name: "University of Florida", value: "uf", domain: "ufl.edu" },
  { name: "Florida State University", value: "fsu", domain: "fsu.edu" },
  { name: "University of Miami", value: "miami", domain: "miami.edu" },
  { name: "Florida International University", value: "fiu", domain: "fiu.edu" },
  { name: "University of South Florida", value: "usf", domain: "usf.edu" },
  { name: "Florida Atlantic University", value: "fau", domain: "fau.edu" },
];

interface UniversityLogoProps {
  domain: string;
  size?: number;
  className?: string;
}

/**
 * Component to display a university logo using Clearbit's Logo API
 */
export const UniversityLogo: React.FC<UniversityLogoProps> = ({ 
  domain, 
  size = 20,
  className = "" 
}) => {
  const logoUrl = `https://logo.clearbit.com/${domain}`;
  
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <Image 
        src={logoUrl}
        alt={`Logo for ${domain}`}
        width={size}
        height={size}
        className="rounded-sm"
      />
    </div>
  );
}; 