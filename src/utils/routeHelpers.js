function isActiveRoute(route, pathname) {
  return pathname === route.path || pathname.startsWith(`${route.path}/`);
}
module.exports = { isActiveRoute: isActiveRoute };