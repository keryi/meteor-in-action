Session.setDefault 'limit', 10

Tracker.autorun (computation) ->
  Meteor.subscribe 'workouts', {
    limit: Session.get 'limit'
  }
  Meteor.subscribe 'distanceByMonth'

Template.workoutList.events
  'click button#show_more': (e, t) ->
    newLimit = Session.get('limit') + 10
    Session.set 'limit', newLimit

Template.workoutList.helpers
  workouts: ->
    return Workouts.find()

Template.distanceByMonthList.helpers
  distanceByMonth: ->
    return DistanceByMonth.find()
