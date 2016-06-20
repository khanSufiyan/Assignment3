var TodoModel = Backbone.Model.extend({
	defaults: {
        title: '',
        completed: false
      },
   toggle: function () {
			this.save({
				completed: !this.get('completed')
			});
		}
  });

var TodoCollecetion = Backbone.Collection.extend({

	model: TodoModel,
	localStorage: new Store("todo-app"),
});
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




var TodoListView = Backbone.View.extend({

      el: '#todoapp',

      initialize: function () {
        todoCollecetion = new TodoCollecetion();
        this.input = this.$('#todo_input');
        todoCollecetion.on('add', this.addAll, this);
        todoCollecetion.on('reset', this.addAll, this);
        todoCollecetion.fetch(); // Loads list from local storage
      },
      events: {
        'keypress #todo_input': 'createTodoOnEnter'
      },
      createTodoOnEnter: function(e){
        if ( e.which !== 13 || !this.input.val().trim() ) { // ENTER_KEY = 13
          return;
        }
        todoCollecetion.create(this.newAttributes());
        this.input.val(''); // clean input box
      },
      addOne: function(todo){
        var view = new TodoView({model: todo});
        $('#todo-list').append(view.render().el);
      },
      addAll: function(){
        this.$('#todo-list').html(''); // clean the todo list
        todoCollecetion.each(this.addOne, this);
      },
      newAttributes: function(){
        return {
          title: this.input.val().trim(),
          completed: false
        }
      }
      });

var todoListView = new TodoListView();
