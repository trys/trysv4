---
title: Fancy Slack metadata
year: 2019
date: 2019-05-02 17:00:00
categories: Web
image: /images/blog/fancy-slack-meta-tags.png
---

Here's a tiny lesson on generating those fancy extra bits of metadata shown below a link in Slack.

![Slack metadata](/images/blog/fancy-slack-meta-tags.png)

Officially they are labels for Twitter, but I've never seen them used by the social network. You add them with the following meta tags:

```html
<meta name="twitter:label1" value="Posted in" />
<meta name="twitter:data1" value="Web" />
<meta name="twitter:label2" value="Reading time" />
<meta name="twitter:data2" value="10 minutes" />
```

---

For an added [Hugo](https://gohugo.io/) bonus, here's how I generate the blog tags on my site:

```html
{{- if (.IsPage) and eq .Section "blog" -}}
<meta name="twitter:label1" value="Posted in" />
<meta name="twitter:data1" value="{{ .Params.categories }}" />
<meta name="twitter:label2" value="Reading time" />
<meta name="twitter:data2" value="{{ .ReadingTime }} minute{{ if not (eq .ReadingTime 1) }}s{{ end }}" />
{{- end -}}
```
