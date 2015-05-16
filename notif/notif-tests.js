Tinytest.add('setError', function (test) {
  var errMsg = 'System is out of control!!!';
  Notification.setError(errMsg);
  var notif = Session.get('notif');
  test.equal(notif.text, errMsg);
  test.equal(notif.type, 'error');
  test.equal(notif.buttonText, 'Oh no..');
});
