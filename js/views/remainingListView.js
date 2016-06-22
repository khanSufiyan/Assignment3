
var RemainingListView = Backbone.View.extend({

      el: '#list',

     render: function(){

    todoCollecetion.fetch();
  /* var remaining = JSON.stringify(todoCollecetion.remaining());*/
    var remaining = todoCollecetion.remaining();
    var source = $('#remaining-item-template').html();
    var template = Handlebars.compile(source);
    var html = template(remaining);

    this.$el.html(html);
    $('#remaining-item-table').dataTable();
    return this;

    },

      });

var remainingListView = new RemainingListView();
