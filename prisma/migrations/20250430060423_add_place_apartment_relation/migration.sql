-- AlterTable
ALTER TABLE "Apartment" ADD COLUMN     "placeId" TEXT;

-- CreateIndex
CREATE INDEX "Apartment_placeId_idx" ON "Apartment"("placeId");

-- AddForeignKey
ALTER TABLE "Apartment" ADD CONSTRAINT "Apartment_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;
