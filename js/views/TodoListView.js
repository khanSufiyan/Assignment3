
var TodoListView = Backbone.View.extend({

      el: '#todoapp',

      initialize: function () {
        todoCollecetion = new TodoCollecetion();

        this.input = this.$('#todo_input');
        todoCollecetion.on('add', this.addAll, this);
        todoCollecetion.on('reset', this.addAll, this);
        todoCollecetion.fetch();
      },
      events: {
        'keypress #todo_input': 'createTodoOnEnter'
      },
      createTodoOnEnter: function(e){
        if ( e.which !== 13 || !this.input.val().trim() ) {
          return;
        }
        todoCollecetion.create(this.newAttributes());
        this.input.val('');
      },
      addOne: function(todo){

        var view = new TodoView({model: todo});//Intializing TodoView

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
      }
      });

var todoListView = new TodoListView();
