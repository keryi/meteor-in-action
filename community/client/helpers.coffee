Template.registerHelper 'isActiveRoute', (routeName) ->
  if Router.current().route.getName() is routeName
    'active'
