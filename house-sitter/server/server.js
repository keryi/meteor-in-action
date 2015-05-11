Meteor.startup(function() {
  if (Houses.find().count() == 0) {
    Houses.insert({
      name: 'Stephan',
      plants: [
        {color: 'red', instructions: '3 pots/week'},
        {color: 'white', instructions: 'keep humid'}
      ]
    });
  }
});
