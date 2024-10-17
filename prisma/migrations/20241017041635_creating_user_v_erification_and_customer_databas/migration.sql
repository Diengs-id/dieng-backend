-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "email_verified_at" TIMESTAMP(3),
    "password" VARCHAR(255),
    "google_id" VARCHAR(255),
    "remember_token" VARCHAR(255),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_code" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "otp" VARCHAR(20) NOT NULL,
    "expired_at" TIMESTAMP(3),
    "is_email_verified" BOOLEAN NOT NULL,

    CONSTRAINT "verification_code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" SERIAL NOT NULL,
    "customer_name" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20),
    "picture" VARCHAR(255),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verification_code_email_key" ON "verification_code"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customer_user_id_key" ON "customer"("user_id");

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
