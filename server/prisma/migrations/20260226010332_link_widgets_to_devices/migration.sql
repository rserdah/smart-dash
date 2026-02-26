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
    "rowSpan" INTEGER NOT NULL,
    "deviceId" INTEGER,
    CONSTRAINT "Widget_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Widget" ("col", "colSpan", "id", "row", "rowSpan", "title", "type") SELECT "col", "colSpan", "id", "row", "rowSpan", "title", "type" FROM "Widget";
DROP TABLE "Widget";
ALTER TABLE "new_Widget" RENAME TO "Widget";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
