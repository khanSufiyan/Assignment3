var Router = Backbone.Router.extend({
        routes:{
       'remaining': 'remain',
        'completed': 'complete'
        }
      });
      var remainingListView = new RemainingListView();
      var completedListView = new CompletedListView();

      var router = new Router();

       router.on('route:remain',function(){
       remainingListView.render();
      });

      router.on('route:complete',function(){
       completedListView.render();
      });



Backbone.history.start();