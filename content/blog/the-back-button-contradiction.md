---
title: The back button contradiction
categories: Web
year: 2014
date: 2014-03-27
---

An increasingly common development to many websites is the ‘back to …’ button. The concept is simple, take the user from their current page to the archive from which they came.

It’s a handy form of navigation, so handy in fact, that it has been **built into every web browser available**. So why a website should have a second back button concealed within the page is contentious. But is there a problem with duplicating this form of navigation?

## The contradiction

When you add a ‘back to …’ button; generally speaking, it will take your user to one of two places:

1. The previous page that the user visited in their browser
2. The archive page that the current page is featured on

The first option is preferable, it mirrors the default function of the browser back button and will cause minimal confusion to the user. However, when the owner of the site is concerned about the user leaving their site, the back button will often be made to function like option 2. And this is where the contradiction appears.

Suddenly your **back button is a forward button**, effectively just another hyperlink taking the user to a page that they didn’t come from. But the difference between this and a normal link is that it’s posing as a trusted form of navigation. Keeping trust with a user is paramount to making a conversion and this unexpected behaviour could just provide enough doubt to lose the user from the site altogether.

This method is especially common on eCommerce websites, keeping a user on the website is regularly seen as objective no.2 (second to making the sale itself). It’s the same reason why many sites choose to use target=”_blank” on all external links. Being afraid of a user leaving your site to the point of changing the way a browser works by default is a dangerous thing.

> Any navigation is good navigation surely?

Although I agree to an extent with this, there is something to be said for keeping navigation simple. Giving too many options can lead to user confusion. Fewer, stronger navigation elements will fare better than multiple, weaker elements. Any link that a user can click on should invoke trust, by splitting navigation (or over-duplicating), trust barriers get breached.

## The solution

If you must have a back button, rather than make it a button that sometimes goes back to the previous page and other times to a completely new page, try checking to see where the user has come from and adjust accordingly. For example, if the aim is to take the user back to search results, check the previous URL to see if it matches with search result URL. If it matches, show the button, if not, hide it.

All web browsers have back buttons. They are trustworthy, consistent and universally accepted as a sure-fire way of navigating the web. Break that tradition at your own peril…

