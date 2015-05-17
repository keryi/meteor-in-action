if (Meteor.isClient) {
  Template.methods.events({
    'click #callWrapAsyncMethod': function () {
      Meteor.call('wrapAsyncMethod');
    },

    'click #callSequential': function() {
      Meteor.call('sequential', 'first', function(err, res) {
        console.log('Done first');
      });

      Meteor.call('sequential', 'second', function(err, res) {
        console.log('Done second');
      });
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

var block3s = function(value, cb) {
  Meteor.setTimeout(function() {
    cb(null, true);
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
    },

    sequential: function(val) {
      console.log('Calling wrapAsync method sequentially with val: ' + val);
      this.unblock();
      Meteor.wrapAsync(block3s)(val);
      console.log('Sequential method return val: ' + val);
    }
  });
}
