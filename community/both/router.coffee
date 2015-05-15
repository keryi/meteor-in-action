Router.configure
  layoutTemplate: 'layout'

Router.route '/', ->
  @render 'home',
    data: ->
      { profiles: Profiles.find() }

Router.route '/about', ->
  @render 'about'

Router.route '/profiles/:_id', ->
  profile = Profiles.findOne _id: @params._id
  @layout 'profileLayout'
  @render 'profileImage', {
    to: 'left',
    data: ->
      profile
  }
  @render 'profileDetail', {
    data: ->
      profile
  }
