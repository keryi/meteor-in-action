Meteor.publish 'profiles', ->
  profiles = Meteor.wrapAsync((cb) ->
    Meteor.setTimeout (->
      cb null, Profiles.find()
      return
    ), 1000
    return
  )()
  profiles
