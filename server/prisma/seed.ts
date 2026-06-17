import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const alice = await prisma.user.create({
    data: {
      email: 'alice@test.com',
      name: 'Alice Doe',
      role: 'ADMIN',
    },
  });

  const bob = await prisma.user.create({
    data: {
      email: 'bob@test.com',
      name: 'John Bob',
      role: 'MEMBER',
    },
  });

  await prisma.post.create({
    data: {
      authorId: alice.id, // or bob.id
      title: 'Dummy Origami 1',
      body: {
        type: 'doc',
        content: [{ type: 'paragraph', content: [{ type: 'text', text: '???' }] }],
      },
      section: 'ORIGAMI', // or 'ORIGAMI'
      status: 'PUBLISHED', // or 'DRAFT'
    },
  });

  await prisma.post.create({
    data: {
      authorId: alice.id, // or bob.id
      title: 'Dummy Origami 2',
      body: {
        type: 'doc',
        content: [{ type: 'paragraph', content: [{ type: 'text', text: '???' }] }],
      },
      section: 'ORIGAMI', // or 'ORIGAMI'
      status: 'PUBLISHED', // or 'DRAFT'
    },
  });

  await prisma.post.create({
    data: {
      authorId: bob.id, // or bob.id
      title: 'Dummy Crochet 1',
      body: {
        type: 'doc',
        content: [{ type: 'paragraph', content: [{ type: 'text', text: '???' }] }],
      },
      section: 'CROCHET', // or 'ORIGAMI'
      status: 'PUBLISHED', // or 'DRAFT'
    },
  });

  await prisma.post.create({
    data: {
      authorId: bob.id, // or bob.id
      title: 'Dummy Crochet 2',
      body: {
        type: 'doc',
        content: [{ type: 'paragraph', content: [{ type: 'text', text: '???' }] }],
      },
      section: 'CROCHET', // or 'ORIGAMI'
      status: 'PUBLISHED', // or 'DRAFT'
    },
  });

  await prisma.post.create({
    data: {
      authorId: alice.id, // or bob.id
      title: 'Dummy Crochet 3',
      body: {
        type: 'doc',
        content: [{ type: 'paragraph', content: [{ type: 'text', text: '???' }] }],
      },
      section: 'CROCHET', // or 'ORIGAMI'
      status: 'PUBLISHED', // or 'DRAFT'
    },
  });

  await prisma.post.create({
    data: {
      authorId: bob.id, // or bob.id
      title: 'Dummy Origami 3',
      body: {
        type: 'doc',
        content: [{ type: 'paragraph', content: [{ type: 'text', text: '???' }] }],
      },
      section: 'ORIGAMI', // or 'ORIGAMI'
      status: 'DRAFT', // or 'DRAFT'
    },
  });

  await prisma.post.create({
    data: {
      authorId: bob.id, // or bob.id
      title: 'Dummy Crochet 4',
      body: {
        type: 'doc',
        content: [{ type: 'paragraph', content: [{ type: 'text', text: '???' }] }],
      },
      section: 'CROCHET', // or 'ORIGAMI'
      status: 'PUBLISHED', // or 'DRAFT'
    },
  });

  await prisma.post.create({
    data: {
      authorId: alice.id, // or bob.id
      title: 'Dummy Origami 4',
      body: {
        type: 'doc',
        content: [{ type: 'paragraph', content: [{ type: 'text', text: '???' }] }],
      },
      section: 'ORIGAMI', // or 'ORIGAMI'
      status: 'PUBLISHED', // or 'DRAFT'
    },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
