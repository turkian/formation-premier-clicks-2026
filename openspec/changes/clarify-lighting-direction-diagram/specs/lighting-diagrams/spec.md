## Purpose

Diagrams that show a camera, a light source, and a subject positioned relative to one
another — starting with the four window-light positions — must be readable at a glance
by someone who was not in the room when it was explained.

## ADDED Requirements

### Requirement: Roles are depicted with distinct iconography

A lighting-position diagram SHALL depict the camera, the light source, and the subject
each with an icon appropriate to its role, not an unlabeled geometric shape (a plain
rectangle, circle, or rotated blob standing in for one of them).

#### Scenario: A participant reads the diagram without narration

- **WHEN** a lighting-position diagram is displayed on its own
- **THEN** the camera, the light source, and the subject are each identifiable by their
  icon alone, without needing the accompanying caption to say which shape is which

### Requirement: The light path and the camera's sightline are visually distinct

When a lighting-position diagram shows both the path of light from the source to the
subject and the camera's sightline to the subject, the two lines SHALL use different
visual treatment (for example, color and dash pattern) so they cannot be mistaken for
one another.

#### Scenario: A diagram shows both a light source and a camera aimed at the subject

- **WHEN** a lighting-position diagram renders the light-source-to-subject path and the
  camera-to-subject sightline together
- **THEN** the two lines are visually distinguishable from each other at a glance

### Requirement: The camera's facing is explicit, not inferred from rotation alone

A lighting-position diagram SHALL convey which way the camera is pointed through an
explicit visual cue on the camera icon itself, not solely through the rotation of an
otherwise unmarked shape around the subject.

#### Scenario: The camera is placed at an arbitrary angle around the subject

- **WHEN** a lighting-position diagram places the camera at any of its supported angles
- **THEN** the diagram shows, on the camera icon itself, which direction it is aimed

### Requirement: Iconography is consistent across every lighting-position diagram

Every lighting-position diagram SHALL depict a given role (camera, light source,
subject) with the same icon and the same line styling as every other lighting-position
diagram in the site.

#### Scenario: A second lighting-position diagram is added later

- **WHEN** a new lighting-position diagram is added to a lesson
- **THEN** it depicts the camera, the light source, and the subject using the same
  icons and line styles as existing lighting-position diagrams
