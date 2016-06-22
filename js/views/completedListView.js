
var CompletedListView = Backbone.View.extend({

       el: '#list',

     render: function(){
     /*var completed = JSON.stringify(todoCollecetion.completed());*/
     var completed = todoCollecetion.completed();
    var source = $('#completed-item-template').html();
    var template = Handlebars.compile(source);
    var html = template(completed);
    this.$el.html(html);
    $('#completed-item-table').dataTable();
    return this;

    },

      });

var completedListView = new CompletedListView();
