---
title: Forms
date: 2017-10-12
categories: Web
---

I’ve been building the contact form for Tomango’s new site today. It’s a task I’ve been putting off for a few days now because we’re making the radical change of not using a CMS.

On one hand, it’s incredibly freeing to not have the bloat of a behemoth codebase spinning up each time the page loads. On the other, it’s made me realise how much of a crutch WordPress has become and how much I take for granted the [few select plugins](http://www.tomango.co.uk/thinks/improving-wordpress-performance/) I use.

Gravity Forms is by no means perfect. In fact, I’m actively looking for a better alternative. But it takes the stress away from all the hidden security, UX and accessibility implications that come along with user-generated content.

As some form of checklist, here are some of the considerations I’ve been accounting for:

## Client-side

- Great design implementation on all screen sizes
- Works without JS & CSS
- Is navigatable without a keyboard
- Performs well on a low-end device
- Is easy to use on a touch screen device
- Provides quick and accurate feedback to the user
- Graceful degradation if a HTML5 input type isn’t supported
- Doesn’t rely on client-side validation – the required attribute was only recently supported in Safari!
- Captures the right information without asking for too much
- Doesn’t force information to be entered in a certain way
- Works when the connection is flaky or non-existent (Background Sync API)
- Is lean – ie. minimal CSS and JS
- Doesn’t wipe entered information if the validation fails
- Is friendly and informative when things go wrong
- Is clear when the form submits successfully
- Handles browser autocompletion

## Server-side

- Is secure: data needs to be sanitised before being saved
- Is accurate: if there are required fields, don’t rely on client-side validation
- Implements Postel’s law: Be conservative in what you do, be liberal in what you accept from others
- Checks data types on submission
- Trims data to sensible maximum lengths
- Reliably contacts whomever the intended recipient is
- Saves the data for when an email inevitably gets stuck in a spam folder
- Securely displays the data to administrators
- Catches spam
- Uses one-time keys to reduce bots attacking the POST route
- Is fast to return to the user
- Redirects the user after a successful submission