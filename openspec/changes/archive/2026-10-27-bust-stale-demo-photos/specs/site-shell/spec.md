## MODIFIED Requirements

### Requirement: Lessons remain usable without network access

The site SHALL continue to display any lesson, reference sheet, and lexique page that has been
visited once, after network access is lost. Offline, each page and each asset it shows SHALL be
the most recent version the browser received while online, whichever version the cached page
refers to.

#### Scenario: Room wifi fails mid-session

- **WHEN** the animator has loaded a lesson and the network then becomes unavailable
- **THEN** navigating between that lesson's screens continues to work
- **AND** interactive components on those screens continue to respond

#### Scenario: Animator prepares an offline fallback

- **WHEN** the animator wants a guaranteed fallback independent of hosting
- **THEN** the repository supports producing a local copy of the site that opens and navigates
  without a network connection

#### Scenario: A photo was replaced after a page was cached

- **WHEN** a page was visited while it showed an older version of a demonstration photo
- **AND** the newer version of that photo was later received while visiting another page
- **AND** the network then becomes unavailable and the first page is opened again
- **THEN** the photo is displayed, not a broken image
- **AND** the version displayed is the newer one

#### Scenario: Only the newest copy of an asset is kept

- **WHEN** a demonstration photo has been replaced several times across deploys and seen online
  after each replacement
- **THEN** the browser's offline store holds a single copy of that photo, the most recent one

## ADDED Requirements

### Requirement: A deployed asset replacement appears on an ordinary reload

When a deploy replaces a demonstration photo, font, or other static asset under the same file
name, a visitor whose browser already cached the previous version SHALL see the new version
after an ordinary reload, without a forced refresh or clearing site data. An asset whose content
did not change in a deploy SHALL NOT be downloaded again because of that deploy.

#### Scenario: A placeholder photo is replaced by the real shot

- **WHEN** a visitor has viewed a screen showing a demonstration photo
- **AND** a deploy replaces that photo's file with new content under the same name
- **AND** the visitor reloads the screen normally once the deploy is live
- **THEN** the new photo is displayed

#### Scenario: A deploy that leaves a photo untouched

- **WHEN** a deploy changes the site but not a given demonstration photo
- **AND** a visitor who already cached that photo opens a screen showing it
- **THEN** the photo is served from the browser's cache rather than downloaded again

#### Scenario: Visitors with photos already stuck from earlier deploys

- **WHEN** a visitor's browser still holds a stale demonstration photo cached before this change
- **AND** the visitor opens the site once the change is deployed
- **THEN** the stale copy is discarded and subsequent views show the deployed photo
