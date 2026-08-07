# Case Study: KMM Property Maintenance Website Rebuild

**Client:** KMM Property Maintenance (lawn care, landscaping, snow removal, Winnipeg)
**Type:** Full new website build, spec/portfolio build, not yet a closed paid contract
**Status:** Built, live-review-ready. Not yet deployed to a custom domain (see open items).
**Project files:** `sable/projects/kmm-property-maintenance-website/` (own git repo, pushed to
`github.com/rook-06/kmm-property-maintenance-website`)

## The problem

KMM's existing site ran on Jobber's built-in site builder, which doesn't allow any custom code to
be added, so their marketing team couldn't install tracking or analytics tools. There was no way
to measure whether marketing spend was actually working. That's the concrete, provable problem
this project solves, and every major decision below traces back to it.

## Why a full rebuild, not a patch

Jobber's site builder has no setting or workaround to allow custom code. There was no partial fix
available. The only way to unblock the marketing team was to move off that platform entirely and
own the website outright. That constraint shaped almost every other choice in this build.

## Design and feature breakdown

### Tech stack: simple, standard web code, nothing exotic

The single biggest decision behind the whole project. A flashier, more modern build system would
have been faster to build in some ways, but it would have recreated the same problem in a
different shape: a non-technical marketing team can't safely make changes to a site that needs
specialized software just to prepare an edit before it works. Building with plain, standard web
files instead means anyone on KMM's team can open the site's code, read it top to bottom like a
document, and understand what's happening. No developer required for a simple change.

### Tracking setup: the actual fix

Every page on the site pulls its tracking and analytics setup from a single file. Right now that
file is empty, with plain-English instructions written directly inside it. To add Google
Analytics, a Meta (Facebook) ad pixel, or anything else, someone edits that one file, once, and it
takes effect across the whole site immediately. This is the whole rebuild distilled into a single
decision. It's the direct, literal answer to "our old site wouldn't let us track anything," and
it's the first thing worth pointing to when explaining why this project exists.

### Real brand identity, not a stock template look

No generic color scheme. The logo and brand colors were pulled directly from a photo of the
client's own business card. The navy, blue, and gold used throughout the site all trace back to
that real, physical item, not a pre-made palette. The logo itself appears in the navigation, the
homepage banner, and the small icon shown in a browser tab. This is the difference between a site
that could belong to any lawn care company and one that's unmistakably KMM's, a difference worth
pointing out to anyone evaluating this work.

### Site structure: 5 pages, one consistent layout

Home, Services, Portfolio, Reviews, Contact. Every page shares the same header, navigation menu,
and footer, so the site feels consistent no matter where a visitor lands. Real business
information (phone number, service areas, the original services offered) was pulled from the live
Jobber site and double-checked, not invented, before any content was written.

### Portfolio gallery: a new feature

Didn't exist on the original site. Each project card shows a "before" photo with a button to
reveal the "after," a simple, visual way to show real completed work. It's currently live with two
real completed jobs (a fire pit installation and a sod installation), with the original, uncropped
photos kept on file in case they're needed in a different size later.

### Customer reviews: a new feature, with a safeguard built in

Also didn't exist before. Visitors can submit a review directly through the site, but nothing
appears publicly on its own. Every submission is reviewed by someone at KMM first, who adds it to
the site by hand once they've read it. That extra step exists on purpose: it keeps the door open
for real, honest reviews to build up over time, without the risk of a fake or spam review going
live unnoticed.

### Contact forms: already working, not just a mockup

All 3 forms on the site (the free-estimate request, the contact form, and the review form) are
already fully set up to work the moment the site goes live, with no extra setup step needed
afterward. Each one also has a simple, invisible safeguard built in that automatically filters out
spam bots before a submission ever reaches an inbox. Because of that, filling out any form on the
site already feels complete when testing it, not like a placeholder waiting to be finished later.

### A distinctive seasonal touch, and a real design process behind it

A small visual detail that sets the site apart: gentle, drifting decorations near the edges of the
screen (falling leaves, snow, flower petals, or drifting dandelion fluff, depending on the season)
that never cover the actual content and never get in the way of clicking anything. It
automatically turns itself off for visitors whose devices are set to reduce on-screen motion, and
it's disabled entirely on phones so it never feels cluttered on a small screen. Which season is
showing can be changed with a single setting, without touching any of the site's 5 pages.

This feature is also a useful example of the actual design process, not just the finished result.
It went through several real rounds of revision based on feedback before it reached its current
shape:

- The winter snow effect was made noticeably heavier twice after feedback that it looked too
  light. It now reads as real snowfall instead of a light dusting.
- An early version of the spring flower petals looked flat and a little cheap. It was rebuilt with
  real shading and depth so each petal looks three-dimensional instead of like a flat sticker.
- The summer dandelion fluff was originally drawn from the wrong angle entirely, looking more like
  a view straight down the stem than an actual side view of a seed. It was corrected after
  comparing it directly to a real photo of a dandelion seed, down to details like the thin stem and
  the small seed pod at its base.

### Content improvements based on real feedback

After an initial review, feedback came back that the site's "Property Maintenance" service felt
redundant next to the other three. It was removed completely, not just from the main list, but
from every dropdown menu, every footer mention, and every page description that referenced it, so
nothing was left half-updated. Gutter cleaning, which had oddly been listed under snow removal,
was moved to lawn and garden care where it actually belongs, and the snow removal description was
rewritten to specifically mention walkways, driveways, and parking lots instead of vague wording.
The whole change, from feedback received to a fully updated, verified site, happened in one
sitting.

## What shipped (summary)

- 5 pages: home, services, portfolio, reviews, contact, all sharing one consistent layout
- Real brand colors and logo pulled directly from the client's own business card, not a stock look
- All 3 forms fully working and ready to receive real submissions the moment the site goes live
- A working before/after portfolio gallery and a customer review system, both brand-new features
  that didn't exist on the original site
- A distinctive, seasonal decorative touch, refined through several real rounds of feedback and
  checked against real reference photos for accuracy
- Content actively updated based on real feedback after the first review, with nothing left
  half-changed

## Why this is a strong portfolio piece

- Solves one specific, provable problem (the old site couldn't track anything) rather than a vague
  "make it look nicer" request. Every major decision in the build traces back to that one point.
- Shows real range beyond a template: a brand identity built from the client's own materials, not
  a stock look
- Demonstrates fast, thorough follow-through on feedback, both in the writing (the service list
  cleanup) and the design (the seasonal overlay's several revision rounds). Reassuring proof for a
  new client that changes happen quickly and get carried through everywhere, not just in the one
  spot that was pointed out.
- Two genuinely new features (the portfolio gallery, the moderated reviews) show this wasn't just
  a reskin of what already existed
- The seasonal overlay is a distinctive, non-templated visual touch with a real design process
  behind it, a good example of "here's what's possible beyond a generic website"

## Open items before using this externally

- Confirm the contact email with KMM (currently unconfirmed, pulled from public source)
- Decide whether this needs to go live on a real domain before being shown to prospects, or
  whether local screenshots or a preview link are enough for pitching
- If pitching this as a "here's what we can build for you" example rather than a completed KMM
  engagement, be clear about that distinction. This was not a closed paid contract as of
  2026-07-16.
