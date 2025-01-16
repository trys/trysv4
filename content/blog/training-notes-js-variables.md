---
title: Training Notes - JS - Variables
year: 2017
date: 2017-10-27
categories: Training
---

# Training - JS

## Foundations
The engine runs from through your JS from top to bottom. When you call a function, it switches context into the function, runs through it, then returns back to the main context.

## Variables
What is a variable?

A variable is a box you can put things in and retrieve later.

```js
var a = 2
console.log(a) // 2
```

Variables can be updated:

```js
a = a + 1
console.log(a) // 3
```

Variables hold values. There are 7 value 'types':

- string
- number
- boolean
- null
- undefined
- symbol
- object

The first six are 'primitive' types. Primitive types are immutable (can't be mutated) For a string, this means the once the string is created. It's not possible to modify it!

```js
var b = 'trys'
b.toUpperCase()
console.log(b) // 'trys'
```

You can however reassign `b` to hold a new string:

```js
var b = 'trys'
b = b.toUpperCase()
console.log(b) // 'TRYS'
```

Why is this useful? Mutable values are consistent, once they're assigned, you have to be explicit to change them. This becomes more useful when we start passing values around a program.

## Objects
The only non-primitive, mutable data type is an object. It is a collection of data.

Interestingly, arrays and functions are both types of object in JS.

## Variables vs. Values
When I said 'A variable is a box you can put things in and retrieve later', I wasn't being strictly true. A variable points to a value and the value is the box that holds things. This means you can have two variables looking at one value. We'll get to that in a bit.

## The types
### String
Strings represent text data: 'Trys' is a string. '1' is a string.

### Number
Numbers represent numerical data. 0 is a number. Infinity is a number. NaN is a number!

### Boolean
Booleans are logical values. true or false. Note 'true' is a string, not boolean. More importantly, 'false' is truthy.

### Null
Null is the intentionaly absence of a value

### Undefined
Undefined is when you have a variable that isn't pointing to a value.

```js
var c
console.log(c) // undefind
```

### Symbol
Symbols are a bit beyond our scope. They were added in ES2015 and they represent unique, primitive (immutable) data.

## What's the big deal?
Variables come into their own when you start passing them around your program. They are a way of linking sections of your program. They help you enforce modularity.

## Arrays

An array is a zero-based collection of items. They are generally created with square brackets:

```js
var a = ['12', '34']
var b = []
```

You can `push` items onto the end of it, `pop` items off the end, `shift` to remove the first item, `unshift` to prepend items. `.forEach` loops them, `indexOf` returns the index position. You access them via square brackets: `arrayName[arrayIndex] = 123`. You can remove items with `splice`. `slice` makes a shallow copy.

## Scope
When a variable is declared, the compiler notes down what the value is and what scope it was defined in.

Imagine a tree. A leaf is concerned about leafy things. It has access to all it's own information. This is called 'local scope'. When the leaf asks for the variable `leafColour`, the engine asks the local scope if it has the value `leafColour`. The scope says yes and returns 'orange'.

Occasionally, a leaf needs to know some twig information, say twig length. So it asks for the variable `twigLength`. First, the engine asks the local scope for the value `twigLength`. The scope says nope. So the engine goes up a level to the twig scope and asks for `twigLength`. It replies yes and returns '10cm'.

Finally, the leaf may ask for the type of tree. It asks the leaf scope, then the twig scope, then the branch scope, then the trunk scope, then the tree scope. In this tenuous analogy, the tree is the global scope and it returns the type 'oak'.

If the leaf had asked for the variable 'breakfast', the engine would've worked up the scopes, to the global scope. If nothing was found, it would return `undefined`.

So scope works from the children up to the global scope. So sibling leaves don't have access to each other, they only have access to their own local scope and all parent scopes. The other key takeaway is parent scope doesn't have access to child scope.

Scopes are (mostly) created each time you call a function.

## Scopes and primitives

```js
var a = 1
function add() {
  a = a + 1
}
console.log(a) // 1
add()
console.log(a) // 2
```

Compare to:

```js
var a = 1
function add(b) {
  b = b + 1
}
console.log(a) // 1
add(a)
console.log(a) // 1
```

In the first example, the function `add` asks for `a`, the scope doesn't have it in local scope, so it goes up a level to global scope and finds it.  So it is able to modify a variable in the parent.

Contrast it to the second example. We pass `a` into the function, it comes in to the parameter `b` (for clarity). As it is immutable, it creates a new variable called `b` that is no longer linked to `a`. Calling `add(a)` only updates the values inside the function. There are two ways around this. One, return the new value of `a` after each function call. Two, use a mutable data type.

One:
```js
var a = 1
function add(b) {
  return b = b + 1
}
console.log(a) // 1
a = add(a)
console.log(a) // 2
```

Two:
```js
var a = {
  count: 1
}
function add(b) {
  b.count = b.count + 1
}
console.log(a.count) // 1
add(a)
console.log(a.count) // 2
```

## var, const, let
In ES2015, `const` and `let` were added. Where `var` declares variables that are limited to function-level scope, `let` and `const` declare block-level scope. 

```js
function varTest() {
  var x = 1;
  if (true) {
    var x = 2;  // same variable!
    console.log(x);  // 2
  }
  console.log(x);  // 2
}

function letTest() {
  let x = 1;
  if (true) {
    let x = 2;  // different variable
    console.log(x);  // 2
  }
  console.log(x);  // 1
}
```
[MDN link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

Furthermore variables declared as `const`, can't be reassigned.

```js
const a = 123
a = 456 // TypeError: Assignment to constant variable.
```

`const` can be mutated:

```js
const b = []
b.push(123)
console.log(b) // [123]
```

In ES2015, `const` is now seen as the 'correct' way to declare variables. `let` should be only used if you have to updated it (ie. a counter). `var` shouldn't be used at all. However, we're not all in ES2015 land just yet.

## Global scope
You may've heard the phrase 'polluting the global scope'. This happens when we define our programs globally. The problem is collisions. If you write a plugin that requires a global object that holds certain values, calling it `settings` may well conflict with another plugin that also uses a `settings` variable. Now whichever program registers the variable last, overwrites all previous settings, and probably breaks your program in the meantime.

You want to reduce global variables as much as possible, ideally to zero or one instances. Then name your global variable to something sensible.

If you don't need to pollute the global scope at all, you can use a IIFE (instantly instantiated function expression). They look like this:

```js
(function() {
  // Your program
})()
```

An IIFE creates a new functional scope block so your variables don't pollute the global scope. You can even pass in values into an IIFE:

```js
(function(a) {
  console.log(a) // 123
})(123)
```

This is a great pattern to utilise as it forces you to break your code into modules.

## Task - mileage calculator
Take an array of journey objects, each with a start, end and distance.

- To begin with, output them in the console.
- Then calculate the total distance and display it on the page
- Display the trips on the page
- Stretch goal: Add a form that lets you add new journeys
- Stretch stretch goal: store the changes in localstorage for persistent calculations
