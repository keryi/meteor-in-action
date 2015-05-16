Router.configure
  layoutTemplate: 'layout'

Router.route '/',
  name: 'home'
  controller: 'HomeController'

Router.route '/about', name: 'about'

Router.route '/profiles/:_id',
  controller: 'ProfileController'
