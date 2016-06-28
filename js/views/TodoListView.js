
var TodoListView = Backbone.View.extend({

      el: '#todoapp',

      initialize: function () {
        todoCollecetion = new TodoCollecetion();

        $('[data-toggle="tooltip"]').tooltip();

        this.input = this.$('#todo_input');
        this.allCheckbox = this.$('.toggle-all')[0];
        todoCollecetion.on('add', this.addAll, this);
        todoCollecetion.on('reset', this.addAll, this);
        todoCollecetion.fetch();
      },
      events: {
        'keypress #todo_input': 'createTodoOnEnter',
        'click .toggle-all': 'toggleAllComplete',
        'click .clrCompleted': 'clrCompleted',
      },
      createTodoOnEnter: function(e){
        if ( e.which !== 13 || !this.input.val().trim() ) {
          return;
        }
        todoCollecetion.create(this.newAttributes());
        this.input.val('');
      },
      addOne: function(todo){

        var view = new TodoView({model: todo});

        $('#todo-list').append(view.render().el);
      },
      addAll: function(){
        this.$('#todo-list').html('');
        todoCollecetion.each(this.addOne, this);
      },
      newAttributes: function(){
        return {
          title: this.input.val().trim(),
          completed: false
        }
      },
      toggleAllComplete: function () {
      var completed = this.allCheckbox.checked;

        todoCollecetion.each(function (TodoModel) {
        TodoModel.save({
          completed: completed
        });
      });
    },
   clrCompleted: function () {
      _.invoke(todoCollecetion.completed(), 'destroy');
      return false;
    },
      });

var todoListView = new TodoListView();
