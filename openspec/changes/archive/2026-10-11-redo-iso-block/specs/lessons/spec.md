## ADDED Requirements

### Requirement: The ISO block explains ISO from film to sensor before practice

Session 2's ISO block SHALL open with two explanation screens. The first SHALL define ISO from
the film era: a sensitivity chosen by buying a roll of film, faster films reaching a correct
exposure with less light and showing more grain. The second SHALL explain ISO in a digital
camera as a chain — light collected by the sensor, a weak analog signal, its amplification, its
conversion to numbers — and SHALL state that the sensor has a single sensitivity and that ISO
sets the amplification, which the block calls the « volume ». The everyday word « sensibilité »
MAY remain in use elsewhere on the site.

#### Scenario: The block is read in order

- **WHEN** the ISO block of session 2 is read from its first screen
- **THEN** its first screen defines ISO and connects it to film
- **AND** its second screen shows the digital chain from light to numbers and names ISO as an
  amplification
- **AND** its third screen is an « appareil en main » exercise

#### Scenario: The film screen is read months later

- **WHEN** the film screen is displayed
- **THEN** it states that on film the sensitivity came with the roll and that faster films showed
  more grain
- **AND** it does not use « soir » or « soirée »

### Requirement: The ISO block lets participants see ISO change brightness

The ISO block's first « appareil en main » exercise SHALL have participants switch to manual mode
(`M`), keep one aperture and one shutter speed, turn ISO auto off, take the same photograph at a
low, a middle and a high ISO, and compare the brightness. Its last step SHALL turn ISO auto back
on. It SHALL provide a phone equivalent.

#### Scenario: A participant follows the exercise

- **WHEN** the first ISO exercise is displayed
- **THEN** its steps name manual mode `M`, a fixed aperture and a fixed speed
- **AND** they ask for at least three ISO values from low to high, with only the ISO changing
- **AND** the last step turns ISO auto back on

#### Scenario: A participant uses a phone

- **WHEN** the first ISO exercise is displayed
- **THEN** it carries a phone equivalent using a `Pro` or manual mode's ISO control

### Requirement: The ISO block places the cause of noise in the light collected

The ISO block SHALL state that film grain and digital noise look alike but do not come from the
same place, that digital noise comes from too little light collected, and that ISO makes visible
the noise already present. It SHALL state that the best ISO is the one that exposes the subject
correctly, and that under-exposing to avoid noise does not help. No screen of the block SHALL
present ISO as the cause of noise.

#### Scenario: The noise panel is displayed

- **WHEN** the screen on where noise comes from is displayed
- **THEN** its headline contrasts film grain with digital noise
- **AND** it names the lack of light collected as the cause of noise
- **AND** it states « le meilleur ISO est celui qui expose correctement votre sujet », or an
  equivalent sentence

#### Scenario: A participant proves it on their own camera

- **WHEN** the second ISO exercise is displayed
- **THEN** it asks for one photograph at a high ISO of a scene with both lit and dark areas
- **AND** it asks the participant to zoom in on the camera screen and compare the dark areas with
  the lit ones
- **AND** it carries a phone equivalent

### Requirement: The ISO block ends on manual mode with ISO auto

The ISO block's last screen SHALL present manual mode with ISO auto: the photographer sets the
aperture and the speed, and the camera sets the ISO, within a stated upper limit. It SHALL
present this as the mode for when both the aperture and the speed matter, and SHALL NOT replace
`A` or `Av` as the recommended default mode. It SHALL introduce exposure compensation — the `+/−`
button, asking the camera for a brighter or darker result than it chose — and state that in `M`
with ISO auto it moves the ISO.

#### Scenario: The last screen of the block is displayed

- **WHEN** the ISO block's last screen is displayed
- **THEN** it states that in `M` with ISO auto the photographer keeps the aperture and the speed
  and the camera chooses the ISO
- **AND** it names an upper ISO limit
- **AND** it introduces the `+/−` button and states that, in `M` with ISO auto, it moves the ISO
- **AND** it presents `A` or `Av` as the starting point

### Requirement: Exposure compensation acts on what the camera still decides

Where the site describes exposure compensation in `M`, it SHALL present it as acting on what the
camera still decides: the ISO in `M` with ISO auto, and nothing in `M` with a fixed ISO. No lesson
screen, brand page or reference sheet SHALL state without qualification that compensation does
nothing in `M`, or that in `M` the camera decides nothing.

#### Scenario: The ISO block's last screen mentions compensation

- **WHEN** the « M et l'ISO auto » screen introduces the `+/−` button
- **THEN** it states that in `M` with ISO auto, compensation moves the ISO

#### Scenario: A brand page or sheet mentions compensation in M

- **WHEN** a brand page or the « Avant de déclencher » sheet mentions compensation in `M`
- **THEN** it says that with ISO auto on, compensation moves the ISO on most recent bodies, and
  that with a fixed ISO it does nothing

### Requirement: Session 2 ends like session 1, right after the ISO block

Session 2 SHALL end after its ISO block, with no break, modes block, workshops or diagnostic block,
on a closing block shaped like session 1's: a reference panel on exposure compensation, a
challenge, and a closing question asked by raised hands. The panel SHALL name the setting in its
headline — exposure compensation, the `+/−` button — and SHALL state that the camera
aims for a scene of average brightness and SHALL show, scene by scene, which way to correct and
by how much — towards `+` for snow, a white subject or backlight, towards `−` for a dark scene or
a subject on a black background — with what happens without the correction, and SHALL end on
the rule « trop sombre → vers le `+`, trop clair → vers le `−` ». It is a reference, not an
exercise: the room cannot reproduce these scenes. The challenge SHALL ask for photographs that practise the session.

#### Scenario: The end of session 2 is read

- **WHEN** session 2 is read past the ISO block
- **THEN** the next and last block holds the compensation panel, the challenge and the closing
  question, in that order
- **AND** no workshop, modes or diagnostic screen follows

#### Scenario: A participant reads the challenge

- **WHEN** the challenge screen is displayed
- **THEN** it asks for photographs that practise movement, low light and the `+/−` button
