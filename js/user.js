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
    className:'todo-div row',

    events: {
      'click #comp': 'toggleCompleted',
      'click #undo': 'toggleCompleted',
      'dblclick #todo-title': 'edit',
      'keypress .edit': 'updateOnEnter',
      'keydown .edit': 'revertOnEscape',
      'blur .edit': 'close',
      'click #delete': 'clear'
    },
      initialize: function () {
       this.model.on('change', this.render, this);
       this.model.on('destroy', this.remove,this);
    },

    render: function(){

      var source = $('#item-template').html();
      var template = Handlebars.compile(source);
      var html = template(this.model.toJSON());
      this.$el.html(html);

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
    },

    edit: function () {
      this.$("#todo-title").addClass('hidden');
      this.$("#edit").addClass('editing');
      this.$("#editinput").focus();
    },

    updateOnEnter: function (e) {
      if (e.which === 13) {
        this.close();
      }
    },

    revertOnEscape: function (e) {
      if (e.which === 27) {
        this.$("#todo-title").removeClass('hidden');
        this.$("#edit").removeClass('editing');
        this.$("#editinput").val(this.model.get('title'));
      }
    },

    close: function () {
      var value = this.$("#editinput").val();
      var trimmedValue = value.trim();


      if (!this.$("#edit").hasClass('editing')) {
        return;
      }

      if (trimmedValue) {
        this.model.save({ title: trimmedValue });
      }
      else {
        this.clear();
      }

      this.$("#edit").removeClass('editing');
      this.$("#todo-title").removeClass('hidden');

    },

  });




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
      addOne: function(){

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
      }
      });

var todoListView = new TodoListView();
