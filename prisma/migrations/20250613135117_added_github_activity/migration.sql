-- CreateTable
CREATE TABLE "GitHubActivity" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "githubEventId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "action" TEXT,
    "actorUsername" TEXT NOT NULL,
    "actorAvatarUrl" TEXT,
    "summary" TEXT NOT NULL,
    "targetUrl" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GitHubActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "GitHubActivity_githubEventId_key" ON "GitHubActivity"("githubEventId");

-- CreateIndex
CREATE INDEX "GitHubActivity_projectId_idx" ON "GitHubActivity"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "GitHubActivity" ADD CONSTRAINT "GitHubActivity_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
