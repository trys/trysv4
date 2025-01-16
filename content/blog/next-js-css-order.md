---
title: Fixing Next.js's CSS order using cascade layers
year: 2024
date: 2024-08-23
categories: Web
tags: 
  - next.js
  - css
---

Somewhere in the patch/minor releases between `14.0.2` and `14.2.0`, [Next.js](https://nextjs.org/) made a _fundamental_ change to the way it orders CSS. More problematically, it also introduced a discrepancy between development and production builds, where the CSS chunks would be in entirely different orders between the environments. Incredibly, this is documented, and intentional:

{{< longquote >}}
CSS ordering can behave differently in development mode, always ensure to check the build (next build) to verify the final CSS order.
<cite>[Next.js Documentation](https://nextjs.org/docs/app/building-your-application/styling/css)</cite>
{{</ longquote >}}

Seems like recipe for disaster, right?

Theoretically, this is controllable by the developer:

{{< longquote >}}
The CSS order is determined by the order in which you import the stylesheets into your application code.
<cite>[Next.js Documentation](https://nextjs.org/docs/app/building-your-application/styling/css)</cite>
{{</ longquote >}}

But in the real world, it's not the case. In development mode, CSS files are named `layout.css` and `page.css` etc. and are written in the HTML in that order. However, in a production build, the CSS is outputted in the totally opposite order with a different naming convention.

The issue is, in circumstances where specificity is matched between selectors, the source order of the CSS takes precedence. Not a problem if it's consistent, but very much a problem if it changes depending on your environment.

Their "solution" also flies in the face of the web platform:
> Prefer CSS Modules over global styles

No thanks.

How this is an acceptable 'feature' is beyond me. To say that the "order is determined by the order you import the stylesheets", only holds water if Next consistently renders page → layout, or layout → page. Anyway, Friday afternoon rant over.

## How do you fix this mess?

I paired with my good friend and colleague [Szymon Pajka](https://szymonpajka.com/) on this problem, and after much digging into the import order problem and trialling `:where`, he suggested we look at [CSS Cascade Layers](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_layers).

Cascade Layers allow developers to create & control multiple 'layers' of cascade/specificity. In this example below, we can write our reset styles within a `@layer` block, and then choose the have them calculated before, or after the theme/components etc. If this CSS was then chunked and split up by a bulid process, it wouldn't matter which order the files were loaded in, they'd always follow the format of `reset, theme, components`.

```css
@layer reset, theme, components;

@layer reset {
    /* Reset styles */
}

@layer theme {
    /* Theme styles */
}

@layer components {
    /* Component styles */
}
```

Any unlayered styles (existing styles without a wrapping layer block), will automatically 'beat' any cascade layers you've set up. So, rather than wrapping every component in: `@layer component {}`, we can leave them as unlayered, knowing they'll beat our reset, theming, design system CSS files.

Amazingly, this also works in SCSS (we did _not_ think it would):

```scss
@layer reset, designSystem, theme, utopia, utilities;

@layer reset {
    @import './reset.scss';
}

@layer designSystem {
    @import '@motorway-design-system/src/styles/reset.scss';
    @import '@motorway-design-system/src/styles/base.scss';
}

@layer theme {
    @import '@motorway-design-system/src/styles/theme/light.scss';
}

@layer utopia {
    @import './utopia.scss';
}

@layer utilities {
    @import './utilities';
}
```

Wrapping the imports keeps the control for these layers in one file, making adoption of the system more straightforward for new engineers, and most importantly, consistent across environments.

Thanks again to [Szymon](https://szymonpajka.com/) for his help pairing on this. There's little better than writing CSS with someone else who adores and appreciates the language in the same way you do. 🫶
