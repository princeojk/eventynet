/*
  Warnings:

  - A unique constraint covering the columns `[question]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Event_question_key` ON `Event`(`question`);
