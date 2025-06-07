import express from 'express';
import VotesController from '../controllers/VotesController';

const votesRouter = express.Router();

votesRouter.get('/comment/:commentId/counts', VotesController.getCommentVoteCounts);
votesRouter.get('/', VotesController.getAllVotes);
votesRouter.get('/comment/:commentId', VotesController.getCommentVotes);
votesRouter.get('/user/:userId/received-votes', VotesController.getUserReceivedVotes);

export default votesRouter;