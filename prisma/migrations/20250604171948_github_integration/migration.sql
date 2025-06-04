-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "githubConnectedAt" TIMESTAMP(3),
ADD COLUMN     "githubRepoName" TEXT,
ADD COLUMN     "githubRepoOwner" TEXT,
ADD COLUMN     "githubRepoUrl" TEXT;

-- CreateIndex
CREATE INDEX "Account_userId_provider_idx" ON "Account"("userId", "provider");
