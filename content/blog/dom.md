---
title: DOM
date: 2017-11-27
categories: Training
---

# DOM

The DOM (Document Object Model) is the interface between HTML and JS. It represents the page as a tree with the 'document' at the top (the `<html>` element, and each node as a child, grandchild, great-grandchild etc...

```javascript
console.log(document)
```

```markup
<html>
    <body>
        <p>Hi there</p>
    </body>
</html>
```

```javascript
var document = {
    body: {
        children: [
            {
                nodeName: 'P',
                innerText: 'Hi there'
            }
        ]
    }
}
```

It acts very much like an object, we can even use dot-notation to access (some) children. Accessing the `<body>` element is a case of writing `document.body`.

## childNodes

Each item on the tree is a node. There are several different types of node that we need to be aware of:

- Element
- Text
- Comment

Using the following HTML, we can see how JS interprets markup:

```markup
<html>
    <body>
        <!-- A hidden comment -->
        <p>123</p>
        Hi there!
    </body>
</html>
```

```javascript
console.log(document.body.childNodes)
```

How many nodes will be returned in this statement?

The answer is 5:

1. Text: newline character
2. Comment: our hidden comment
3. Text: newline character
4. Element: our paragraph
5. Text: newline and 'Hi there! and then newline'

This shows you can't rely on `childNodes` returning just the HTML, or just the text. When we indent our code, we're introducing this extra 'content'. It's not a problem for actually displaying the HTML in the page, but it does need to be considered when we're reading from the DOM.

## Children

```javascript
console.log(document.body.children)
```

Let's compare the difference using `.children` on the same markup. We get a HTMLCollection with one element, the paragraph. This is more useful for only dealing with HTML.

## Iteration - HTMLCollection vs. NodeList

In our first example, we were returned a NodeList, in the second we got a HTMLCollection. If we console.dir them, we can see the prototyped methods & properties available to us. For HTMLCollection, the only useful property is length. With this, we can use a classic `for` loop to access the elements.

In a NodeList, we have access to forEach, support is good but it needs a [polyfill](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill) for IE.

A nice loop that works for both is:

```javascript
[].forEach.call(document.body.children, function(el) {
    console.log(el)
})
```

## addEventListener

In jQuery, we can attach events using `.on`. In vanilla JS, we use `.addEventListener`. For a single node, we can write:

```javascript
element.addEventListener('click', function() {});
```

For a NodeList or HTMLCollection, we need to loop through the elements and attach the event listeners individually:

```javascript
[].forEach.call(document.body.children, function(el) {
    el.addEventListener('click', function() {});
})
```

`.removeEventListener` works in the same way as jQuery's `.off`.

## createElement

`document.createElement('p')` lets us create new HTML elements. Until they're added to the DOM, they're still virtual. 

## appendChild

Once we've created our element, we can append it into another Node with appendChild.

```javascript
var el = document.createElement('p')
el.innerText = 'Abc'
document.body.appendChild(el)
```

## removeChild

Removing a node is a bit more complicated. You have to call removeChild on the parent node. Fortunately, we can use node.parentNode to find the parent.

```javascript
node.parentNode.removeChild(node)
```

## replaceChild

`.replaceChild` has the same parent requirement rules as `.removeChild`, but we pass in two arguments, the newNode and the oldNode.

## innerHTML vs. innerText

`innerText` will return the text of the node and it's children. `innerHTML` returns the text and HTML of the node and it's children.

```markup
<html>
    <body>
        <p>123 <b>456</b></p>
    </body>
</html>
```

```javascript
document.body.children[0].innerText
// "123 456"
document.body.children[0].innerHTML
// "123 <b>456</b>"
```

Be careful when adding user generated content to the DOM. Always use escape or use `innerText`! If you use `innerHTML`, a 'hacker' could add a script tag to their content and it would run on your page. This is called Cross-site scripting or XSS.

## getAttribute / setAttribute

To read & write attributes to a node, we can use `getAttribute` and `setAttribute`. Note that they will always return a string, so remember to cast the type when reading values back if you need to work with anything other than a string.

```javascript
document.body.setAttribute('a-new-attribute', 123)
document.body.getAttribute('a-new-attribute') // '123'
// <body a-new-attribute="123"></body>
```

## classList

Classes can be edited with `setAttribute`, but it's better to use `.classList` as it provides much more flexibility.

```javascript
el.classList.add('className')
el.classList.remove('className')
el.classList.toggle('className')
el.classList.contains('className')
```

## dataset

Dataset operations lets you read/write to `data-` attributes on the HTML element.

```javascript
document.body.dataset['123'] = 'abc'
// <body data-123="abc"></body>
```

## style

`element.style` returns all the current CSS applied to an element. It's object-like so you can write `element.style.color` to be more specific. Hyphenated properties are converted to camelCase: `element.style.marginLeft`. These a getters and setters.

## nodeName

`.nodeName` provides an uppercase name of the HTML tag, not used that often, but really helpful on occasion.

## Element positioning

`.offsetLeft` and `.offsetTop` provide an integer representing the offset to the nearest parent with `position: relative` (can be found with `.offsetParent`).

`.offsetHeight` and `.offsetWidth` give the height of the element including borders and padding.

`element.getBoundingClientRect()` gets you all these things in one go.

## Finding elements

The key methods we need are `.querySelector()` and `.querySelectorAll()`. The first takes a CSS selector and returns the first matching element, the second takes a CSS selector and returns a NodeList of all matching elements. These methods are most commonly run on the `document` but can be run on another node for more specific and performant look ups. 

We always want to 'cache' the lookup to minimize DOM read operations:

```javascript
var ctaButton = document.querySelector('.cta-button')
ctaButton.innerText = 'Read more'
ctaButton.style.color = '#123456'
```

## Event delegation & bubbling

Bubbling is the process of an event working it's way up the DOM tree. For example, when you click on a `<button>`, you're also clicking on all the parent elements, right up to the document. This can seem like a strange behaviour at first, but it's really helpful. Imagine we want to alert the user every time they click on the text in the following markup:

```markup
<p>Abc, easy as <strong>123</strong></p>
```

Without event bubbling, we'd need to add an event on the `p` AND `strong`, as both could be clicked on. This would be a pain to keep track of. So bubbling means we only need to put the event listener on the `p`, and when the `strong` is clicked, the `p` event will be triggered.

We can use this to our advantage to group events and avoid putting eventListeners on multiple elements.


## Task - TODO list

The classic task. Using the following markup, hook up the JS to make a todo list:

```markup
<link href="https://fonts.googleapis.com/css?family=Barlow+Condensed" rel="stylesheet">
<style>.todo,body{padding:40px}body{background:#2962FF;margin:0;font:18px/1.5 'Barlow Condensed',sans-serif}.todo{width:100%;max-width:400px;margin:0 auto;background:#E3F2FD;border:10px solid #0D47A1}.todo input,.todo li button{background:#FFF;font:inherit}.todo form:after{content:'';display:table;clear:both}.todo [type=text]{width:calc(100% - 100px);float:left}.todo [type=submit]{width:80px;float:right}.todo input{padding:10px;display:inline-block;border:2px solid #DDD}.todo ul{padding:0}.todo li{padding:5px 0;list-style:none;margin:0}.todo li button{border:1px solid #DDD}.todo li+li{border-top:1px solid rgba(0,0,0,.2)}</style>


<div class="todo">
    <form id="addTodo">
        <input name="todo" type="text" placeholder="What would you like to do?" required>
        <input type="submit" value="+" />
    </form>

    <h2>Still to do</h2>
    <ul class="todo__incomplete">
        <li><button>&times;</button> Task 1</li>
    </ul>

    <h2>Completed</h2>
    <ul class="todo__completed">
        
    </ul>
</div>
```

1. When the form submits, add an item to the 'Still to do' list.
2. When the user click on the button, move the todo between the 'Still to do' and 'Completed' list.
