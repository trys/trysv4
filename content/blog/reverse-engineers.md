---
title: Reverse Engineer
date: 2024-04-10
categories: Web
---

A backend engineer is normally provided with a set of functional requirements or acceptance criteria for a feature: _"it must do X, Y & Z"_. A project may even have a handful of non-functional principles to guide the approach: _"security even over performance"_.

But as frontend engineers we have an additional and unique aspect to our job: reverse engineering. We have to decipher a wealth of information from static design comps before we can write a single line of _good_ frontend code.

It's a step of visual pattern matching. We have to look at a design as a whole, tease out the common threads that can be encapsulated into shared styles, and discount those that should be kept separate.

In our heads, we follow the journey that a component takes through the provided designed viewports, deciding the most semantic & maintainable markup to fit the bill. We spot the semantic similarities, not just the aesthetic ones, and build headless or themeable chunks to be re-used across a project.

It comes down to maintainability and performance. Shared styles make refactoring simpler, and mean we send less code down the wire. It’s why we don’t just copy CSS directly out of Figma Dev Mode and whack it in the browser, there’s more nuance to it than that. Frontend development isn’t a copy/paste job from design tool to browser; it’s a step of translation.
