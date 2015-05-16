Package.describe({
  name: 'keryi:notif',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'A sample meteor package',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use(['ui', 'templating'], 'client');
  api.export('Notification', 'client');
  api.addFiles(['notif.html', 'notif.js', 'notif.css'], 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('keryi:notif');
  api.addFiles('notif-tests.js', 'client');
});
