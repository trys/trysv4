---
title: Automating your frontend workflow with Grunt & BrowserSync
categories: Web
year: 2015
date: 2015-03-13
---

Automation is a great tool to boost productivity when it comes to building the front-end of a site. Not only does it speed up your workflow and change the way you think about coding, it’s also great fun to use and makes you feel great about your work! Let’s go…

## Speed
By letting a task runner do the heavy lifting on a project, you can work far quicker. Whether it’s as simple as refreshing your browser after every change or as complex as evaluating your CSS to determine what constitutes as load-critical styling, repetitive tasks take time. They build up without you even knowing and amount to a considerable amount of your time, especially when projects get more complex.

## Thinking so you don’t have to
Have a difficult launch sequence to follow when pushing a site to a live server? Concerned about compiling your colleagues .scss file incorrectly? Bored of minifying JavaScript so you end up using expanded code on the live site? Automated tasks won’t forget these things, they won’t get them wrong and they can even let you know if you’ve done something wrong in the original code.

## Letting you focus on other things
I’ve found that the extra project time saved by automating tasks gives me time to stop and think about the project as a whole more. I can really get into depth on specific elements as I know I can rely on automation to back me up.

Changing the way you code
Once upon a time, minifying code was a chore, and it was one that I would avoid if I could. However, when I saw the light of automation, not only did I not have to minify the code myself, it gave me a greater appreciation of the importance of minification. I can honestly say that using automation has made me a better developer.

## It’s fun!
I can’t deny it, automation is great fun. The first time you run the command and see all this work done for you in a matter of milliseconds, it’s a wonderful feeling. Any imposter syndrome thoughts go flying out the window and you think “Yeah, I’m not too bad at this development lark”.

Want to get a great boost? Check out [BrowserSync](https://browsersync.io/). You’ll feel like a kickass developer in no time. And wait till you colleagues see all your screens scrolling in sync, they’ll love it.

All jokes aside, it’s important to keep morale up and I’ve found nothing gets me more excited than trying out a new technology and then fitting it in to my workflow to find it makes life easier.

## Automate away!
I use [Grunt](https://gruntjs.com/) as my task runner, it’s stable, easy to learn and pretty quick. Once set up, it slotted into my workflow like a dream. Below is a sample Gruntfile that I’ll use to get up and running on a WordPress project:

```javascript
module.exports = function(grunt) {
  'use strict';

  var themeDir = 'wp-content/themes/*project*/';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      js: {
        files: [{ src: themeDir + 'assets/js/load.js' }]
      },
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },
    concat: {
      options: {
        banner: '/*! <%= pkg.name %> - <%= grunt.template.today("dd-mm-yyyy") %> - concatenated */\n'
      },
      js: {
        src: [
          themeDir + 'assets/js/debounce.js',
          themeDir + 'assets/js/load.js',
          themeDir + 'assets/js/matchmedia.js'
        ],
        dest: themeDir + 'assets/js/boot.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> - minified */\n'
      },
      js: {
        files: {
          'wp-content/themes/*project*/assets/js/boot.js': [ themeDir + 'assets/js/boot.js' ]
        }
      }
    },
    browserSync: {
        dev: {
            bsFiles: {
                src: [themeDir + '*.css', themeDir + '**/*.js' ]
            },
            options: {
                watchTask: true,
                open: false,
                proxy: '*project*.dev'
            }
        }
    },
    watch: {
      js: {
        files: [ themeDir + 'assets/js/load.js', 'Gruntfile.js', themeDir + 'style.css' ],
        tasks: ['jshint', 'concat', 'uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask( 'default', [ 'browserSync', 'watch' ] );
  grunt.registerTask( 'dev', [ 'watch '] );
  grunt.registerTask( 'build', [ 'jshint', 'concat', 'uglify' ] );

};
```

It’s not too complicated to begin with, each project differs slightly so I’ll then add specific modules to help me with a specific goal.

The above Gruntfile covers the following:

1. JSLint – JavaScript linting (error checking) as I go – very handy for speeding up development and cutting down on errors significantly.
2. Concat – Concatinating all JavaScript theme files – it slims down the number of HTTP requests considerably.
3. Uglify – Minification of JavaScript files
4. Watch – Keeps an eye on asset files and runs Grunt when they are updated in any way.
5. BrowserSync – Live reloads the browser as soon as I hit save – no alt-tab -> cmd-R required any longer *hooray!* It also pushes CSS and JavaScript changes into the browser without a full page reload. Oh, and it syncs all of this along with scrolling, clicking and a ton more with as many mobile devices as you can connect to it. Seriously cool.

## Reliance
I still code the odd site without automation, nothing being handled by Grunt is system-critical, it’s just a great addition to my workflow that makes me a quicker, more reliable and happier front-end developer!
