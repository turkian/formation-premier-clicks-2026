# Spec Delta

## ADDED Requirements

### Requirement: The session 3 manual-mode recap does not read M as full manual

The session 3 recap panel on manual mode with ISO auto SHALL present it, in its projected
headline, as a half-automatic mode and state who decides what: the photographer keeps the
aperture and the speed, the camera chooses the ISO. The headline SHALL NOT name `M`. The panel
SHALL name `M` in its body, as the position on the mode dial, together with ISO auto.

#### Scenario: The manual-mode recap panel is projected

- **WHEN** the session 3 recap panel on manual mode with ISO auto is displayed
- **THEN** its headline calls the mode half-automatic
- **AND** its headline states that the photographer keeps the aperture and the speed, and that
  the camera chooses the ISO
- **AND** its headline does not contain `M`
- **AND** its body names `M` with ISO auto as where to find the mode on the dial

#### Scenario: The screen is listed or opened in a tab

- **WHEN** the screen's title is shown in the session's list of screens or in the browser tab
- **THEN** it does not open with `M`

#### Scenario: A participant follows the link months later

- **WHEN** someone opens `/lecons/3/retour/rappel-m-iso-auto/`
- **THEN** the panel is still at that address
