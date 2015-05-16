Template.notifArea.helpers({
  notif: function() {
    return Session.get('notif');
  }
});

Template.notifArea.events({
  'click button': function() {
    Session.set('notif', '');
  }
});

setNotif = function(type, text, buttonText) {
  Session.set('notif', {
    type: type,
    text: text,
    buttonText: buttonText
  });
}

Notification = {
  setError: function(text) {
    setNotif('error', text, 'Oh no..');
  },

  setWarning: function(text) {
    setNotif('warning', text, 'Good to know');
  },

  setSuccess: function(text) {
    setNotif('success', text, 'Cool!');
  },

  clear: function() {
    Session.set('notif', '');
  }
}
