---
title: Only show the first letter
year: 2019
date: 2019-05-16 16:00:00
categories: Web
---

Time for another tiny lesson! We're working with a third-party Vue datepicker, and there was a design decision to only show the first letter of the weekdays above the calendar. The datepicker let us specify those values via props. All plain sailing, or so we thought.

The problem? The library assumes you'll be passing unique values, and it uses them as the `:key` property in a loop. Single letter days lead to `T` and `S` collisions and Vue throws a warning for duplicate keys. We also couldn't change that logic without forking the plugin, nor add additional markup to the output.

The solution was to use full weekdays, and hide all but the first letter with CSS. Here's how:

```css
.datepicker thead {
  font-size: 0;
}

.datepicker thead ::first-letter {
  font-size: 1rem;
}
```

{{< tiny-lesson-first-letter >}}
