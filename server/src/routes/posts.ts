import { Router } from 'express';
import { PrismaClient, Section, Status } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const section = req.query.section as string | undefined;

  const where = section
    ? { section: section as Section, status: Status.PUBLISHED }
    : { status: Status.PUBLISHED };

  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.post.count({ where }),
  ]);

  res.json({ posts, total, page, limit });
});

export default router;
