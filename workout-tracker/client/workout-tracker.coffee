Session.setDefault 'limit', 10

Tracker.autorun (computation) ->
  Meteor.subscribe 'workouts', {
    limit: Session.get 'limit'
  }

Template.workoutList.events
  'click button#show_more': (e, t) ->
    newLimit = Session.get('limit') + 10
    Session.set 'limit', newLimit
