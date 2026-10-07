---
name: Fadhil Saheer
description: A quiet, typography-first personal portfolio with a pixel trainer.
colors:
  paper: "#ffffff"
  ink: "#1a1a1e"
  heading: "#0a0a0a"
  muted: "#6e6e73"
  subtle: "#74747a"
  wash: "#f6f6f7"
  preview-stage: "rgba(0, 0, 0, 0.035)"
typography:
  title:
    fontFamily: '"Geist Variable", ui-sans-serif, system-ui, sans-serif'
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.6
  body:
    fontFamily: '"Geist Variable", ui-sans-serif, system-ui, sans-serif'
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: '"Geist Variable", ui-sans-serif, system-ui, sans-serif'
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.333333
  contact-value:
    fontFamily: '"Geist Variable", ui-sans-serif, system-ui, sans-serif'
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  small: "4px"
  list: "8px"
  preview: "10px"
spacing:
  one: "4px"
  two: "8px"
  three: "12px"
  four: "16px"
  six: "24px"
  seven: "28px"
  eight: "32px"
  nine: "36px"
components:
  text-link:
    textColor: "{colors.heading}"
    typography: "{typography.body}"
  email-copy:
    textColor: "{colors.heading}"
    typography: "{typography.body}"
  list-link:
    rounded: "{rounded.list}"
    padding: "12px"
  list-link-hover:
    backgroundColor: "{colors.wash}"
  return-navigation:
    textColor: "{colors.subtle}"
    typography: "{typography.body}"
  project-preview:
    backgroundColor: "{colors.preview-stage}"
    rounded: "{rounded.preview}"
  page-heading:
    textColor: "{colors.heading}"
    typography: "{typography.title}"
---

# Design System: Fadhil Saheer

## Overview

**Creative North Star: "A quiet personal introduction"**

A white, gray, typography-first portfolio follows the user-pinned Lucas Marques reference. Geist, a narrow reading column, inline links, and borderless work lists keep the attention on the person and their work. This confirmed reference takes precedence over the earlier generated seed 76e6068a.

The small pixel trainer supplies the personal character before the introduction. Motion is restrained: content rises a little through a brief blur, links change quietly, and page changes fade. The implementation remains Astro components with Tailwind; React is confined to the page-mascot island.

**Key Characteristics:**
- White canvas and a compact reading column.
- Geist throughout, with weight and gray tones providing hierarchy.
- Inline navigation and borderless lists.
- A small interactive trainer before the homepage introduction.
- Subtle entrances with reduced-motion support.

## Colors

The palette is neutral and light, with near-black emphasis and two gray text roles. There is no interface accent color; the trainer and existing logos retain their asset colors.

### Neutral
- **Paper** is the page canvas.
- **Ink** is the base text color, underline source, and email feedback background.
- **Heading** marks titles and actionable inline text.
- **Muted** carries paragraphs, descriptions, contact values, and the keyboard focus outline.
- **Subtle** carries dates, platforms, return navigation, and footer metadata.
- **Wash** appears on hovered or focused list links.
- **Preview stage** gives the project thumbnails their pale neutral background.

The global stylesheet also declares an unused rule color; it is deliberately excluded from the normative palette until a component uses it.

## Typography

Geist Variable is the only typeface, with the system sans-serif fallback stack recorded above. The greeting, page titles, and item titles remain the same size as prose. Medium weight provides their hierarchy; no display-size role exists.

Body paragraphs use the muted role. Dates and platform labels use the compact label role; contact values have their own intermediate size. Dates and the live clock use tabular numerals. Inline links have no visible underline at rest. A fine underline with a four-pixel offset appears on hover or keyboard focus. Inline external links reveal a compact 10px outward arrow in muted text gray (#6e6e73), with a light gray (#cccccc) underline; email buttons reveal a copy icon beside their labels in the same states, using a 200ms width/opacity transition.

## Layout

The shared layout is a centered, full-width column with a maximum outer width of 560px. Below the 640px breakpoint, horizontal padding is 24px and top padding is 48px. At and above that breakpoint, horizontal padding is 60px and top padding is 88px, leaving the intended 440px desktop content width. Bottom padding changes from 32px to 36px. The shell has a minimum height of one small viewport and a flex column layout.

Homepage paragraphs are separated by 24px. Subpage return navigation and page headings have 28px bottom spacing. The footer uses an automatic top margin and 80px top padding; its two groups wrap when necessary. Text project rows use 8px inter-row spacing, ventures 12px, contact links 4px, and experience entries 36px. Interactive list surfaces extend 12px beyond the text edge so their internal padding preserves alignment.

The project gallery stays inside the existing reading column: two equal columns from a 360px viewport, one below it, with 16px column gaps and 32px row gaps. Each preview is 5:4; captions sit 8px below, with the title and year sharing a baseline and a 13px description 4px beneath. The text-only “More projects” section starts 48px after the gallery.

The homepage links inline to projects, experience, ventures, and contact. Each of those four subpages shares the return link, modest heading, and footer. Do not add a sidebar or a wide multi-column grid to this composition.

## Elevation & Depth

The surrounding interface remains flat. Project SVG illustrations alone use soft internal drop shadows: `0 5px 5px rgb(26 26 30 / 5%)` on illustration objects and `0 4px 3px rgb(26 26 30 / 6%)` on book artwork; these do not elevate the linked cards themselves. Whitespace and text tone separate content. List surfaces are transparent at rest and acquire the wash color on hover or keyboard focus; they are not permanent cards.

Entrances last 560ms with the soft ease recorded in the sidecar, moving from 8px below with 3px blur and zero opacity to the settled state. List delays range from 80ms to 280ms in 40ms increments. Page transitions fade the content and footer together over 160ms. The footer also joins the entrance sequence with a 240ms delay. Link transitions last 200ms; external arrows move 2px up and right on row hover. Reduced-motion CSS removes animations and transitions, including view transitions.

## Shapes

Project thumbnail artwork is clipped to a 10px rounded rectangle with a permanent pale background; captions remain directly on the white canvas. Most other content has no enclosing shape. Hoverable list surfaces have gently rounded corners; small company logos and the email status use the smaller radius. Venture logos are 36px squares with list-radius corners, while company logos are 18px squares. The footer indicator is a small circle. These shapes support existing content rather than forming a decorative motif.

## Components

- **Trainer avatar:** `Avatar.astro` wraps the React `page-mascot` island with `client:load`. Its default box is 128px. It uses the existing direction and reaction WebP sheets and pixelated rendering. The homepage places it first, offsets its wrapper 24px left, and leaves 12px below it. Preserve the pixel trainer artwork and pointer/reaction behavior.
- **Inline link:** near-black prose with an underline appearing on hover or keyboard focus. Global keyboard focus is a two-pixel muted outline with five-pixel offset and a two-pixel corner radius.
- **Email copy:** an inline text button styled as a link. A compact dark status appears above it after copying; a clipboard failure opens the email app. The status clears after 2200ms and uses an accessible live status role.
- **Return navigation:** a subtle text link with a small curved back arrow, eight-pixel gap, and a minimum height of 32px. Hover changes its text to heading color.
- **Page heading:** medium-weight title followed by a muted description with four-pixel top spacing.
- **Project gallery:** Keep the current six-project order, 2026 dates, short descriptions, and 5:4 pale stages. Preserve the detailed Anton editor, Bloombit books, and Snorlax browser artwork. Use black accents with pale neutral fills and fine outlines, not large black silhouettes. Finance is a compact wallet card: recording an illustrative ₹1,500 repayment changes ₹31,649.50 to ₹33,149.50 as the repayment slides into the ledger and the balance rolls upward through a clipped number window. Never use a progress bar for Finance. Clayo shows a short conversation: the incoming call moves up, Clayo asks who is calling, the caller replies about a delivery, and the call is forwarded. Reveal the conversation in sequence with reversible base-state transitions; never use a progress bar for call screening. Snorlax keeps its stationary browser; the upload ring completes, a check appears, and the new file enters the grid. Snorlax alone uses upload progress before its result; Finance and Clayo animate the actual transaction and conversation; exit transitions have no delay and return smoothly. No looping or unrelated floating motion. Other previews retain their established interactions. Reduced motion removes transition timing.
- **Project row:** OpenVia (2026) and Heartbeat (2022) remain below the gallery as text rows, with title and external arrow on the left, year aligned right, then a muted description and subtle platform label. The entire surface is linked.
- **Experience entry:** compact date, medium-weight role and linked company with a small inline logo, then muted descriptive prose. Entries have no enclosing surface.
- **Venture row:** small existing logo, stacked title and description, and a trailing external arrow. The whole row receives the shared list interaction.
- **Contact row:** heading-colored channel name and a right-aligned muted value with arrow. Long values truncate within the row.
- **Footer:** subtle live India time and domain link, separated across the column and able to wrap.

There are no input fields, filled action buttons, or tag/chip components in the implemented system.

## Do's and Don'ts

### Do:
- Do keep the trainer first on the homepage and use the existing Avatar wrapper.
- Do use the shared Astro layout, Geist, and the existing Tailwind component patterns.
- Do distinguish headings, body copy, and metadata through weight and the documented gray roles.
- Do keep project, venture, and contact lists borderless at rest.
- Do preserve visible keyboard focus and reduced-motion behavior.

### Don't:
- Don't replace the pinned reference with the earlier seed or another visual direction.
- Don't enlarge the modest headings into display typography.
- Don't add permanent card fills, borders, or shadows to the text work lists. The gallery's pale thumbnail frames and internal illustration shadows are the scoped exception.
- Don't turn the inline homepage navigation into a large menu or invent new content sections.

Email copy success crossfades and scales the copy glyph into a green check over 220ms, holds for 2.2 seconds, then reverses the transition. Both glyphs share a fixed-size slot to avoid layout movement. Reduced-motion preferences disable the transition. Feedback is announced through a screen-reader-only live region; no visible popup appears. The check remains visible during confirmation even if the pointer leaves.

All visible page content participates in an entrance group, including the Contact introduction (40ms delay) and Projects closing link (360ms). Contact uses the shared animated EmailCopy control in its introductory paragraph; the Email list row remains a mailto link.

The return control uses a rounded hooked arrow with a 1.8px stroke. Hover or keyboard focus darkens the link and shifts only the arrow 3px left over 300ms, preserving text position and honoring reduced motion.

Experience rows retain their layout while sibling rows fade to 30% opacity over 500ms when an entry is hovered or its link receives keyboard focus. The inner content owns this opacity transition independently of the row entrance animation. Touch devices do not receive hover dimming.

Within an active experience, hovering or keyboard-focusing its company link also fades the date, role prefix, and description to 30%; the company stays fully visible. Company logos remain stationary.
