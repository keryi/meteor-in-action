Iron.Router.plugins.membersonly = (router, options) ->
  router.onBeforeAction (->
    unless Meteor.userId()
      @render @lookupOption 'membersOnlyTpl'
    else
      @next
  ), options
