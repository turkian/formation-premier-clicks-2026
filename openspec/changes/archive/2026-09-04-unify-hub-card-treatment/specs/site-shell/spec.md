## MODIFIED Requirements

### Requirement: Home hub reaches all content

The site SHALL provide a single home page from which every lesson, the lexique, and every
printable reference sheet is reachable in one click, plus the course description aimed at
prospective club members.

Every entry on the hub SHALL be presented with the same treatment, whatever kind of destination
it leads to: a label naming its kind, its title, and one line stating what the destination is
for. No kind of destination SHALL be presented as a bare title.

#### Scenario: Animator opens the site before a session

- **WHEN** the animator loads the site root
- **THEN** the three lessons, the lexique, and the reference sheet index are each reachable by one link
- **AND** the three lessons are presented as peers, none marked current, dated, or otherwise privileged

#### Scenario: Participant arrives from a printed handout

- **WHEN** a participant loads the site root on a phone
- **THEN** the hub is readable and navigable at phone width without horizontal scrolling
- **AND** the lexique and reference sections are reachable without entering a lesson

#### Scenario: A session card describes its lesson

- **WHEN** a lesson's card is displayed on the hub
- **THEN** it identifies the lesson by its ordinal and its subject
- **AND** it carries no date, schedule, or claim about which session is next

#### Scenario: A reference sheet is offered on the hub

- **WHEN** a reference sheet is listed on the hub
- **THEN** it is presented with the same treatment as a lesson and as a section, carrying its
  séance ordinal — or a label marking it as belonging to no single séance — its title, and the
  line that states what it is for
- **AND** a participant can tell what the sheet is for without opening it

#### Scenario: Entries of the same kind are displayed side by side

- **WHEN** two or more hub entries of the same kind are displayed on one row
- **THEN** they occupy the same height, whether or not their titles wrap to a different number of lines
- **AND** the row reflows to fewer columns at narrower widths rather than scrolling horizontally

#### Scenario: The hub and the reference index list the same sheets

- **WHEN** the hub's list of reference sheets and the reference index are compared
- **THEN** they contain the same sheets in the same order
- **AND** a sheet added to the collection appears in both without either page being edited
