Meteor.methods
  addWorkout: (distance) ->
    check distance, Number
    if distance <= 0 || distance > 45
      throw new Meteor.Error 'Invalid distance'

    unless this.userId
      throw new Meteor.Error 'Please login to proceed'

    workout =
      workoutAt: new Date
      userId: this.userId
      distance: distance
      type: 'jogging'

    return Workouts.insert workout
