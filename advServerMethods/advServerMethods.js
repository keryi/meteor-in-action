if (Meteor.isClient) {
  Template.methods.events({
    'click #callWrapAsyncMethod': function () {
      Meteor.call('wrapAsyncMethod');
    }
  });
}

var setTimeout3sCb = function(value, cb) {
  var result = value;
  Meteor.setTimeout(function() {
    console.log('Result after 3 seconds: ' + result);
    cb(null, result + 3);
  }, 3000);
}

if (Meteor.isServer) {
  Meteor.methods({
    wrapAsyncMethod: function() {
      var result = 0;
      console.log('Calling wrapAsync method...');
      result = Meteor.wrapAsync(setTimeout3sCb)(result);
      console.log('Result of wrapAsync method: ' + result);
      return result;
    }
  })
}
