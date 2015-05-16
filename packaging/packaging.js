if (Meteor.isClient) {
  Template.hello.helpers({
    avatar: function() {
      return Session.get('avatar');
    }
  });

  Template.hello.rendered = function() {
    Meteor.call('getGravatar', 'hello@yahoo.com', function(err, res) {
      if (!err)
        Session.set('avatar', res);
    });
  }
}

if (Meteor.isServer) {
  Meteor.methods({
    getGravatar: function(email) {
      var gravatar = Meteor.npmRequire('gravatar');
      var url = gravatar.url(email);
      return url;
    }
  });
}
