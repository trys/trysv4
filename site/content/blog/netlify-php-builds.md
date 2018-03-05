---
title: "Netlify PHP builds"
date: 2018-03-05T13:44:00Z
description: "Testing the PHP build system on Netlify"
categories: Web
---

I was reading the latest Netlify newsletter and spotted a cheeky line at the bottom:

> Our build image is now better at building Ruby and PHP sites

PHP builds on Netlify, this was news to me! I've wanted to port a few static PHP sites, but haven't felt up for rebuilding them in Hugo.

There was only one thing for it, time for testing...

## Local setup

I began with a small static PHP setup I've used in the past. There are two main files: `.htaccess` and `index.php`.

```apacheconf
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteRule ^(.*)$ /index.php [L]
</IfModule>
```

```php
<?php

$name = trim( explode( '?', $_SERVER['REQUEST_URI'], 2 )[0], '/' );
$name = str_replace( '.', '', $name );
$file = '404';

if ( $name !== 'index' && is_file( __dir__ . "/$name.php" ) ) {
	$file = $name;
} elseif (!$name) {
	$file = 'home';
}

$dir = dirname(__FILE__);
include $dir . "/partials/header.php";
require $dir . "/$file.php";
include $dir . "/partials/footer.php";
```

With these two files, URLs get (reasonably) safely converted to PHP files:

- `/           => ./home.php`
- `/about      => ./about.php`
- `/about/team => ./about/team.php`

It also means not having to include headers/footers on every page making it much nicer for content editing.

## Build script

I'll admit, my shell knowledge is non-existent. But I'm a programmer, so bodging together a script can't be that hard, right? Yes, I know that's how PHP devs get a bad name for themselves, but needs must when you're testing out a feature for the first time.

Creating a shell file was the first task, making the file `build.sh` seemed to work, as did running `bash build.sh` in the command line. Strike 1.

Next up. Creating deployment directories. This did the trick of making both the `dist` dirctory, as well as the `about` dirctory:

```bash
mkdir -p "./dist/about/"
```

Finally, the `php` CLI command to convert the files. Initially I tried `php about.php > "./dist/about.html"`, but that didn't take the `.htaccess` file into account. I needed to route the request through the `./index.php` file, spoofing the `REQUEST_URI`. Here's what I ended up with:

```bash
mkdir -p "./dist/about/"
SCRIPT_FILENAME=index.php REQUEST_URI=/ php index.php > "./dist/index.html"
SCRIPT_FILENAME=index.php REQUEST_URI=/about php index.php > "./dist/about/index.html"
SCRIPT_FILENAME=index.php REQUEST_URI=/about/team php index.php > "./dist/about/team.html"
```

Then it was a case of pushing it to [GitHub](https://github.com/trys/phpbuild), importing it to Netlify, and setting the build command to: `bash build.sh` and the deployment directory to `dist`. Sprinkle in some `.gitignore` goodness and we're done:

```
.DS_Store
dist/
```

{{< button "https://romantic-kowalevski-afd890.netlify.com/" >}}View the site{{</ button >}}
