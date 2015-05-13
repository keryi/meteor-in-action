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
    _id: id,
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
    if (v === null) return;
    v.index = i;
    return v;
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
    var modifier = { $set: { name: e.currentTarget.value } };
    updateLocalHouse(Session.get('selectedHouseId'), modifier);
  },

  'click #save_house': function(e, t) {
    e.preventDefault();
    var name = $("input[id=house_name]").val();
    var color = $("input[id=plant_color]").val();
    var instruction = $("input[id=plant_instruction]").val();

    Session.set('selectedHouse', Houses.insert({
      name: name,
      plants:[
        { color: color, instructions: instruction }
      ]
    }));
  }
});

Template.showHouse.events({
  'click #delete': function(e, t) {
    if (confirm('Are you sure to delete this house?')) {
      Houses.remove(this._id);
    }
  }
});
