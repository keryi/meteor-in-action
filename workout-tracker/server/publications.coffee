Meteor.publish 'distanceByMonth', ->
  subscription = this
  db = MongoInternals.defaultRemoteCollectionDriver().mongo.db
  distances = {}
  initiated = false

  pipeline = [
    $match:
      userId: this.userId
    $group:
      _id:
        $month: '$workoutAt'
      distance:
        $sum: '$distance'
  ]

  db.collection('workouts').aggregate pipeline,
  Meteor.bindEnvironment (err, result) ->
    _.each result, (r) ->
      distances[r._id] = r.distance
      subscription.added 'distanceByMonth', r._id, { distance: r.distance }

  workoutHandle = Workouts.find({ userId: this.userId }).observeChanges
    added: (id, fields) ->
      return unless initiated
      idByMonth = new Date(fields.workoutAt).getMonth() + 1
      distances[idByMonth] += fields.distance
      subscription.changed 'distanceByMonth', idByMonth,
      { distance: distances[idByMonth] }

  initiated = true

  subscription.onStop ->
    workoutHandle.stop()

  subscription.ready()

Meteor.publish 'workouts', (options) ->
  check options, {
    limit: Number
  }

  qry =
    userId: this.userId
  qryOptions =
    limit: options.limit || 10
    sort:
      workoutAt: 1

  Workouts.find qry, qryOptions
