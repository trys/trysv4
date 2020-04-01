---
title: 'Virtual Games: Boggle'
date: 2020-03-30
categories: Games
description: 'How to play Boggle in a spreadsheet'
---

Being stuck in lockdown away from your fiancée isn't all that fun. Because we're incredibly fun people™, we decided to recreate some of our favourite games in virtual form!

This post will be a step-by-step guide showing you how to set up and play virtual Boggle in a number of minutes.

The humble spreadsheet is a wondrous thing, and the perfect medium for quickly prototyping a game or two. And when it comes to collaborative spreadsheets, we look no further than [Google Sheets](http://sheets.google.com/). This will be our gaming canvas.

## Step 1: Template

We've made [a template](https://docs.google.com/spreadsheets/d/1iTmSydKlmTd7ul8K8ROGp2qa0nzx18vjwykvmJzG9to/template/preview) to get you started.

[![Click 'Use Template' to get started](/images/blog/boggle-template.png)](https://docs.google.com/spreadsheets/d/1iTmSydKlmTd7ul8K8ROGp2qa0nzx18vjwykvmJzG9to/template/preview)

Click 'Use Template' to take a copy of our spreadsheet, ready for your own alterations.

## Step 2: Enable macros

Google Sheets has a handy script editor that allows us to write JavaScript to control our spreadsheets. Our original version of Boggle used the built in `=RANDBETWEEN()` function, but on our first test, we found that it's random for each player viewing the sheet - not exactly ideal for Boggle!

So we went through each dice in the original game, copied the letters, and wrote a quick script to randomise the dice, and their letters. The code is at the bottom of this post, in case you're interested!

Anyway, how do you use it, you ask. The code is packaged along with the template, so you don't have to write a line! Simply click the green 'BOGGLE' button once, and up will pop a prompt asking for Authorisation. Click through the various steps. Once you're all done, click the 'BOGGLE' button again, and the letters in the grid will randomise!

## Step 3: Play the game

You'll each need:

1. Access to your spreadsheet (click 'Share' on the top-right)
2. Pen & paper
4. A timer (between you)

Click the Boggle button to get some fresh letters, and start the timer for three minutes. Write down as many words as you can find in the grid in that time. Letters can only be used once per word, and have to join horizontally, vertically, or diagonally.

When the time is up, each read out your list of words. Any unique words (ie, not written down by anyone else) gets one point. Any unique 5+ letter words get two points. Add your scores to the scoring table and repeat!


## The code

Below is the JavaScript for the Boggle board. Here's what it does:

1. A set of dice and their possible letters
2. A set of cells to place them in
3. Shuffling of the dice
4. Looping around the dice and placing a random face into each cell

```js
function boggle() {
  var dice = [
    ['P', 'H', 'N', 'I', 'E', 'S'],
    ['A', 'E', 'M', 'C', 'D', 'P'],
    ['U', 'S', 'P', 'E', 'L', 'T'],
    ['X', 'O', 'R', 'F', 'B', 'I'],
    ['D', 'U', 'K', 'T', 'O', 'N'],
    ['K', 'L', 'U', 'E', 'Y', 'G'],
    ['R', 'I', 'U', 'G', 'W', 'L'],
    ['O', 'R', 'M', 'S', 'H', 'A'],
    ['A', 'S', 'L', 'E', 'C', 'R'],
    ['N', 'I', 'E', 'V', 'T', 'G'],
    ['A', 'T', 'B', 'Y', 'I', 'L'],
    ['Z', 'N', 'E', 'D', 'A', 'V'],
    ['O', 'J', 'B', 'M', 'Qu', 'A'],
    ['H', 'Y', 'I', 'F', 'E', 'E'],
    ['O', 'S', 'D', 'E', 'W', 'N'],
    ['T', 'A', 'C', 'O', 'I', 'A'],
  ];
    
  var cells = ['I18', 'J18', 'K18', 'L18','I19', 'J19', 'K19', 'L19', 'I20', 'J20', 'K20', 'L20', 'I21', 'J21', 'K21', 'L21']
    
  dice.sort(() => Math.random() - 0.5);
  for (var i = 0; i < dice.length; i++) {
    SpreadsheetApp.getActiveSheet().getRange(cells[i]).setValue(dice[i][Math.floor(Math.random() * 6)]);
  }
}
```

