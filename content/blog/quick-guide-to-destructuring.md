---
title: A quick guide to destructuring
year: 2023
date: 2023-09-25
categories: Training
description: What is destructuring assignment all about
---

I was pairing with a junior engineer and we came across a piece of code that confused them. It was around destructuring variables from an object, so rather than send a slack message, I thought I'd write a quick blog post on the subject.

Here's an object:

```js
const user = {
	firstName: 'Jack',
	lastName: 'Smith',
  	age: 30,
};
```

If you wanted a variable called `firstName` with the value of `user.firstName`, you could do this:

```js
const firstName = user.firstName;
```

But that gets a bit verbose when you also need `lastName` and `age`:

```js
const firstName = user.firstName;
const lastName = user.lastName;
const age = user.age;
```

To solve this, [ES6 added destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment). So, to assign those same variables in a functionally equivalent way, you can do the following:

```js
const { firstName, lastName, age } = user;
```

Much neater. But if you've not encountered this syntax before, it's understandably quite confusing to see what looks like an object being used backwards to the 'normal' way.

## Bonus tips

You can also use destructuring to '[spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)' the remaining variables after the initial assignment into a new object:

```js
const { age, ...rest } = object;
// rest contains { firstName: 'Jack', lastName: 'Smith' }
```

Finally, you can also access nested variables in child objects:

```js
const user = {
	firstName: 'Jack',
	lastName: 'Smith',
  	age: 30,
	favouriteMeals: {
		breakfast: ['pancakes', 'yoghurt'],
		lunch: ['sandwiches']
	}
};

const { firstName, favouriteMeals: { breakfast, lunch } } = user;
```

This assigns the variables: `firstName`, `breakfast`, and `lunch`, but crucially, doesn't assign `favouriteMeals`.
