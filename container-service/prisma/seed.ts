import 'dotenv/config';
import { randomUUID } from 'node:crypto';
import {
  PrismaClient,
  STATUS_CONTAINER,
} from '../src/infrastructure/database/prisma/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { fakerPT_BR as faker } from '@faker-js/faker';

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.container.deleteMany();
  for (let i = 0; i < 10; i++) {
    const containers = Array.from({ length: 10 }, () => ({
      id: randomUUID(),
      shipId: randomUUID(),
      terminalId: randomUUID(),
      originCountry: faker.location.country(),
      destinationCountry: faker.location.country(),
      cargoType: faker.commerce.productMaterial(),
      statusContainer: STATUS_CONTAINER.PENDING_DOCUMENTATION,
      arrivalDate: faker.date.recent(),
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
    }));
    await prisma.container.createMany({ data: containers });
  }
}

main()
  .then(async () => {
    console.log('🌱 Database seeded');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
