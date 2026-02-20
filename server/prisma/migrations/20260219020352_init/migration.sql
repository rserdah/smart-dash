/*
  Warnings:

  - Added the required column `col` to the `Widget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colSpan` to the `Widget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `row` to the `Widget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rowSpan` to the `Widget` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Widget" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "col" INTEGER NOT NULL,
    "row" INTEGER NOT NULL,
    "colSpan" INTEGER NOT NULL,
    "rowSpan" INTEGER NOT NULL
);
INSERT INTO "new_Widget" ("id", "title", "type") SELECT "id", "title", "type" FROM "Widget";
DROP TABLE "Widget";
ALTER TABLE "new_Widget" RENAME TO "Widget";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
