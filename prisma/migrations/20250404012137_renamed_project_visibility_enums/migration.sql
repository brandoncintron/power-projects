/*
  Warnings:

  - The values [public,private,university] on the enum `ProjectVisibility` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProjectVisibility_new" AS ENUM ('PUBLIC', 'PRIVATE', 'UNIVERSITY');
ALTER TABLE "Project" ALTER COLUMN "visibility" TYPE "ProjectVisibility_new" USING ("visibility"::text::"ProjectVisibility_new");
ALTER TYPE "ProjectVisibility" RENAME TO "ProjectVisibility_old";
ALTER TYPE "ProjectVisibility_new" RENAME TO "ProjectVisibility";
DROP TYPE "ProjectVisibility_old";
COMMIT;
