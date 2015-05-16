@HomeController = RouteController.extend
  waitOn: ->
    Meteor.subscribe 'profiles'
  template: 'home'
  data: ->
    { profiles: Profiles.find({}, {limit: 10}) }
