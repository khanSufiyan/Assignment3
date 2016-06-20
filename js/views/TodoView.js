var TodoView = Backbone.View.extend({
    tagName: 'div',
    className:'todo-div',
    template: _.template($('#item-template').html()),
    events: {
      'click #comp': 'toggleCompleted',
      'click #undo': 'toggleCompleted',
      'click #delete': 'clear',
    },
      initialize: function () {
     this.model.on('change', this.render, this);
     this.model.on('destroy', this.remove,this);
    },

    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
      this.$("#comp").toggleClass('hidden', this.model.get('completed'));
      this.$("#undo").toggleClass('hidden', !(this.model.get('completed')));

      this.$("#todo-title").toggleClass('completed', this.model.get('completed'));
      return this;
    },
    toggleCompleted: function () {
      this.model.toggle();
    },
    clear: function () {
      this.model.destroy();
    }


  });


