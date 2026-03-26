const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany();
    const repos = await prisma.repo.findMany();
    console.log("Users:", JSON.stringify(users, null, 2));
    console.log("Repos:", JSON.stringify(repos, null, 2));
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
