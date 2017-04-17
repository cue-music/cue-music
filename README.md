# Cue Music

Team Members: Alex Bieg, Susan Wolfgram, Billy Ding, Sung-Duk Kang, Yi Pang

## Homework and Questions

Our homework submissions have been moved to our [wiki page](https://github.com/cue-music/cue-music/wiki). Any questions you might have should also be able to be answered there.

## Repo Setup

Here are the steps to set up the repository correctly for development:

1. Clone the repository.
2. Install [NodeJS](https://nodejs.org/en/) (Skip if node is already installed)
3. Install Gulp-CLI with `npm install gulp-cli -g` (Skip if gulp-cli is already installed)
4. Install all node packages with `npm install`
5. (Optional) Install the [Livereload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) browser plugin. (Allows the browser to reload css and javascript without refreshing the page and automatically)

## Running the Site

To run the site all you need to do is run `gulp run-dev`. It will print out the port where it is hosted (ex. "Server running on 8080..."). If you installed the livereload plugin in Chrome you may need to click the icon in the browser bar to start it up. You can tell it is connected when the inner circle of the icon is filled in. Now you should be all set. Whenever you update a Sass, Javascript, or index.html the webpage should automatically update.
