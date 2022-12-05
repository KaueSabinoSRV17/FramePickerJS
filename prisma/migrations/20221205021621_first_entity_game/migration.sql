-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "developer" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_name_key" ON "Game"("name");
