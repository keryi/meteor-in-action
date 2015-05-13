LocalHouse = new Mongo.Collection(null);
var newHouse = {
  name: '',
  plants: [],
  lastSave: 'never',
  status: 'unsaved'
};
Session.setDefault('selectedHouseId', '');

updateLocalHouse = function(id, modifier) {
  LocalHouse.update({
    _id: id
  }, modifier);
}

Template.selectHouse.helpers({
  housesNameId: function() {
    return Houses.find({}, {fields: {name: 1, id: 1}});
  },

  isSelected: function() {
    return Session.equals('selectedHouse', this._id) ? 'selected' : '';
  }
});

Template.selectHouse.events({
  'change #select_house': function(e, t) {
    var selectedId = e.currentTarget.value;
    var newId = LocalHouse.upsert(
      selectedId,
      Houses.findOne({_id: selectedId}) || newHouse
    ).insertedId;
    Session.set('selectedHouseId', newId);
  }
});

Template.registerHelper('selectedHouse', function() {
  return LocalHouse.findOne(Session.get('selectedHouseId'));
});

Template.registerHelper('withIndex', function(list) {
  return _.map(list, function(e, i) {
    if (e === null) return;
    e.index = i;
    return e;
  });
});

Template.plantDetails.events({
  'click button.water': function(e, t) {
    var plantId = $(e.currentTarget).attr('data-id');
    Session.set(plantId, true);
    var lastVisit = new Date();
    Houses.update({_id: Session.get('selectedHouse')}, {
      $set: {
        lastVisit: lastVisit
      }
    });
  }
});

Template.plantDetails.helpers({
  isWatered: function() {
    var plantId = Session.get('selectedHouse') + '-' + this.color;
    return Session.get(plantId) ? 'disabled' : '';
  }
});

Template.houseForm.events({
  'keyup input#house_name': function(e, t) {
    e.preventDefault();
    var modifier = { $set: { name: e.currentTarget.value, status: 'unsaved' } };
    updateLocalHouse(Session.get('selectedHouseId'), modifier);
  },

  'click button.add-plant': function(e, t) {
    e.preventDefault();
    var newPlant = {
      color: '',
      instructions: ''
    };
    var modifier = { $push: { plants: newPlant, status: 'unsaved' } };
    updateLocalHouse(Session.get('selectedHouseId'), modifier);
  },

  'click #save_house': function(e, t) {
    e.preventDefault();
    var id = Session.get('selectedHouseId');
    var modifier = { $set: { lastsave: new Date(), status: 'saved' } };
    updateLocalHouse(id, modifier);
    Houses.upsert({ _id: id }, LocalHouse.findOne(id));
  }
});

Template.houseForm.created = function() {
  this.autorun(function() {
    var localHouse = LocalHouse.findOne(Session.get('selectedHouseId'));
    var dbHouse = Houses.findOne(Session.get('selectedHouseId'));
    if (localHouse && localHouse.status === 'unsaved') {
      Session.set('notification', {
        type: 'reminder',
        text: 'Remember to save your changes'
      });
    } else if(dbHouse && dbHouse.lastsave > localHouse.lastsave) {
      Session.set('notification', {
        type: 'warning',
        text: 'This document has been changed in the database'
      });
    } else {
      Session.set('notification', '');
    }
  });
}

Template.showHouse.events({
  'click #delete': function(e, t) {
    if (confirm('Are you sure to delete this house?')) {
      Houses.remove(this._id);
    }
  }
});

Template.plantFieldSet.events({
  'keyup input.color, keyup input.instructions': function(e, t) {
    e.preventDefault();
    var index = e.target.getAttribute('data-index');
    var field = e.target.getAttribute('class');
    var prop = 'plants.' + index + '.' + field;
    var modifier = { $set: {} };
    modifier['$set'][prop] = e.target.value;
    modifier['$set'].status = 'unsaved';
    updateLocalHouse(Session.get('selectedHouseId'), modifier);
  },

  'click button.remove-plant': function(e, t) {
    e.preventDefault();
    var index = e.target.getAttribute('data-index');
    var plants = Template.parentData(1).plants;
    plants.splice(index, 1);
    var modifier = { $set: { plants: plants, status: 'unsaved' } };
    updateLocalHouse(Session.get('selectedHouseId'), modifier);
  }
});

Template.notificationArea.helpers({
  notification: function() {
    return Session.get('notification');
  }
});
