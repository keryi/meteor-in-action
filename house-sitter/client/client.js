Template.selectHouse.helpers({
  housesNameId: function() {
    return Houses.find({}, {fields: {name: 1, id: 1}});
  },

  isSelected: function() {
    return Session.equals('selectedHouse', this._id) ? 'selected' : '';
  }
});

Template.selectHouse.events({
  'change #selectHouse': function(e, t) {
    Session.set('selectedHouse', e.currentTarget.value);
  }
});

Template.showHouse.helpers({
  house: function() {
    return Houses.findOne({_id: Session.get('selectedHouse')});
  }
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
