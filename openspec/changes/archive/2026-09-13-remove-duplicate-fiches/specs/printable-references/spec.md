## MODIFIED Requirements

### Requirement: References are a set of independent one-page sheets

The reference section SHALL be a collection of individual sheets, not a single combined page.
Each sheet SHALL cover one subject and SHALL fit on one Letter page when printed.

#### Scenario: A participant prints the sheet they need

- **WHEN** a participant opens a reference sheet and prints it
- **THEN** the output is a single Letter page
- **AND** no content is cut off or continued onto a second page

#### Scenario: The club adds a new reference subject later

- **WHEN** a new sheet is added to the collection
- **THEN** it appears on the home page's reference list without any other page being edited
- **AND** it prints under the same one-page rule as the existing sheets

### Requirement: The formation's own reference sheets are included

The collection SHALL include, at minimum: the starting-recipe sheet adapted from the
participants' cards, and the « ma photo est ratée » diagnostic tree.

#### Scenario: A participant looks up why a photo failed

- **WHEN** a participant opens the diagnostic sheet
- **THEN** each symptom, its causes, and its corrections are present on the single page

#### Scenario: A participant needs the starting recipe

- **WHEN** a participant opens the starting-recipe sheet
- **THEN** the default mode, the ISO limit, the autofocus setting, the exposure compensation
  reminder, and the file format recommendation are all present
