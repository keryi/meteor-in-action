Meteor.publish 'distanceByMonth', ->
  subscription = this;

  db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;

  pipeline = [
    $group:
      _id:
        $month: '$workoutAt'
      distance:
        $sum: '$distance'
  ]

  db.collection('workouts').aggregate pipeline,
  Meteor.bindEnvironment (err, result) ->
    console.log result
    _.each result, (r) ->
      subscription.added 'distanceByMonth', r._id, { distance: r.distance }

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
