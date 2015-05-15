Router.configure
  layoutTemplate: 'layout'

Router.route '/',
  waitOn: ->
    Meteor.subscribe 'profiles'
  template: 'home'
  data: ->
    { profiles: Profiles.find({}, {limit: 10}) }

Router.route '/about', ->
  @render 'about'

Router.route '/profiles/:_id',
  layoutTemplate: 'profileLayout'
  waitOn: ->
    Meteor.subscribe 'profiles', @params._id
  template: 'profileDetail'
  yieldTemplates:
    'profileDetailLeft':
      to: 'left'
  data: ->
    Profiles.findOne _id: @params._id
