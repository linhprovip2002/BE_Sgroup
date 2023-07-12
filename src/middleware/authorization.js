import userModel from '../models/v2/knexUserModel.js';
import cacheService from '../service/cache.service.js';
export default function checkAuthorization (permission) {
  return function (req, res, next) {
    const idUser = req.user.id;
    cacheService.get('userPermission', idUser).then((result) => {
      if (result != null) {
        // console.log('get from cache');
        return result.includes(permission) ? next() : res.status(403).json({ error: 'Insufficient privileges.' });
      } else {
        const userRoles = req.user.role;
        // console.log('role' + userRoles);
        const hasPermission = userRoles.some((role) => {
          return userModel.findPermission(role).then((rolePermissions) => {
            // console.log(rolePermissions);
            if (rolePermissions) {
              const permissionNames = rolePermissions.map((row) => row.permission_name);
              // console.log(permissionNames);
              cacheService.set('userPermission', idUser, permissionNames);
              return permissionNames.includes(permission);
            }
            return false;
          });
        });
        if (hasPermission) {
          next();
        } else {
          res.status(403).json({ error: 'Insufficient privileges.' });
        }
      }
    });
  };
}
