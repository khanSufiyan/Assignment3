var TodoCollecetion = Backbone.Collection.extend({

	model: TodoModel,
	localStorage: new Store("todo-app"),

		completed: function () {
			return this.where({completed: true});
		},

		remaining: function () {
			return this.where({completed: false});
		},
});