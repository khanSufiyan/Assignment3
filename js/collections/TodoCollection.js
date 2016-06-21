var TodoCollecetion = Backbone.Collection.extend({

	model: TodoModel,
	localStorage: new Store("todo-app"),
});