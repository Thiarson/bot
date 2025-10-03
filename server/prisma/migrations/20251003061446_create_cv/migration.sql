-- CreateTable
CREATE TABLE "public"."cv" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cv_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "cv_user_id_idx" ON "public"."cv"("user_id");

-- AddForeignKey
ALTER TABLE "public"."cv" ADD CONSTRAINT "cv_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
