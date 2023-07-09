import cacheService from '../service/cache.service';

module.exports = async (req, res, next) => {
  await next();
  if (req.params.id) {
    cacheService.delete(req.user.id);
  } else {
    cacheService.delete('users', 888);
  }
};
