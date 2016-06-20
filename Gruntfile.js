module.exports = function(grunt) {

  // config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

     concat: {
        user:{
       dest:'js/user.js',
        src: [

  'js/models/TodoModel.js',
  'js/collections/TodoCollection.js',
  'js/views/TodoView.js',
  'js/views/TodoListView.js',
          ]
      }
     },
   });

  // task plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
   // tasks
  grunt.registerTask('default', [ 'concat' ]);

};