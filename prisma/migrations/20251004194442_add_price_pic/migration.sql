/*
  Warnings:

  - Added the required column `pic` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Book" ADD COLUMN     "pic" TEXT NOT NULL,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL;
