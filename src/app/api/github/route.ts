import { Octokit } from "octokit";

export async function GET({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) {
  const octokit = new Octokit({});
}
