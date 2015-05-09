Products = new Mongo.Collection('products')

if (Meteor.isClient) {
  Template.fridge.helpers({
    products: function() {
      return Products.find({ place: 'fridge' });
    }
  });

  Template.productList.helpers({
    products: function() {
      return Products.find({ place: 'supermarket' });
    }
  });

  Template.fridge.rendered = function() {
    var templateInstance = this;
    templateInstance.$('#fridge').droppable({
      drop: function(evt, ui) {
        Products.update({ _id: ui.draggable.data('id') }, { $set:
          {
            place: 'fridge'
          }
        });
      }
    });
  }

  Template.productList.rendered = function() {
    var templateInstance = this;
    templateInstance.$('#supermarket').droppable({
      drop: function(evt, ui) {
        Products.update({ _id: ui.draggable.data('id') }, { $set:
          {
            place: 'supermarket'
          }
        });
      }
    });
  }

  Template.productListItem.rendered = function() {
    var templateInstance = this;
    templateInstance.$('.draggable').draggable({
      cursor: 'move',
      helper: 'clone'
    });
  }
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    Products.remove({});
    Products.insert({
      name: 'Milk',
      img: '/milk.jpg',
      place: 'fridge'
    });

    Products.insert({
      name: 'Bread',
      img: '/bread.jpg',
      place: 'supermarket'
    });
  });
}
