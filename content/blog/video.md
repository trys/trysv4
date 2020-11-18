---
title: Video
date: 2018-01-10
categories: Web
---


## References: 

- [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) 
- [Video Tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)

## Responsive embeds

Youtube and Vimeo embeds are the easiest way to get video onto the web. We can use the `padding-bottom` method to make videos responsive:

```html
<figure class="embed">
	<iframe width="560" height="315" src="https://www.youtube.com/embed/H0XScE08hy8" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen="1"></iframe>
</figure>
```

```css
.embed {
	position: relative;
	height: 0;
	padding-bottom: 56.25%;
}

.embed iframe {
	position: absolute;
	height: 100%;
	width: 100%;
	left: 0;
	top: 0;
}
```

## WordPress

WordPress does a pretty great job with embedded videos to begin with. There's a filter to wrap all embedded content in a `<figure class="embed">` tag. Combined with the above CSS, authors can add responsive video with just a single YouTube URL.

```php
add_filter( 'embed_oembed_html', function($html) {
	return '<figure class="embed">' . $html . '</figure>';
});
```

## Video tag

If you have the video file and want more control than a YouTube embed, use the video tag. It has some handy parameters:

- src - this is the path to the video file
- autoplay - whether the browser will play it automatically, this is constantly changing in mobile browsers
- muted - is there sound. This has a bearing on autoplay
- controls - do you want to show native controls
- loop - should the video stop at the end
- preload - should the browser load the video before the user hits play, costly for bandwidth but useful if you're definitely playing the video
- poster - an image to be shown before the video starts or after it ends

## Inside the video tag

Like with all HTML elements, it fails gracefully. You can put content within the `<video></video>` tag and this will be displayed on browsers that don't support video. You can even put in `<track>` tags for subtitles.

The `<source>` tag is the most common element to put within a `<video>` element. It lets you provide multiple versions of the video for different browsers and screen sizes. It works in much the same way as the `<picture>` element. The browser will use the first compatible file type so you want to stack them in the right order.

```html
<video>
  <source src="video.webm" type="video/webm">
  <source src="video.mp4" type="video/mp4">
  Your browser doesn't support HTML5 video tag.
</video>
```

In this example, `.webm` will be used in Chrome, Firefox and Edge. Safari and IE will fall back to `.mp4`.

## Formats

`.webm` is a neat new format (along with `.webp`) for tiny movies and images on the web. There are some online converters along with 'Handbrake' that'll convert from `.mp4` to `.webm`. Using the `<source>` tag with `.webm` allows users with new browsers to save bandwidth.

## Object-fit

`Object-fit` is like `background-size` for video/images. Most of the time, the aspect-ratio preservation on video/images is really useful. Occassionaly though, it's useful to set a fixed height and width. This leads to the media being stretched. This is where `object-fit` comes in:

- `object-fit: cover` sets the media to fill the longest edge.
- `object-fit: contain` sets the media to fill the shortest edge.
- There is also a `background-position` counterpart in `object-position`.

## Task - Video player

We're going to make a basic video player with custom controls for play/pause, fullscreen and mute. You can't style the native video controls so this is a solution to a design problem.

Using the following markup and CSS, make a video player:

```html
<div class="player">
	<video>
		<source src="video.webm" type="video/webm">
		<source src="video.mp4" type="video/mp4">
	</video>

	<button type="button" class="player__play">Play/Pause</button>
	<button type="button" class="player__full">Fullscreen</button>
	<button type="button" class="player__mute">Mute</button>
</div>
```

```css
.player {
	max-width: 400px;
	margin: 0 auto;
}

.player video {
	width: 100%;
}
```

1. Add click events to the three buttons
2. For the play button:
	1. Check if the video is paused
	2. Play if it is
	3. Pause if it isn't
	4. Provide visual feedback
3. For the mute button:
	1. Toggle the muted property
	2. Provide visual feedback
4. For the fullscreen button:
	1. Check if there is a fullscreen element already with `document.fullscreenElement || document.webkitFullscreenElement`
	2. If not:
		1. Check for the method: `video.requestFullScreen`, then call it
		2. If not, check for the method: `video.webkitRequestFullScreen`, then call it
	3. If so:
		1. Check for the method: `document.cancelFullScreen`, then call it
		2. If not, check for the method: `document.webkitCancelFullScreen`, then call it
