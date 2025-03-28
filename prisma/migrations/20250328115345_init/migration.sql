/*
  Warnings:

  - You are about to drop the column `id_user` on the `note` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Note_id_user_fkey` ON `note`;

-- AlterTable
ALTER TABLE `note` DROP COLUMN `id_user`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
