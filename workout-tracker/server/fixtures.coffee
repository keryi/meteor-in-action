Meteor.publish 'workouts', (options) ->
  check options, {
    limit: Number
  }

  qry = {}
  qryOptions =
    limit: options.limit
    sort:
      wortoutAt: 1

  Workouts.find qry, qryOptions
