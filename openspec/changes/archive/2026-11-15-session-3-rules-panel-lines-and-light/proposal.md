# Proposal

## Why

The third screen of session 3's history block (`les-regles-s-ecrivent`) lists the ten "Simple
Rules" of Robinson's chapter IX. They are the least representative part of what the 1860s
actually wrote down: viewpoint and framing precepts, mostly phrased as « jamais ». The aside
already promises « l'équilibre, les lignes, le triangle, l'ombre et la lumière », and the body
covers almost none of it. Research into Lake Price's *On Composition and Chiar-Oscuro* (1860)
and Robinson's *Pictorial Effect in Photography* (1869) gives a fuller, clearer picture: a
principal subject, a dominant direction and its counter-line, triangular groups, varied
repetition, masses of light and shade. That picture is easier for beginners to follow.

## What Changes

- The body is rewritten as a synthesis of both authors, grouped by theme, not by author:
  *Le sujet*, *Les lignes*, *L'ombre et la lumière*. It has eleven bullets in about 80 words.
  No author or source is named in the body.
- **BREAKING (content contract):** the body no longer lists chapter IX's ten rules, keeps no
  prescriptive « jamais », and no longer uses the headings *Le point de vue*, *L'équilibre*,
  *Le cadre*.
- The light-and-shade rules are kept even though the course doesn't teach them elsewhere. This
  block is history: it reports what was relevant at the time, not what the course practises.
- The illustration changes from page 47 (« Simple Rules », the castle) to **page 24** of the
  same 1869 Getty copy. Page 24 has a bare rectangle cut by one diagonal (fig. 2) and a cliff and
  beach built on it (fig. 3): a diagram as simple as the castle, and it illustrates one of the
  new bullets. The caption becomes « Robinson, 1869 — la diagonale ».
- The aside is removed. It only repeated the statement and the body (two authors, then a list
  of topics the body now covers), and its space lets the longer body fit at 4:3.
- Unchanged: claim, credit, deep link, panel layout, and the absence of any pointer to a
  later screen.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `lessons`: the requirement "The third history screen lists Robinson's simple rules" is replaced
  by one in which the screen shows page 24 and a thematic synthesis of Lake Price's and
  Robinson's composition principles.

## Impact

- `src/src/content/lecons/3.yaml`: `les-regles-s-ecrivent` gets a new `corps`, plus new
  `illustration.specification`, `alt` and `valeur`. `id`, `credit` and `priorite` are unchanged.
- `src/public/demos/l3-histoire-robinson-effet.jpg`: replaced by page 24 (archive.org
  `pictorialeffecti00robi`, leaf 30), resized like the current file. The file name is kept, since
  it names the book, not the page.
- No component, schema or script change. No verifier references this screen's text.
