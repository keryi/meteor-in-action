Meteor.publish 'distanceByMonth', ->
  subscription = this
  db = MongoInternals.defaultRemoteCollectionDriver().mongo.db
  distances = {}
  initiated = false

  pipeline = [
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

  workoutHandle = Workouts.find().observeChanges
    added: (id, fields) ->
      return unless initiated
      idByMonth = new Date(fields.workoutAt).getMonth() + 1
      distances[idByMonth] += fields.distance
      subscription.changed 'distanceByMonth', idByMonth,
      { distance: distances[idByMonth] }

  initiated = true

  subscription.ready()

Meteor.publish 'workouts', (options) ->
  check options, {
    limit: Number
  }

  qry = {}
  qryOptions =
    limit: options.limit
    sort:
      workoutAt: 1

  Workouts.find qry, qryOptions
