/*
  Warnings:

  - Made the column `roomKey` on table `Room` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roomKey" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dashboardId" INTEGER,
    CONSTRAINT "Room_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Room" ("dashboardId", "id", "name", "roomKey") SELECT "dashboardId", "id", "name", "roomKey" FROM "Room";
DROP TABLE "Room";
ALTER TABLE "new_Room" RENAME TO "Room";
CREATE UNIQUE INDEX "Room_roomKey_key" ON "Room"("roomKey");
CREATE UNIQUE INDEX "Room_dashboardId_key" ON "Room"("dashboardId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
