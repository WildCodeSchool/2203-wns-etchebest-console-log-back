import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const user = {
  name: 'Jane Doe',
  hash: 'pass',
  email: 'email@email.fr',
};

const ticket = {
  title: 'Ticket 1',
};

const project = {
  name: 'Projet 1',
  status: 'NOT STARTED',
};

const load = async () => {
  console.log('Start seeding');
  try {
    await prisma.user.create({
      data: user,
    });
    await prisma.project.create({
      data: project,
    });
    await prisma.ticket.create({
      data: ticket,
    });
    console.log('Seeding done');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
