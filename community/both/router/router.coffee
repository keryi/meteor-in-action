Router.configure
  layoutTemplate: 'layout'

Router.route '/',
  name: 'home'
  controller: 'HomeController'

Router.route '/about',
  name: 'about'

Router.route '/profiles/:_id',
  name: 'profile'
  controller: 'ProfileController'

Router.route 'api/profiles/name/:_id', (->
  request = @request
  response = @response
  response.end Profiles.findOne(_id: @params._id).name
  ), { where: 'server' }

Router.route('api/find/profiles/', where: 'server').get ->
  @response.statusCode = 200
  @response.setHeader 'Content-Type', 'application/json'
  @response.setHeader 'Access-Control-Allow-Origin', '*'
  @response.setHeader 'Access-Control-Allow-Headers', 'Origin,
  X-Requested-With, Content-Type, Accept'
  @response.end JSON.stringify(Profiles.find().fetch())

Router.route('api/insert/profiles', where: 'server').post ->
  @response.statusCode = 200
  @response.setHeader 'Content-Type', 'application/json'
  @response.setHeader 'Access-Control-Allow-Origin', '*'
  @response.setHeader 'Access-Control-Allow-Headers', 'Origin,
  X-Requested-With, Content-Type, Accept'
  @response.end JSON.stringify(Profiles.insert(@request.body))
