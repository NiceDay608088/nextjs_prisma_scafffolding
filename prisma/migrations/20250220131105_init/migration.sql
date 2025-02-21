-- CreateTable
CREATE TABLE "t_scafford_users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "cdate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "t_scafford_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_scafford_books" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "user_id" INTEGER NOT NULL,
    "cdate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "t_scafford_books_pkey" PRIMARY KEY ("id")
);
