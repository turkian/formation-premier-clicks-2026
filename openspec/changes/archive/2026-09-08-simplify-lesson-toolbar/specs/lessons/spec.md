## REMOVED Requirements

### Requirement: Keyboard navigation, block index, and position indicator

**Reason**: The in-lesson block-index affordance (the "Index" button, the `i` keyboard shortcut,
and the block-jump modal it opened) is removed — see proposal.md. Keyboard navigation, the
fullscreen toggle, and the position indicator continue and are restated below as a narrower
requirement, alongside a new requirement covering the toolbar's remaining controls and their
navigation targets.

**Migration**: An animator who needs to skip ahead mid-session no longer opens an in-lesson index.
They use the toolbar's home control to return to the site root, then re-enter the lesson at the
desired block from that lesson's summary page.

## ADDED Requirements

### Requirement: Keyboard navigation and position indicator

A lesson SHALL be navigable entirely from the keyboard: forward and backward through screens and
panel states, and into fullscreen. The current block and the lesson's total number of blocks SHALL
be visible on every screen.

#### Scenario: The animator advances through a block

- **WHEN** the animator presses the forward key on a panel with remaining states
- **THEN** the panel advances to its next state rather than to the next screen

#### Scenario: The animator paces the evening without notes

- **WHEN** any lesson screen is displayed
- **THEN** the current block's position within the lesson is readable on screen

### Requirement: Toolbar controls each have one direct, unambiguous target

A lesson screen's toolbar SHALL present exactly three controls: a fullscreen toggle, a control
that returns to that lesson's first screen, and a control that leaves to the site root. Clicking
or tapping the slide anywhere outside these three controls SHALL NOT change the fullscreen state
or navigate away from the current screen.

#### Scenario: The fullscreen control is used

- **WHEN** the animator activates the toolbar's fullscreen control, by click or by keyboard
- **THEN** the browser enters fullscreen if it was not already in fullscreen, or exits fullscreen
  if it was
- **AND** no other control and no click elsewhere on the slide triggers this behavior

#### Scenario: The animator restarts the lesson

- **WHEN** the animator activates the toolbar's start-of-lesson control
- **THEN** the lesson's first screen — the first screen of its first block — is displayed

#### Scenario: The animator leaves the lesson

- **WHEN** the animator activates the toolbar's home control
- **THEN** the site root is displayed

#### Scenario: The slide is clicked away from the toolbar

- **WHEN** a participant or the animator clicks anywhere on the slide body, outside the toolbar's
  three controls
- **THEN** no navigation occurs
- **AND** the fullscreen state is unchanged
