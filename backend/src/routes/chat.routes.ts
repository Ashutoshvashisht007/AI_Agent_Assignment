import { Router } from 'express';
import { chatHandler, historyHandler} from '../controllers/chat.controller';

const router = Router();

router.post('/message', chatHandler);
router.get('/history/:sessionId', historyHandler);

export default router;
