import { Activity, CircleUser, GitCommit, MessageSquare, GitPullRequest, Github } from "lucide-react";


export const getActivityIcon = (type: string) => {
    switch (type) {
      case "comment":
        return <MessageSquare size={16} className="text-blue-500" />;
      case "commit":
        return <GitCommit size={16} className="text-green-500" />;
      case "pr":
        return <GitPullRequest size={16} className="text-purple-500" />;
      case "issue":
        return <Github size={16} className="text-orange-500" />;
      case "join":
        return <CircleUser size={16} className="text-purple-500" />;
      default:
        return <Activity size={16} className="text-gray-500" />;
    }
  };