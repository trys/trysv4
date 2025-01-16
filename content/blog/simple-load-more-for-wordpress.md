---
title: Simple load more for WordPress
year: 2014
date: 2014-05-13
categories: Web
---

Below is a really handy load more script for WordPress giving you a simple way to do away with cumbersome old pagination. It works with categories, authors and archive pages and it’s very simple to implement.

The code is split into two sections, a JavaScript function and a one line addition to your index.php loop.

## JavaScript

```javascript
function loadMore( e ) {
    var theGrid = $( '.post-articles' ),
        PostURL = $( this ).attr( 'href' );

    $( this ).parent().remove();
    e.preventDefault();

    $.get( PostURL, function( data ) {
        var jResult = $( "<div></div>" ).append( data.replace( /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "" ) );
        jResult.find( '.post-articles' ).children().appendTo( theGrid );
    });
}
$( document.body ).on( 'click', '.load-posts a', loadMore );
```

## PHP
```php
<div class="post-articles">
    <?php while ( have_posts() ) : the_post();
        // Loop content 
    endwhile;?>
    <span class="load-posts"><?php next_posts_link( 'More news' )?></span>
</div>
```

## Finishing touches

The final part to check is the pagination count set in your WordPress settings. Head to ‘Settings->Reading’ and choose the number of posts to show before the More News button is displayed.