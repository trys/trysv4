---
title: 'Virtual Games: Yahtzee'
date: 2020-04-01
categories: Games
description: 'How to play Yahtzee in a spreadsheet'
---

Following on from [Boggle](/blog/virtual-games-boggle), we're going to set up the classic dice game, Yahtzee. This post will be a step-by-step guide showing you how to set up and play in a couple of minutes.

## Step 1: Template

We've made [a template](https://docs.google.com/spreadsheets/d/1fPskW7hVvbxWcOXo3Zydx8K--d2jXhWUScaTyCmbhMw/template/preview) to get you started.

[![Click 'Use Template' to get started](/images/blog/game-yahtzee-template.png)](https://docs.google.com/spreadsheets/d/1fPskW7hVvbxWcOXo3Zydx8K--d2jXhWUScaTyCmbhMw/template/preview)

Click 'Use Template' to take a copy of our spreadsheet, ready for your own alterations.

## Step 2: Enable macros

The code is packaged along with the template, so you don't have to write a line! Simply click the 'Roll all' button once, and up will pop a prompt asking for Authorisation for this sheet. Click through the various steps. Once you're all done, click the 'Roll all' button again, and the dice will roll!

You'll notice that each time you roll the dice, the colour changes from black/white to white/black. This is to making it clear as to when a dice has been rolled, or it gets quite challenging to work out if you rolled two threes in a row, or the roll didn't work. The code snippet and explanation is at the bottom of this post, if you're interested!

## Step 3: Play the game

You have three rounds of rolling. Press 'Roll all' to roll the five dice for your first round. Keep your best dice, depending on the row you're going for; I'll run through all the options in a moment.

For the next round of rolling, click on the dice face graphics (always sixes) that you'd like to roll again, don't press the ones you'd like to keep. Do the same again for the final round (if you wish to roll any again).

Count up your score and add them to the appropriate section of the score sheet, either by typing in the score, or clicking the tickbox for the set-score rows.

### The scoring options

- Aces: How many ones did you roll
- Twos: How many twos did you roll
- Threes: How many threes did you roll
- Fours: How many fours did you roll
- Fives: How many fives did you roll
- Sixes: How many sixes did you roll

If your total for the above equals 63 or above (rolling an average of three of each), you'll automatically get a 35 point bonus. Very handy.

- 3 of a kind: if you've rolled three of the same numbers, total up **all** the dice and score it here
- 4 of a kind: if you've rolled four of the same numbers, total up **all** the dice and score it here
- Small straight: tick to score 30 if you've rolled:
  - 1, 2, 3, 4
  - 2, 3, 4, 5
  - 3, 4, 5, 6
- Large straight: tick to score 40 if you've rolled:
  - 1, 2, 3, 4, 5
  - 2, 3, 4, 5, 6
- Yahtzee: tick to score 50 if you've rolled five of the same numbers
- Chance: total up all the dice

If you don't achieve any of the above in a go, you'll have to forfeit one of your options, or put the total in chance. A good tactic is to forfeit your 'Aces' (you don't lose much), and then your 'Yahtzee' (you're unlikely to get this anyway). There isn't really a forfeit option on the template, so you might wish to leave the cell empty, or colour it in.

If you (somehow) manage to get two Yahtzee's in one game, tick Yahtzee Bonus for 100 points.

After 13 rounds, your winner should be visible! 🎉

## The code

Each dice need its own function as you can't pass parameters from the spreadsheet, so we have a number of similar functions at the bottom. They all call the `rollDice` function with three parameters:

1. The sheet name
2. The cell to place the random number
3. The cell to place an alternating number

This alternating number allows us to conditionally format the preceeding cell, and switch between black/white and white/black.

```js
function randomBetween(start, end) {
  return Math.floor(Math.random() * end) + start;
}

function rollDice(sheet, c, c2) {
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet).getRange(c).setValue(randomBetween(1, 6));
  SpreadsheetApp.getActiveSheet().getRange(c2).setValue(SpreadsheetApp.getActiveSheet().getRange(c2).getValue() == '0' ? '1' : '0');
}

function Yahtzee1() { rollDice('Yahtzee', 'J4', 'K5'); }
function Yahtzee2() { rollDice('Yahtzee', 'J7', 'K8'); }
function Yahtzee3() { rollDice('Yahtzee', 'J10', 'K11'); }
function Yahtzee4() { rollDice('Yahtzee', 'J13', 'K14'); }
function Yahtzee5() { rollDice('Yahtzee', 'J16', 'K17'); }
function YahtzeeAll() {
  Yahtzee1();
  Yahtzee2();
  Yahtzee3();
  Yahtzee4();
  Yahtzee5();
}
```