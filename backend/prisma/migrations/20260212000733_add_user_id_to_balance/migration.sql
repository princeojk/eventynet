/*
  Warnings:

  - Added the required column `userId` to the `Balance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Balance` ADD COLUMN `userId` INTEGER NOT NULL;
