/*
  Warnings:

  - The primary key for the `VerificationToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `VerificationToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[identifier,token]` on the table `VerificationToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identifier` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `VerificationToken__id_token_key` ON `VerificationToken`;

-- AlterTable
ALTER TABLE `VerificationToken` DROP PRIMARY KEY,
    DROP COLUMN `_id`,
    ADD COLUMN `identifier` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `VerificationToken_identifier_token_key` ON `VerificationToken`(`identifier`, `token`);
