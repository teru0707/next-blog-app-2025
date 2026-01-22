import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg"; // 更新

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

// const adapter = new PrismaBetterSqlite3({
//   url: process.env.DATABASE_URL || "file:./dev.db",
// });
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}