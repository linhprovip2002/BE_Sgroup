import pollController from '../../controller/v2/pollController';
import express from 'express';
import verify from '../../middleware/verify';
const route = express.Router();

route.delete('/:id/option', verify, pollController.deleteOption);// id option
route.post('/:id/option', verify, pollController.createOption);// id poll
route.post('/', verify, pollController.createPoll);
route.get('/', verify, pollController.getAll);
route.put('/:id', verify, pollController.updatePoll);
route.get('/:id', verify, pollController.getDetail);
route.delete('/:id', verify, pollController.deletePoll);
route.post('/:idPoll/vote/:idOption', verify, pollController.votePoll);
route.delete('/:idPoll/vote/:idOption', verify, pollController.unVotePoll);
module.exports = route;
