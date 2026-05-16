-- AlterTable
ALTER TABLE "Review" ADD COLUMN "editedAt" DATETIME;
ALTER TABLE "Review" ADD COLUMN "deletedAt" DATETIME;

-- Rebuild unique index so a reviewer can leave one review per completed worker per job.
DROP INDEX IF EXISTS "Review_jobId_reviewerId_key";
CREATE UNIQUE INDEX "Review_jobId_reviewerId_revieweeId_key" ON "Review"("jobId", "reviewerId", "revieweeId");