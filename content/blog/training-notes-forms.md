---
title: "Training notes: Forms"
year: 2017
date: 2017-10-11
categories: Training
---

I recently carried out the inaugural training session for a couple of developers in Tomango and a neighbouring brand agency. The syllabus is going to be based around web fundamentals.

It was a very new experience to conduct such a formal session but it seemed to go down pretty well. I’ve noted down lots of tweaks to make in preparation for the next session in three weeks time. Below are my (pretty rough) notes for the ‘talky’ bit of the session, we followed up with a coding task.

---

## Why use a form?
- Getting user-generated data to and from a server.
- It links client and server side.
- There are accessibility benefits like keyboard shortcuts, tabindex, outlines
- There are user benefits like autocomplete
- They are system optimised, datepickers, email fields etc
- They are standardised forms of input

It’s possible (and arguably too easy) to create psuedo-forms with JS. But they fail accessiblity and they don’t leverage web standards.

## Actions
A standard form attribute is `action`. It tells the browser where to submit the form, kindof like a href on an `<a>` tag. If omitted, it submits to the current URL.

## Methods
Methods tell the browser which HTTP method to use. There are two main ones. `GET` and `POST`. They both cause a full page reload (by default).

A `GET` request passes the submitted data into the URL of the next page. Search is a good example of this. If you don’t mind the data being public (or messed with), `GET` is a good option. All the data will be visible in users history, so you wouldn’t want to expose passwords etc.

`POST` requests are more private. They don’t expose the data to the URL so they’re not shareable in the same way `GET` requests are. This makes them more useful for login forms.

There are three more HTTP request types but they’re not usable on forms (yet). They are `PUT`, `HEAD` and `DELETE`. They are used in REST APIs. Example

```
Add a user      - POST /users/             -> POST   /users/
Get the user    - GET  /users/trys/        -> GET    /users/trys
Edit the user   - POST /users/trys/edit/   -> PUT    /users/trys
Delete the user - POST /users/trys/delete/ -> DELETE /users/trys
User existence  - GET  /users/trys/        -> HEAD   /users/trys
```

The method describes the indent of the request, a search `GET`s data from the server, and login `POST`s data to the server.

## Input types
The default input type is text. Common others are number, email, password, hidden, checkbox, radio & submit. If you omit the type or put an invalid type, it falls back to text. This is the great ‘progressive enhancement’ feature of forms. There are other form ‘inputs’ such as textarea, button, select.

Run through inputs on MDN: [input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input), [select](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select), [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) & [button](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)

## Form layout
### ‘Required’ attributes
Although there are not strictly mandatory attributes, there are attributes are necessary on each input to provide basic functionality.

```html
<input name="username">
```

All inputs arrive on the server as a key/value pair. name is the key. Whatever you type into the input is the value. For a Google search, `q` is the name attribute, which translates in the URL to `?q=123`.

```html
<label for="username">Username</label>
<input name="username" id="username">
```

`id` is required to link a label to an input with for. This is crucial for accessibility, even if you have placeholders. If you click on a label linked to an input, it focuses on the input. Label wrapping does this too

```html
<input type="hidden" name="post-type" value="post">
```

`value` pre-fills the input. This is useful for defaults, hidden inputs and re-filling after failed validation.

```html
<label for="username">Username</label>
<input name="username" id="username" placeholder="Batman, Robin...">
```

`placeholder` is used to provide an example of the expected input. It only shows when the input is empty. It’s often ‘abused’ by designers to replace the need for a label. Never remove the label, hide it using screen-reader safe CSS. `display: none` is not read by screenreaders so hiding a label like that is useless. Placeholder styling is a bit buggy, some browsers take the colour value straight from the `color` of the input, others take it and make it a bit lighter to differentiate.

### Checkboxes/radios
The input types checkbox/radio are a bit different as you tend to have multiple input tags. Either wrap the input in the label or, write it as:

```html
<input name="contact" type="radio" id="contact_2" value="Phone"><label for="contact_2">Phone</label>
<input name="contact" type="radio" id="contact_1" value="Email"><label for="contact_1">Email</label>
<input name="contact" type="radio" id="contact_3" value="Pigeon"><label for="contact_3">Pigeon</label>
```

Checkboxes have multiple inputs and multiple outputs, so you need to add [] to the name. This’ll arrive on the server as an ‘array’ (of sorts).

```html
<input name="toppings[]" type="checkbox" id="toppings_2" value="Mozzerella"><label for="toppings_2">Mozzerella</label>
<input name="toppings[]" type="checkbox" id="toppings_1" value="Tomato"><label for="toppings_1">Tomato</label>
<input name="toppings[]" type="checkbox" id="toppings_3" value="Chicken"><label for="toppings_3">Chicken</label>
```

### Accessibility
tabindex can be used, don’t if you can avoid it. It gets super confusing and difficult to manage. Leave the broweser to do its job.

Provide an `<input type="submit">` or `<button type="submit">Submit</button>`. Some browsers get grumpy if they’re not present. Plus: accessibility \o/

### Styling
Styling can be a pain. There are a load of incompatibilities between browsers. Some input types aren’t supported at all and fallback to text. But it can be ‘reset’ pretty well, you just have to be a bit creative about styling techniques.

`:invalid`, `:focus`, `:active`, `:checked` can all be used in CSS to target an input with a given state.

### Task: Newsletter sign up form.
We’ll make a Mailchimp-esque form with first name, last name, email (required) and a subscribe button. It should POST to itself and catch invalid states. It should be responsive (1 col on mobile, 4 col on desktop).

### Future things for future weeks
Grabbing data in PHP, filtering data safely, catching/inspecting forms in JS. event.PreventDefault() – how not to use it. Event bubbling/delegation. Security. OTK.