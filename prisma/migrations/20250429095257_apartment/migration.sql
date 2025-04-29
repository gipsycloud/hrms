-- CreateTable
CREATE TABLE "Apartment" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "apartment_no" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Apartment_pkey" PRIMARY KEY ("id")
);
