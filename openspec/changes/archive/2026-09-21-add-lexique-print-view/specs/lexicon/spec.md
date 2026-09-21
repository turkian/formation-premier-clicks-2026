## ADDED Requirements

### Requirement: Printing a brand page shows only that brand's content

When a brand's lexique page is printed, the output SHALL contain only that brand's own content —
its title, its quick-menu and RAW facts, every numbered section with its entries, menu paths, and
notes, and the "si vous ne trouvez pas" troubleshooting list. The brand switcher, the framing note
explaining why brands differ, the reading-instructions paragraph, the search control, and site
navigation and footer chrome SHALL be omitted from the printed output. The remaining content
SHALL be laid out as compactly as it allows, without omitting any entry, menu path, or note to
force a shorter page count.

#### Scenario: A participant prints their brand page

- **WHEN** a participant prints a brand's lexique page
- **THEN** the printed output shows the brand's title, its quick-menu and RAW facts, every
  numbered section with its entries and notes, and the "si vous ne trouvez pas" list
- **AND** the brand switcher, the framing note about why brands differ, the reading-instructions
  paragraph, the search box, and the site navigation and footer are absent from the printed output

#### Scenario: A content-heavy brand spans more than one printed page

- **WHEN** a brand's content does not fit on a single printed page even at the compact layout
- **THEN** the output spans as many pages as needed
- **AND** no entry, menu path, or note is dropped to force a single-page fit
