import { ApplicationTypeCard } from "./ApplicationTypeCard";
import { CompletionDateCard } from "./CompletionDateCard";
import { DatabasesCard } from "./DatabasesCard";
import { FrameworksCard } from "./FrameworksCard";

interface ProjectDetailsCardProps {
  applicationType: string;
  frameworks?: string[];
  databases?: string[];
  completionDate: Date | null;
}

export function ProjectDetailsCard({
  applicationType,
  frameworks,
  databases,
  completionDate,
}: ProjectDetailsCardProps) {
  return (
    <div className="p-6 bg-card border rounded-md">
      <h2 className="text-xl font-semibold mb-4">Project Details</h2>
      <div className="space-y-4">
        {/* Application Type */}
        <ApplicationTypeCard applicationType={applicationType as string} />

        {/* Frameworks & Technologies */}
        {frameworks && frameworks.length > 0 && (
          <FrameworksCard frameworks={frameworks} />
        )}

        {/* Databases */}
        {databases && databases.length > 0 && (
          <DatabasesCard databases={databases} />
        )}

        {/* Completion Date */}
        <CompletionDateCard completionDate={completionDate} />
      </div>
    </div>
  );
}
