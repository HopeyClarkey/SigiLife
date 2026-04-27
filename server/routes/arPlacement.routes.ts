import { Router } from 'express';
import { PrismaClient } from '../prisma/prisma.client';

const router = Router();
const prisma = new PrismaClient();

// Save AR placement for current user
router.post('/', async (req, res) => {
  try {
    const { sigilId, posX, posY, posZ, rotationX, rotationY, rotationZ, rotationW } = req.body;
    const userId = req.body.userId; // Should come from authenticated session

    if (!sigilId || !posX || !posY || !posZ || !rotationX || !rotationY || !rotationZ || !rotationW) {
      return res.status(400).json({ error: 'All position and rotation fields required' });
    }

    // Find or create AR placement for this user
    const existingPlacement = await prisma.arPlacement.findUnique({
      where: { userId }
    });

    if (existingPlacement) {
      // Update existing placement
      const placement = await prisma.arPlacement.update({
        where: { id: existingPlacement.id },
        data: {
          sigilId,
          posX,
          posY,
          posZ,
          rotationX,
          rotationY,
          rotationZ,
          rotationW
        }
      });
      return res.json({ message: 'AR placement updated', placement });
    } else {
      // Create new placement
      const placement = await prisma.arPlacement.create({
        data: {
          userId,
          sigilId,
          posX,
          posY,
          posZ,
          rotationX,
          rotationY,
          rotationZ,
          rotationW
        }
      });
      return res.json({ message: 'AR placement saved', placement });
    }
  } catch (error) {
    console.error('Error saving AR placement:', error);
    res.status(500).json({ error: 'Failed to save AR placement' });
  }
});

// Get public AR placements (all users' placements)
router.get('/public', async (req, res) => {
  try {
    const placements = await prisma.arPlacement.findMany({
      include: {
        sigil: true,
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            picture: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    });

    res.json(placements);
  } catch (error) {
    console.error('Error fetching public AR placements:', error);
    res.status(500).json({ error: 'Failed to fetch AR placements' });
  }
});

// Get current user's AR placement
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const placement = await prisma.arPlacement.findUnique({
      where: { userId },
      include: {
        sigil: true,
        user: true
      }
    });

    if (!placement) {
      return res.json({ placed: false });
    }

    res.json({
      placed: true,
      placement
    });
  } catch (error) {
    console.error('Error fetching user AR placement:', error);
    res.status(500).json({ error: 'Failed to fetch AR placement' });
  }
});

export default router;