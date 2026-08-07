import { loadEnvFile } from 'node:process';
import {
  PrismaClient,
  STATUS_CONTAINER,
} from '../src/container/infrastructure/persistence/database/prisma/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { fakerPT_BR as faker } from '@faker-js/faker';

loadEnvFile('.env');

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.container.deleteMany();
  for (let i = 0; i < 50; i++) {
    const containers = {
      id: faker.string.uuid(),
      shipId: faker.string.uuid(),
      terminalId: faker.string.uuid(),
      originCountry: faker.location.country(),
      destinationCountry: faker.location.country(),
      cargoType: faker.commerce.productMaterial(),
      statusContainer: faker.helpers.arrayElement(
        Object.values(STATUS_CONTAINER),
      ),
      arrivalDate: faker.date.recent(),
    };
    await prisma.container.createMany({ data: containers });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
