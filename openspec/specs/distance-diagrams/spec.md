# distance-diagrams Specification

## Purpose

Diagrams that show a subject positioned at some distance from the photographer along a
ground line — starting with mise au point and profondeur de champ — must read as "how far
from you," not as an unanchored spot, to someone who was not in the room when it was
explained.

## Requirements

### Requirement: The ground line is anchored to an explicit photographer marker

A distance diagram (one that positions a subject or a point of focus along a ground line
representing distance from the photographer) SHALL anchor that line to an explicit marker
representing the photographer, not leave the line's near end unmarked.

#### Scenario: A participant reads the diagram without narration

- **WHEN** a distance diagram is displayed on its own
- **THEN** the ground line's near end shows a marker identifiable as the photographer
- **AND** the diagram reads as a distance from that marker, not as an unanchored position

### Requirement: Iconography is consistent across every distance diagram

Every distance diagram SHALL depict the photographer marker with the same icon and the
same position convention (anchored at the ground line's near end) as every other distance
diagram in the site.

#### Scenario: A second distance diagram is added later

- **WHEN** a new distance diagram is added to a lesson
- **THEN** it depicts the photographer marker using the same icon and position convention
  as existing distance diagrams
