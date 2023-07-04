// prisma/prisma.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "mysql://root:root@localhost:3306/db_crud",
    },
  },
});

export default prisma;
