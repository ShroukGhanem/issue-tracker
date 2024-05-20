/*
  Warnings:

  - You are about to drop the column `describtion` on the `issue` table. All the data in the column will be lost.
  - Added the required column `description` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `issue` DROP COLUMN `describtion`,
    ADD COLUMN `description` TEXT NOT NULL;
