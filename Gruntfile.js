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

less: {
      development: {
        options: {
          paths: ['less']
        },
        files: {
          'css/main.css': 'less/main.less',
        }
      }
    },



   });

  // task plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
   // tasks
  grunt.registerTask('default', [ 'concat','less']);

};