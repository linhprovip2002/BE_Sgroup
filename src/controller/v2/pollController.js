import pollModel from '../../models/v2/knexPoll';
import userModel from '../../models/v2/knexUserModel';
class pollController{
    createPoll (req, res,next) {
        // console.log(req.body.question);
        try
        {   
            const newPoll = new pollModel({
                name: req.body.name,
                question: req.body.question,
                user_id: req.user.id, // Example: User ID from authentication middleware
                createAt: new Date(),
                option: req.body.option,
              });
                // console.log(newPoll);
              pollModel.createPoll(newPoll).then((result) => {
                return res.status(200).json('create poll successfully');
                }).catch(() => {
                throw new NotFoundError('create poll failed');
                });
        }catch(err){
            next(err);
    }
}
    async getAll (req, res, next) {
        try{
            const page = req.query.page || 1;
            const allPoll = await pollModel.getAll(page);
            if (allPoll.length == 0) {
                throw new Error('Poll not found');
            }
            for (let poll of allPoll)
            {
                poll.createBy = await userModel.getNameById(poll.user_id);
            }
            console.log(allPoll);
            res.status(200).json(allPoll);
    }catch(err){
        next(err);
    }
}

    async getDetail (req, res, next) {
        try{
            const poll = await pollModel.getById(req.params.id);
            if (!poll) {
                throw new Error('Poll not found');
            }
            poll.createBy = await userModel.getNameById(poll.user_id);
            return res.status(200).json(poll); 
    } catch(err){
        next(err);
    }
    }
}

module.exports = new pollController();