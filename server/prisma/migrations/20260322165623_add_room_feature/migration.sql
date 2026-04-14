/*
  Warnings:

  - You are about to drop the column `col` on the `Widget` table. All the data in the column will be lost.
  - You are about to drop the column `colSpan` on the `Widget` table. All the data in the column will be lost.
  - You are about to drop the column `row` on the `Widget` table. All the data in the column will be lost.
  - You are about to drop the column `rowSpan` on the `Widget` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "dashboardId" INTEGER,
    CONSTRAINT "Room_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Dashboard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "DashboardWidget" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dashboardId" INTEGER NOT NULL,
    "widgetId" INTEGER NOT NULL,
    "col" INTEGER NOT NULL,
    "row" INTEGER NOT NULL,
    "colSpan" INTEGER NOT NULL,
    "rowSpan" INTEGER NOT NULL,
    CONSTRAINT "DashboardWidget_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DashboardWidget_widgetId_fkey" FOREIGN KEY ("widgetId") REFERENCES "Widget" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Device" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'LOCAL',
    "capabilities" JSONB NOT NULL DEFAULT [],
    "state" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roomId" INTEGER,
    CONSTRAINT "Device_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Device" ("capabilities", "createdAt", "id", "name", "provider", "state", "type") SELECT "capabilities", "createdAt", "id", "name", "provider", "state", "type" FROM "Device";
DROP TABLE "Device";
ALTER TABLE "new_Device" RENAME TO "Device";
CREATE TABLE "new_Widget" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "deviceId" INTEGER,
    CONSTRAINT "Widget_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Widget" ("deviceId", "id", "title", "type") SELECT "deviceId", "id", "title", "type" FROM "Widget";
DROP TABLE "Widget";
ALTER TABLE "new_Widget" RENAME TO "Widget";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Room_dashboardId_key" ON "Room"("dashboardId");
