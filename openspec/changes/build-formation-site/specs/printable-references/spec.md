## Purpose

The reference sheets participants keep: an extensible set of pages that each read well on screen
and print clean on a single Letter sheet, so the club can add a new concept later by adding one
page.

## ADDED Requirements

### Requirement: References are a set of independent one-page sheets

The reference section SHALL be a collection of individual sheets listed in an index, not a single
combined page. Each sheet SHALL cover one subject and SHALL fit on one Letter page when printed.

#### Scenario: A participant prints the sheet they need

- **WHEN** a participant opens a reference sheet and prints it
- **THEN** the output is a single Letter page
- **AND** no content is cut off or continued onto a second page

#### Scenario: The club adds a new reference subject later

- **WHEN** a new sheet is added to the collection
- **THEN** it appears in the reference index without any other page being edited
- **AND** it prints under the same one-page rule as the existing sheets

### Requirement: The formation's own reference sheets are included

The collection SHALL include, at minimum: the three aide-mémoire sheets adapted from the
participants' cards, the « ma photo est ratée » diagnostic tree, and the export recipes.

#### Scenario: A participant looks up why a photo failed

- **WHEN** a participant opens the diagnostic sheet
- **THEN** each symptom, its causes, and its corrections are present on the single page

#### Scenario: A participant needs the starting recipe

- **WHEN** a participant opens the starting-recipe sheet
- **THEN** the default mode, the ISO limit, the autofocus setting, the exposure compensation
  reminder, and the file format recommendation are all present

### Requirement: Printed output excludes site furniture

When a reference sheet is printed, the output SHALL contain only the sheet's own content.

#### Scenario: A sheet is sent to a printer

- **WHEN** a reference sheet is printed
- **THEN** site navigation, links, controls, and interactive elements are absent from the output
- **AND** the sheet's title and the club attribution are present

### Requirement: Reference sheets are readable on a phone

Each reference sheet SHALL be legible and navigable at phone width, since a participant is as
likely to consult it on a phone in the field as on paper.

#### Scenario: A participant consults a sheet while shooting

- **WHEN** a reference sheet is opened at phone width
- **THEN** its full content is readable without horizontal scrolling
- **AND** any table reflows or scrolls within its own bounds rather than widening the page
