import { Router } from 'express';
import { chatHandler, conversationsHandler, historyHandler} from '../controllers/chat.controller';

const router = Router();

router.post('/message', chatHandler);
router.get('/history/:sessionId', historyHandler);
router.get('/conversations', conversationsHandler);

export default router;
