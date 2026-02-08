/*
  Warnings:

  - You are about to drop the column `noPrice` on the `Orders` table. All the data in the column will be lost.
  - Added the required column `price` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Orders` DROP COLUMN `noPrice`,
    ADD COLUMN `price` DECIMAL(65, 30) NOT NULL;
