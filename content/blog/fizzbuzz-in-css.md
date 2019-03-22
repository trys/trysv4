---
title: FizzBuzz in CSS
categories: Web
date: 2018-08-16
description: "Filed under: just because you can, doesn't mean you should."
---

Filed under: just because you can, doesn't mean you should.

Discussions on Slack turned to interview questions yesterday afternoon. After many sensible suggestions, the ideas headed in a more lighthearted/sarcastic direction.

> Implement FizzBuzz in CSS

Immediately after hitting send, a sudden urge to complete the task came over me. The rules are as follows:

_"Write a program that prints the numbers from 1 to 100. But for multiples of three print “Fizz” instead of the number and for the multiples of five print “Buzz”. For numbers which are multiples of both three and five print “FizzBuzz”_

`<ol>` seemed like the obvious choice to output numbers. Then it was a case of writing _Fizz_ in `:before`

```css
li:nth-child(3n):before {
    content: 'Fizz';
}
```

_Buzz_ in `:after`

```css
li:nth-child(5n):after {
    content: 'Buzz';
}
```

And hiding the numbers for those items:

```css
li:nth-child(3n),
li:nth-child(5n) {
    list-style: none;
}
```

{{% pen id="BPerYX" tab="css,result" %}}
