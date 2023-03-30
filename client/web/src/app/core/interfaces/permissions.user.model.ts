/**
 * @property app: indicates the unique app id
 * @property appCode: indicate the string value for app code - this is the base permissions for view and access the available menus
 * @property permissions: indicate the string values for app permissions - this will determinate if the user has access to particular actions inside the screens
 */
interface userPermissions {
  app: string;
  appCode: string;
  permissions: Array<string>;
}
