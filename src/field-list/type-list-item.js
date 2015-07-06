var View = require('ampersand-view');
var format = require('util').format;
var _ = require('lodash');
var numeral = require('numeral');
var tooltipMixin = require('../tooltip-mixin');

module.exports = View.extend(tooltipMixin, {
  namespace: 'TypeListItem',
  bindings: {
    'model.name': [
      {
        hook: 'name'
      },
      {
        hook: 'bar',
        type: function(el) {
          el.classList.add('schema-field-type-' + this.model.getId().toLowerCase());
        }
      }
    ],
    'model.probability': [
      {
        hook: 'bar',
        type: function(el) {
          el.style.width = Math.floor(this.model.probability * 100) + '%';
        }
      }
    ]
  },
  events: {
    'click .schema-field-wrapper': 'typeClicked'
  },
  initialize: function() {
    this.listenTo(this.model, 'change:count', _.debounce(function() {
      this.tooltip({
        title: format('%s (%s)', this.model.getId(), numeral(this.model.probability).format('%'))
      });
    }.bind(this), 300));
  },
  template: require('./type-list-item.jade'),
  typeClicked: function() {
    var fieldList = this.parent.parent;
    if (!fieldList.minichartModel || fieldList.minichartModel.modelType !== this.model.modelType) {
      fieldList.switchView(this.model);
    }
  }
});
