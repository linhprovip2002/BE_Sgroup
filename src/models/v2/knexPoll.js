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
    pollModel.getById = function (Id) {
      return new Promise((resolve, reject) => {
        poolKnex.transaction(async (trx) => {
          try {
            const poll = await trx('poll').where('poll_id', Id).first();
            if (!poll) {
              throw new Error('Poll not found');
            }
            const options = await trx('option').where('poll_id', Id);
            const result = {
              ...poll,
              options: options.map((option) => option.option_text),
            };
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      });
    };
module.exports = pollModel;