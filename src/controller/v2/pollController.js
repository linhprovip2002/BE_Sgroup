/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
import pollModel from '../../models/v2/knexPoll';
import userModel from '../../models/v2/knexUserModel';
import NotFoundError from '../../help/notFoundError.js';
class pollController {
  createPoll (req, res, next) {
    const now = new Date().now();
    try {
      const newPoll = new pollModel({
        name: req.body.name,
        question: req.body.question,
        user_id: req.user.id, // Example: User ID from authentication middleware
        createAt: now,
        option: req.body.option
      });
      console.log(newPoll);
      pollModel.createPoll(newPoll).then((result) => {
        // console.log("dô đây");
        return res.status(200).json('create poll successfully');
      }).catch(() => {
        throw new NotFoundError('create poll failed');
      });
    } catch (err) {
      next(err);
    }
  }

  async getAll (req, res, next) {
    try {
      const page = req.query.page || 1;
      const allPoll = await pollModel.getAll(page);
      // eslint-disable-next-line eqeqeq
      if (allPoll.length == 0) {
        throw new Error('Poll not found');
      }
      for (const poll of allPoll) {
        poll.createBy = await userModel.getNameById(poll.user_id);
      }
      // console.log(allPoll);
      res.status(200).json(allPoll);
    } catch (err) {
      next(err);
    }
  }

  async getDetail (req, res, next) {
    try {
      const poll = await pollModel.getById(req.params.id);
      if (!poll) {
        throw new Error('Poll not found');
      }
      // poll.createBy = await userModel.getNameById(poll.user_id);
      return res.status(200).json(poll);
    } catch (err) {
      next(err);
    }
  }

  async deletePoll (req, res, next) {
    try {
      const poll = await pollModel.deleteById(req.params.id);
      if (!poll) {
        throw new Error('Poll not found');
      }
      return res.status(200).json('delete poll successfully');
    } catch (err) {
      next(err);
    }
  }

  async votePoll (req, res, next) {
    const pollId = req.params.idPoll;
    const optionId = req.params.idOption;
    try {
      const option = await pollModel.getOptionById(optionId);
      if (!option) {
        throw new NotFoundError('Option not found');
      }

      const check = await pollModel.checkUserVote(optionId, req.user.id);
      if (check.length != 0) {
        throw new NotFoundError('User already vote');
      }
      pollModel.votePoll(optionId, req.user.id).then((result) => {
        return res.status(200).json('vote poll successfully');
      }).catch(() => {
        throw new NotFoundError('vote poll failed');
      });
    } catch (err) {
      next(err);
    }
  }

  async createOption (req, res, next) {
    const pollId = req.params.id;
    const optionText = req.body.option;
    try {
      const option = await pollModel.createOption(pollId, optionText);
      if (!option) {
        throw new NotFoundError('Option not found');
      }
      return res.status(200).json('create option successfully');
    } catch (err) {
      next(err);
    }
  }

  async updatePoll (req, res, next) {
    try {
      const newPoll = new pollModel({
        name: req.body.name,
        question: req.body.question,
        user_id: req.user.id // Example: User ID from authentication middleware
      });

      const poll = await pollModel.updatePoll(req.params.id, newPoll);
      if (!poll) {
        throw new NotFoundError('Poll not found');
      }
      return res.status(200).json('update poll successfully');
    } catch (err) {
      next(err);
    }
  }

  async deleteOption (req, res, next) {
    const optionId = req.params.id;
    try {
      const option = await pollModel.deleteOption(optionId);
      if (!option) {
        throw new NotFoundError('Option not found');
      }
      return res.status(200).json('delete option successfully');
    } catch (err) {
      next(err);
    }
  }

  async unVotePoll (req, res, next) {
    const pollId = req.params.idPoll;
    const optionId = req.params.idOption;
    const userId = req.user.id;
    try {
      const vote = await pollModel.getVoteByIdOption(optionId);
      if (!vote) {
        throw new NotFoundError('Vote not found');
      }
      const check = await pollModel.checkUserVote(optionId, userId);
      if (!check) {
        throw new NotFoundError('User not vote');
      }
      const unVote = await pollModel.unVotePoll(optionId, userId);
      if (!unVote) {
        throw new NotFoundError('Unvote failed');
      }
      return res.status(200).json('unvote poll successfully');
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new pollController();
