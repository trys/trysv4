---
title: Multilingual WordPress
date: 2018-01-27
categories: Web
---

In the five years I’ve been working with WordPress, I’ve somehow managed to dodge the bullet that is multilingual WordPress. That was until [Concept Tag](http://www.concepttag.com/) asked us at Tomango to expand their site to include an extra four countries and five languages.

My first thought; to be totally honest, was despair. I’ve heard horror stories of multilingual WordPress plugins and the database bloat that they bring. Integrating with ACF and Gravity Forms seemed like it could be troublesome, and handling multiple domains on one installation sounded like an opportunity for disaster.

Fortunately, a friend recommended [Polylang](https://en-gb.wordpress.org/plugins/polylang/). It’s the sort of plugin I love – the multilingual plugin for developers who are happy to put in a bit of effort to get a great result. It’s why I love ACF so much, the admin UI is brilliant, but frontend implementation is down to the developer.

The region/language picker and automatic prompt had some interesting parts. I didn’t want each page load to be slowed down by a server side geolocation so I opted to check for languages on the server and location on the client after the page had loaded. `$_SERVER['HTTP_ACCEPT_LANGUAGE']` gives you a list of languages set in the user’s browser. Those were passed to JS which called `$.get('http://freegeoip.net/json/')` to find out the country. If we had a region AND language match, we prompted a modal that asked the user in their language (that was all sorts of fun making a language matrix) whether they wanted to be redirected to their local site.

Once all the hardcoded strings in the theme had been swapped out for ‘string translations’, it was just a case of swapping out the content and testing it on a subdomain per language. By making the theme’s view of languages very abstract, it’s now possible to add new languages in the future without any coding input.

To top it off, the go live went really smoothly and Polylang handled the multi-domain setup perfectly. Win win.
