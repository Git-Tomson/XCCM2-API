import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const id = "6967db4b60352b1da97ded62"; // ex: 65a1e9...

  await prisma.invitation.delete({
    where: { id }
  });

  console.log("Invitation supprimée avec succès");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
