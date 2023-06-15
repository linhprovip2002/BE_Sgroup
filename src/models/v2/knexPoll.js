import { query } from 'express';
import poolKnex from '../../config/knex';
import res from 'express/lib/response';

const pollModel = function (poll) {
    this.name = poll.name;
    this.user_id = poll.user_id;
    this.question = poll.question;
    this.createAt = poll.createAt;
    this.option = poll.option
    }

    pollModel.createPoll = function (newPoll) {
        return new Promise((resolve, reject) => {
          poolKnex.transaction(async (trx) => {
            try {
              const [pollID] = await trx('poll').insert({
                user_id: newPoll.user_id,
                name: newPoll.name,
                question: newPoll.question,
                createAt: newPoll.createAt
              });
      
              const optionRecords = newPoll.option.map((option) => ({
                poll_id: pollID,
                option_text: option,
              }));
      
              await trx('option').insert(optionRecords);
              await trx.commit();
      
              resolve(newPoll);
            } catch (error) {
              await trx.rollback();
              reject(error);
            }
          });
        });
      };
    pollModel.getAll = function (page) {
      console.log(page);
      if (page == 1) {
        return new Promise((resolve, reject) => {
          poolKnex('poll')
            .select('*')
            .then((users) => {
              resolve(users);
            })
            .catch((err) => {
              reject(err);
            });
        });
      } else {
        const limit = 2; // Number of values per page
        const offset = (page - 1) * limit;
        return new Promise((resolve, reject) => {
          poolKnex('poll')
            .select('*')
            .limit(limit)
            .offset(offset)
            .then((users) => {
              resolve(users);
            })
            .catch((err) => {
              reject(err);
            });
        });
      }
    };
    // pollModel.getById = function (Id) {
    //   return new Promise((resolve, reject) => {
    //     poolKnex.transaction(async (trx) => {
    //       try {
    //         const poll = await trx('poll').where('poll_id', Id).first();
    //         if (!poll) {
    //           throw new Error('Poll not found');
    //         }
    //         const options = await trx('option').where('poll_id', Id);
    //         console.log(options);
    //         const result = {
    //           ...poll,
    //           options: options.map((option) => ({'option_id': option.option_id  ,'option_text': option.option_text})),
    //         };
    //         resolve(result);
    //       } catch (error) {
    //         reject(error);
    //       }
    //     });
    //   });
    // };
    pollModel.getById = function (Id) {
      return new Promise((resolve, reject) => {
        poolKnex.transaction(async (trx) => {
          try {
            const poll = await trx('poll').where('poll_id', Id).first();
            if (!poll) {
              throw new Error('Poll not found');
            }
            const options = await trx('option').where('poll_id', Id);
            
            const optionIds = options.map((option) => option.option_id);
            const voteCounts = await trx('votes')
              .select('option_id', trx.raw('COUNT(*) as voteCount'))
              .whereIn('option_id', optionIds)
              .groupBy('option_id');
            
            const optionsWithVotes = options.map((option) => {
              const voteCount = voteCounts.find((vote) => vote.option_id === option.option_id);
              return {
                option_id: option.option_id,
                option_text: option.option_text,
                voteCount: voteCount ? voteCount.voteCount : 0,
              };
            });
    
            const result = {
              ...poll,
              options: optionsWithVotes,
            };
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      });
    };
    pollModel.deleteById = function (Id) {
      return new Promise((resolve, reject) => {
        poolKnex('poll').where('poll_id', Id).del()
        .then((poll) => {
          resolve(poll);
        })
        .catch((err) => {
          reject(err);
        });
      });
    };
    pollModel.votePoll = function (IdOption,IdUser) {
      return new Promise((resolve, reject) => {
        poolKnex('votes').insert({
          option_id: IdOption,
          user_id: IdUser
        })
        .then((poll) => {
          resolve(poll);
        })
        .catch((err) => {
          reject(err);
        });
      });
    };
    pollModel.getOptionById = function (Id) {
      // console.log("get option by id" + Id);
      return new Promise((resolve, reject) => {
        poolKnex('option').where('poll_id', Id)
        .then((poll) => {
          // console.log("success" + poll);
          resolve(poll);
        })
        .catch((err) => {
          reject(err);
        });
      });
    };
    pollModel.getVoteByIdOption = function (Id) {
      // console.log("get vote by id option" + Id);
      return new Promise((resolve, reject) => {
        poolKnex('votes').where('option_id', Id)
        .then((poll) => {
          console.log(poll[0]);
          resolve(poll[0]);
        })
        .catch((err) => {
          reject(err);
        });
      });
    };

    pollModel.checkUserVote = function (IdOption,IdUser) {
      // console.log(idVote,IdUser);
      return new Promise((resolve, reject) => {
        poolKnex('votes').where('option_id', IdOption).andWhere('user_id',IdUser)
        .then((poll) => {
          // console.log(poll);
          resolve(poll);
        })
        .catch((err) => {
          reject(false);
        });
      });
    };

    pollModel.countVoteByUser = function (idVote) {
      return new Promise((resolve, reject) => {
        poolKnex('votes').where('user_id', idVote)
        .then((poll) => {
          resolve(poll);
        })
        .catch((err) => {
          reject(err);
        });
      });
    };
    pollModel.createOption = function (pollId,optionText)
    {
       return new Promise((resolve, reject) => {
        poolKnex('option').insert({
          poll_id: pollId,
          option_text: optionText
        })
        .then((poll) => {
          resolve(poll);
        }
        )
        .catch((err) => {
          reject(err);
        }
        );
      });
    };
    pollModel.updatePoll = function (Id,newPoll) {
      return new Promise((resolve, reject) => {
        poolKnex('poll').where('poll_id', Id).update({
          name: newPoll.name,
          question: newPoll.question
        })
        .then((poll) => {
          resolve(poll);
        })
        .catch((err) => {
          reject(err);
        });
      });
    };
    pollModel.deleteOption = function (Id) {
      return new Promise((resolve, reject) => {
        poolKnex('option').where('option_id', Id).del()
        .then((poll) => {
          resolve(poll);
        })
        .catch((err) => {
          reject(err);
        });
      });
    };
    pollModel.unVotePoll = function (IdOption,IdUser) {
      return new Promise((resolve, reject) => {
        poolKnex('votes').where('option_id', IdOption).andWhere('user_id',IdUser).del()
        .then((poll) => {
          resolve(poll);
        })
        .catch((err) => {
          reject(err);
        });
      });
    };  

module.exports = pollModel;