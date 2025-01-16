---
title: Cache busting
year: 2018
date: 2018-02-07
categories: Training
---


## 1. The classic query string 

```html
<link rel="stylesheet" href="/style.css?ver=20180207">
```

This is the most basic form of cache busting. It works well for manually created assets but it’s a pain to remember, plus it can have [some issues](http://www.stevesouders.com/blog/2008/08/23/revving-filenames-dont-use-querystring/).

## 2. The better URL

```
# .htaccess
# Version control scripts - https://adactio.com/journal/8504
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.*)\.([0-9]*)\.(min.js|js|css)$ $1.$3 [L]
</IfModule>
```
```html
<link rel="stylesheet" href="/style.20180207.css">
```

You keep your filenames clean but perform a rewrite for requests so: `style.20180207.css` is served the file `style.css`. This has the benefit of looking much nicer and not having the querystring problems, but it still requires remembering to update it when you make a change. The other downside is BrowserSync gets a bit upset with it (I haven’t spent much time looking for a fix, it’s probably not a big deal).

## 2.5 Automating the above

You can use the last modified time to generate the timestamp. filemtime(assets/style.css) in PHP will return you a timestamp that could be appended to the link/query string:

```php
echo '<link rel="stylesheet" href="/style.' . filemtime('style.css') . '.css">'
```

## 3. The hosting solution

As I’m a big fan of Netlify at the moment, I can’t help but recommend their setup. It’s a nice solution because: **You do nothing!**

They check the assets when deploying and compare them (or more specifically their ETags) to the current file. If it’s changed, they bust the cache on the file. For the user, it goes something like this:

When you ask for a file, they send the ETag in the request headers. They also set a header to tell the browser not to trust it’s own cache (which sounds a bit mad). Then when you request the page, it opens a persistent HTTP2 connectio (no new connections for subsequent requests). When it requests that earlier asset, the browser sends the ETag back to Netlify and they either return nothing if the ETag matches, or the new file with the new ETag. `No style.20180207.css` or `style.css?v=20180207`. Just clean `style.css` with instant cache invalidation. It’s so so good.

## 4. The build step

If you’re using a build step, you can perform the hash and add it to the filename on build. Here’s a Webpack example:

```javascript
module.exports = {
  entry: './src/app.js',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

This will create a file like `/dist/app.5ec8e954e32d66dee1aa.js`. More details [here](https://webpack.js.org/guides/caching/).

The difficult bit is then integrating it into your HTML. With Webpack, you can use the HtmlWebpackPlugin to add the `<script src="app.5ec8e954e32d66dee1aa.js"></script>` tag to the bottom of your HTML page – this works great if you’re using a fully integrated Webpack setup. This probably means using their dev server for local developement, not storing the compiled production files in the repo and using some form of server deployment build step to generate the production files on the server.

This is the ‘best’ solution if you’re happy to wade in with Webpack and get a full deployment setup working – which in the long term is worthwhile but in the short term sounds scary. It’s also reliant on your hosting setup being good enough too.
