---
title: 'Virtual Games: Boggle'
date: 2020-03-30
categories: Games
description: 'How to play Boggle in a spreadsheet'
---

Being stuck in lockdown away from your fiancée isn't all that fun. Because we're incredibly fun people™, we decided to recreate some of our favourite games in virtual form!

This post will be a step-by-step guide showing you how to play virtual Boggle in a number of minutes.

The humble spreadsheet is a wonderous thing, and the perfect medium for quickly prototyping a game or two. And when it comes to collaporative spreadsheets, we look no further than [Google Sheets](http://sheets.google.com/). This will be our gaming canvas.

## Step 1: Template

We've made [a template](https://docs.google.com/spreadsheets/d/1iTmSydKlmTd7ul8K8ROGp2qa0nzx18vjwykvmJzG9to/template/preview) to get you started.

![Click 'Use Template' to get started](/images/blog/boggle-template.png)

Click 'Use Template' to take a copy of our spreadsheet, ready for your own alterations.

## Step 2: Macros

Google Sheets quite rightly doesnt like us storing scripts in templates, so we're going to run through that now. At the top of the toolbar, click 'Tools -> Script Editor'. This will open up a new window where we can write some code.

Change the name from 'Untitled Project' to 'Boggle'.

Copy and paste the code below in:

```js
function boggle() {
  var dice = [
    ['P',	'H',	'N',	'I',	'E',	'S'],
    ['A',	'E',	'M',	'C',	'D',	'P'],
    ['U',	'S',	'P',	'E',	'L',	'T'],
    ['X',	'O',	'R',	'F',	'B',	'I'],
    ['D',	'U',	'K',	'T',	'O',	'N'],
    ['K',	'L',	'U',	'E',	'Y',	'G'],
    ['R',	'I',	'U',	'G',	'W',	'L'],
    ['O',	'R',	'M',	'S',	'H',	'A'],
    ['A',	'S',	'L',	'E',	'C',	'R'],
    ['N',	'I',	'E',	'V',	'T',	'G'],
    ['A',	'T',	'B',	'Y',	'I',	'L'],
    ['Z',	'N',	'E',	'D',	'A',	'V'],
    ['O',	'J',	'B',	'M',	'Qu',	'A'],
    ['H',	'Y',	'I',	'F',	'E',	'E'],
    ['O',	'S',	'D',	'E',	'W',	'N'],
    ['T',	'A',	'C',	'O',	'I',	'A'],
  ];
    
  var cells = ['I18', 'J18', 'K18', 'L18','I19', 'J19', 'K19', 'L19', 'I20', 'J20', 'K20', 'L20', 'I21', 'J21', 'K21', 'L21']
    
  dice.sort(() => Math.random() - 0.5);
  for (var i = 0; i < dice.length; i++) {
    SpreadsheetApp.getActiveSheet().getRange(cells[i]).setValue(dice[i][Math.floor(Math.random() * 6)]);
  }
}
```

Click the 'Save' icon, or click 'File -> Save'.
