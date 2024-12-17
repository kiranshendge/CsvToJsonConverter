-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "address" JSONB,
    "additionalInfo" JSONB,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
