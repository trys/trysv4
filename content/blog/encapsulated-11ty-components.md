---
title: "Encapsulated Eleventy/Nunjucks components with macros"
date: 2021-02-19
categories: Web
description: "How to pass parameters to an include in Nunjucks"
---

When I started using Eleventy, and specifically Nunjucks, it was a bit frustrating to find you couldn't pass in parameters into an `include`. Having used [Twig](https://twig.symfony.com/) quite a bit, I missed the [with](https://twig.symfony.com/doc/3.x/tags/include.html) syntax that lets you pass in a context object when including a partial.

In Nunjucks, every component gets unguarded access to the parent template scope and the variables defined there, ie. unencapsulated and leaky. This can be a bit annoying, and create unwanted side-effects. Let's demonstrate with a button:

```html
<button type="button">{{ primary }}</button>
```

To 'pass in' variables to the component, you can set them ahead of the include:

```twig
{% set primary = 'Hi' %}
{% include "components/button.njk" %}

{# Output  #}
<button type="button">Hi</button>
```


This _works_, but falls apart immediately if we update the button take an optional parameter as well:

```html
<button type="button">{{ primary }} {{ secondary }}</button>
```

And forget to 'unset' any previous sets before reusing the components:

```twig
{% set primary = 'Hi' %}
{% set secondary = 'there' %}
{% include "components/button.njk" %}

{# Output  #}
<button type="button">Hi there</button>

{% set primary = 'Hello' %}
{% include "components/button.njk" %}

{# Output  #}
<button type="button">Hello there</button>
```

This also gives me flashbacks to the [Antlers](https://statamic.dev/antlers) templating language, where variables in includes look 'up' the page to find any instance of the variable in parent components. In my opinion, it's a nightmare to work with in practice.

After a lot of googling for "nunjucks include with parameters", I found macros!

## Macros

Nunjucks has this concept called [macros](https://mozilla.github.io/nunjucks/templating.html#macro) that hit all the boxes:

1. Allow you to reuse markup
2. Let you pass in parameters directly
3. Are totally encapsulated from the page variable scope

Here's how I use them. Our macro will expose only the passed in parameters on a variable called `params`, so let's update the button first:

```twig
<button type="button">{{ params.primary }} {{ params.secondary }}</button>
```

Next, we need to create a `macro.njk` file for the button. I like to keep it in the same folder as the `button.njk` file itself:

```
_includes
  components
    button
      button.njk
      macro.njk
```

Here's what the `macro.njk` file looks like:

```twig
{% macro button(params) %}
  {% include "./button.njk" %}
{% endmacro %}
```

{{< alert "Note" >}}
We're including the `.button.njk` file in this macro, but there's no reason why we couldn't add the HTML directly into this macro. I've just found it easier to separate concerns this way.
{{</ alert >}}

Finally, we render the button. There are two stages to this. Firstly, we import the macro, and then we call it like a function, passing in a context object:

```twig
{%- from "components/button/macro.njk" import button -%}

{{ button({
  primary: 'Hi'
}) }}

{# Output  #}
<button type="button">Hi</button>

{{ button({
  primary: 'Hi',
  secondary: 'there'
}) }}

{# Output  #}
<button type="button">Hi there</button>
```

This approach stops the 'leaky component problem' and allows each include to be fully encapsulated. The only downside is the number of macro import lines you have to write to pull this off. But there is an alternative.

## Global component macro

Rather than create a macro for _every_ component, you can create a single `component` macro that takes two parameters: the name of the component, and the params you want to pass to it.

I like to put this `component.njk` file in a `system` directory, to separate it from other components:

```
_includes
  components
    button
      button.njk
  system
    component.njk
```

The macro itself is just a more generic version of the earlier `button` variant.

```twig
{%- macro component(name, params) -%}
  {% include "../components/" + name + "/" + name + ".njk" ignore missing %}
{%- endmacro -%}
```

### Update - try it yourself

A few people have asked for a live example demonstrating this approach, so I've created a [repository](https://github.com/trys/11ty-component-macro) and [MVP demo](https://11ty-component-macro.netlify.app/).

{{< alert "Note" >}}
You can choose to add an `ignore missing` flag to suppress errors when including a partial.

This macro also assumes the 'name' of the `.njk` file matches the folder, but this could always be overwritten with optional folder parameter.
{{</ alert >}}

### Using the macro

To begin with, import this macro into your top-most page template (so it is usable on child templates) as follows:

```twig
{%- from "system/component.njk" import component -%}
<!DOCTYPE html>
<html lang="en">
...
```

Then, call it like so:

```twig
{{ component('button', {
  primary: 'Hello'
}) }}

{# Output  #}
<button type="button">Hello</button>
```
