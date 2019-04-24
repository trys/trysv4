---
title: Chrome Local Overrides
date: 2019-04-24
categories: Web
description: The wonder of local overrides
---

I was working on a 'Zen Garden' type project this afternoon. The markup wasn't touchable, and CSS was all I had to play with. Further still, I couldn't run the site locally - not ideal. Fortunately, Chrome has added a neat way to work in these situations in the form of **local overrides**.

Local overrides are files that Chrome serves in place of a live request. But more than that, it watches the file for changes and injects the changes back into the page making it an absolute breeze to work with. There's no build system or local dev server required, it _just works_. Here's how:

#### 1. Open devtools and go to the sources tab

#### 2. Click 'Overrides' in the top-left corner of devtools.

It might be behind the **&rsaquo;&rsaquo;** menu.

#### 3. Click 'Select folder for overrides' and choose a local folder to save the files to

#### 4. Click 'Allow' on the pop-up bar that'll appear

#### 5. Go to the elements tab and click on a stylesheet name

It's on the right-hand side of any CSS declaration, something like `main.css:1`

#### 6. Right click anywhere in the opened file, and click 'Save for overrides'

Chrome will create a new file, copying all the existing styles into it.

**Top tip:** If you're working with a minified file, click the `{}` button before choosing 'Save for overrides'. This'll beautify the code first and make your life much simpler! 🙌

#### 7. Open the newly created file in your text editor of choice!

Any changes you make will be instantly reflected in the browser!

## Bonus points

### Sources editor

The sources tab can be used as a full-blown text editor. It's got tons of shortcuts and acts much like Sublime or VS Code. Changes you make will be live immediately, and hitting `Cmd+S` will save the file to your computer!

### Two-way styling!

Changes you make in the elements panel are also autosaved to the file! Try using the colour picker and watching the local file change!

![Two way style binding](/images/blog/two-way-binding.gif)

### Spotting a local override

Any files being overridden will have a little purple dot next to them in the elements panel.

![The purple dot next to an overridden stylesheet](/images/blog/override-example.png)

### Removing local overrides

When you're done with the overrides, you can head back to the sources tab and uncheck 'Enable Local Overrides', and you'll be back to the live code!
