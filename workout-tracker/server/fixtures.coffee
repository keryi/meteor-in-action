Meteor.startup ->
  if Workouts.find().count() == 0
    _.times 50, (i) ->
      Workouts.insert
        workoutAt: new Date()
        distance: _.random 99
