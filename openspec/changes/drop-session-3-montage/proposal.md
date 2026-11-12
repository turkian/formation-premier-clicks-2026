## Why

Session 3 opens on a slideshow of the participants' photographs from sessions 1 and 2 (« Vos
photos des deux premières séances. »). The animateur wants the session to open on the question
instead: « Avez-vous pris des photos depuis la séance 2 ? Qu'avez-vous appris ? ». This is how
session 2 already opens. The montage is dropped, not moved elsewhere in the session.

## What Changes

- **Remove the `diaporama` block** from session 3. Its only screen is `le-diaporama`, with the
  placeholder image `l3-diaporama`, which never had a file.
- Session 3 now opens on the `retour` block, whose first screen is the `bilan` question. Its
  summary « Vos photos d'abord, … » is kept: it now refers to the `bilan` question, as it does in
  session 2.
- The rest of session 3's blocks keep their content and order.
- The exhibition montage on the « Et maintenant ? » screen about showing your pictures is a
  different montage and is not affected.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `lessons`: the requirement « Session 3 answers how to make better photographs » no longer lists
  the participants' montage as session 3's first block. The recap of session 2 comes first.

## Impact

- `src/src/content/lecons/3.yaml`: the `diaporama` block and its separator comment are deleted.
- `openspec/specs/lessons/spec.md`: the block order in the session 3 requirement is updated.
- No component, schema, style, asset or verification-script changes. On the lesson index, the
  block numbers move down by one.
