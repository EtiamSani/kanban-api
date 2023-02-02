BEGIN;

DROP TABLE IF EXISTS "card", "list", "tag", "have";

CREATE TABLE "card" (
"id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"description" TEXT NOT NULL,
"color" TEXT NOT NULL,
"position" TEXT NOT NULL,
"code_list" integer NOT NULL REFERENCES "list"("id"),
"created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
"updated_at" TIMESTAMPTZ
);

CREATE TABLE "list" (
"id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"name" TEXT NOT NULL,
"position" TEXT NOT NULL,
"created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
"updated_at" TIMESTAMPTZ
);


CREATE TABLE "tag" (
"id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"name"TEXT NOT NULL, 
"color" TEXT NOT NULL,
"created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
"updated_at" TIMESTAMPTZ
);

CREATE TABLE "have" (
"id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"code_card" integer NOT NULL REFERENCES "card"("id"),
"name" integer NOT NULL REFERENCES "tag"("id")
);




INSERT INTO "card" ("id","description","color","position") 
VALUES (1,'fefefefe','rouge','top : 50%'),
(2,'fefeaaddadfefe','bleu','top : 55%'),
(3,'fddededfefe','rose','top : 60%');

INSERT INTO "list" ("id","name","position") 
VALUES (1,'fefefefe','rouge','top : 50%'),
(2,'fefeaaddadfefe','bleu','top : 55%'),
(3,'fddededfefe','rose','top : 60%');

INSERT INTO "tag" ("id","name","color") 
VALUES (1,'fefefefe','rouge','top : 50%'),
(2,'fefeaaddadfefe','bleu','top : 55%'),
(3,'fddededfefe','rose','top : 60%');

INSERT INTO "have" ("id","code_card","name") 
VALUES (1,1,1),
(2,2,2),
(3,3,3);

ALTER TABLE "card" ADD FOREIGN KEY ("code_list") REFERENCES "list"("id");
ALTER TABLE "have" ADD FOREIGN KEY ("code_card") REFERENCES "card"("id");
ALTER TABLE "have" ADD FOREIGN KEY ("name") REFERENCES "tag"("id");

COMMIT;