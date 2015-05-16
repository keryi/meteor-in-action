@ProfileController = RouteController.extend
  layoutTemplate: 'profileLayout'
  waitOn: ->
    [
      Meteor.subscribe 'profiles', @params._id
      IRLibLoader.load '/jquery.fittext.js'
    ]
  template: 'profileDetail'
  yieldTemplates:
    'profileDetailLeft':
      to: 'left'
  data: ->
    Profiles.findOne _id: @params._id
