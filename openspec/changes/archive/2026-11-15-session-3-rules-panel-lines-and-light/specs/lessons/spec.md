# Spec Delta

## ADDED Requirements

### Requirement: The third history screen sums up the 1860s composition principles

The third screen of session 3's history block SHALL be a concept panel showing page 24 of
Robinson's *Pictorial Effect in Photography* (1869) and, beside it, a French synthesis of the
composition principles of William Lake Price (1860) and Robinson (1869), grouped by theme, not by
author, in about 100 words or fewer. The body SHALL NOT name an author or source.

#### Scenario: The diagonal page is shown beside the principles

- **WHEN** the third history screen is displayed in projection
- **THEN** the scan of page 24, a rectangle cut by one diagonal and a cliff and beach built on it,
  appears on the left with its caption « Robinson, 1869 — la diagonale » and its credit
- **AND** the right column shows, in this order, the headings *Le sujet*, *Les lignes* and
  *L'ombre et la lumière*

#### Scenario: Each theme holds its principles

- **WHEN** the principles of the third history screen are read
- **THEN** *Le sujet* holds: one principal subject toward which everything leads the eye; the
  subject slightly away from the exact centre; and in a portrait, the face sharpest, brightest,
  with more room in front of it than behind
- **AND** *Les lignes* holds: one dominant direction with a counter-line to balance it; groups
  built on a triangle, a diagonal or a circle, without the structure showing; a shape repeated
  more faintly; and moving the camera a few metres to balance the frame
- **AND** *L'ombre et la lumière* holds: light and shade gathered in large masses, not scattered
  spots; the light reaching into the dark and the dark into the light; the strongest contrast in
  one place, with soft contours elsewhere; and the proportions of light and shade setting the
  mood, such as mist, storm or full sun

#### Scenario: The principles are reported as history

- **WHEN** the principles of the third history screen are read
- **THEN** the light-and-shade principles are present even though no later screen teaches them
- **AND** no principle names, links to or announces a later screen or block
- **AND** no principle is phrased as a « jamais »

#### Scenario: The screen fits the projection floors

- **WHEN** the third history screen is displayed at 1024 × 768 and at 16:9
- **THEN** the statement, the scan with its caption and every principle are visible
  without scrolling
- **AND** the body stays at the body size

#### Scenario: The rest of the screen is unchanged

- **WHEN** the third history screen is displayed
- **THEN** its statement is « Dans les années 1860, des photographes mettent les règles par écrit —
  pour d'autres photographes. »
- **AND** the screen has no aside
- **AND** the screen keeps its stable deep link `les-regles-s-ecrivent`

## REMOVED Requirements

### Requirement: The third history screen lists Robinson's simple rules

**Reason**: Chapter IX's ten rules are mostly viewpoint and framing prohibitions. They leave out
what the 1860s photographers mainly wrote about: a principal subject, lines and their balance,
the triangle, light and shade. The screen's aside promised those topics. A thematic synthesis of Lake
Price and Robinson is closer to the period and easier for beginners to follow.
**Migration**: Replaced by "The third history screen sums up the 1860s composition principles".
The page 47 scan is replaced by page 24 of the same copy, the four headings by three, and the aside is removed.
