Meteor.startup ->
  if Profiles.find().count() == 0
    _.times 20, ->
      Profiles.insert
        name: Fake.user().name
        img: "http://lorempixel.com/200/200/people/"
        like: Fake.sentence()
        views: 0
