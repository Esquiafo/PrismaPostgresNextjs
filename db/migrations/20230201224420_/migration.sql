-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "image" TEXT,
    "title" TEXT NOT NULL,
    "description" JSONB[],
    "cantity" INTEGER,
    "price" DOUBLE PRECISION NOT NULL,
    "authenticity" INTEGER,
    "returnPolicy" INTEGER,
    "warranty" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sell" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "address" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "status" INTEGER,
    "sold" JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "surname" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Sell" ADD CONSTRAINT "Sell_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
