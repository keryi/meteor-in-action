Template.selectHouse.helpers({
  housesNameId: function() {
    return Houses.find();
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
