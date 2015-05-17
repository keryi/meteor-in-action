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
    },

    'click #callGeoJsonForIp': function() {
      Meteor.call('geoJsonForIp', '8.8.8.8', function(err, res) {
        $('#geojson').html(JSON.stringify(res));
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

var apiCall = function(apiUrl, callback) {
  try {
    var res = HTTP.get(apiUrl).data;
    callback(null, res);
  } catch (err) {
    if (err.response) {
      var code = err.response.data.code;
      var msg = err.response.data.message;
    } else {
      var code = 500;
      var msg = 'Cannot access the API';
    }
    var error = new Meteor.Error(code, msg);
    callback(error, null);
  }
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
    },

    geoJsonForIp: function(ip) {
      console.log('Calling geoJsonForIp: ' + ip);
      this.unblock();
      var apiUrl = 'http://www.telize.com/geoip/' + ip;
      var res = Meteor.wrapAsync(apiCall)(apiUrl);
      console.log('Geojson: ' + res);
      return res;
    }
  });
}
