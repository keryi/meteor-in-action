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
  'click button.remove-workout': (e, t) ->
    if confirm 'Are you sure?'
      Workouts.remove $(e.currentTarget).data('id')
  'submit #add_workout_form': (e, t) ->
    e.preventDefault()
    Workouts.insert
      workoutAt: new Date
      distance: parseInt($('input#distance').val())

Template.workoutList.helpers
  workouts: ->
    return Workouts.find()

Template.distanceByMonthList.helpers
  distanceByMonth: ->
    return DistanceByMonth.find()
