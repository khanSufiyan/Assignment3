var TodoView = Backbone.View.extend({
    tagName: 'div',
    template: _.template($('#item-template').html()),
    events: {
      'click #comp': 'toggleCompleted',
      'click #delete': 'clear'
    },
      initialize: function () {
     this.model.on('change', this.render, this);
     this.model.on('destroy', this.remove,this);
    },

    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass('completed', this.model.get('completed'));
      return this;
    },
    toggleCompleted: function () {
      this.model.toggle();
    },
    clear: function () {
      this.model.destroy();
    }


  });


