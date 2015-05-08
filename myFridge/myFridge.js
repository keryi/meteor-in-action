Products = new Mongo.Collection('products')

if (Meteor.isClient) {

}

if (Meteor.isServer) {
  Meteor.startup(function() {
    if (Products.find().count() == 0) {
      _.times(10, function(i) {
        Products.insert({
          name: 'Product#' + i,
          img: '/product_' + i + '.jpg',
          place: 'fridge'
        });
      });
    }
  });
}
