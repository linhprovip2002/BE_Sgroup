import userModel from '../models/v2/knexUserModel.js';

export default function checkAuthorization (permission) {
  return function (req, res, next) {
    const userRoles = req.user.role;
    // console.log('role' + userRoles);
    const hasPermission = userRoles.some((role) => {
      return userModel.findPermission(role).then((rolePermissions) => {
        console.log(rolePermissions);
        if (rolePermissions) {
          const permissionNames = rolePermissions.map((row) => row.permission_name);
          // console.log(permissionNames);
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
  };
}
