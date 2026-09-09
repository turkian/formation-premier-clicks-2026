## 1. Content

- [x] 1.1 In `src/src/content/lecons/1.yaml`, on the `mise-au-point` bloc's `autofocus`
      screen: remove the "Et pour désigner **où** :" paragraph and the collimateur/zone/
      détection bullet list from `corps`, leaving only the `AF-S`/`AF-C` table.
- [x] 1.2 On the same screen, replace `aparte` with `encadre` set to
      `Toutes les marques n'utilisent pas les mêmes mots.` (dropping the Canon/Olympus
      specifics and the pointer to the reference sheet). Add `ton: avertissement` and
      `icone: lucide:triangle-alert` — the same pairing already used on this lesson's
      `ouverture` screen (line 63 today).
- [x] 1.3 Insert a new screen immediately after `autofocus` and before
      `ou-le-point-a-ete-fait`: `id: zone-af`, `genre: panneau`,
      `titre: Désigner où viser`, `claim: Et pour désigner où : trois façons.`, with `corps`
      holding a `Méthode | Quand | Ce qu'il fait` table:
      - Collimateur unique · vous voulez choisir vous-même l'endroit exact · un seul point
        actif, que vous déplacez avec le joystick ou le pavé directionnel
      - Zone · le sujet bouge mais reste dans un coin du cadre · l'appareil corrige parmi
        plusieurs collimateurs de cette zone
      - Détection visage / œil · il y a un visage dans le cadre · l'appareil détecte le
        visage — et l'œil, s'il est visible — puis y verrouille le point
- [x] 1.4 Re-read both screens together: confirm `autofocus` still reads as one complete
      ~50-word idea (claim + table + callout) and `zone-af` reads as a second complete idea
      (claim + table, no callout), with neither screen orphaned without the other.

## 2. Verification

- [x] 2.1 Run `npm run verifier:contenu` (content rules, including Québec French
      typography — the new `zone-af` table content and the shortened `encadre` sentence
      both need to pass).
- [x] 2.2 Run `npm run verifier:projection` and `npm run verifier:telephone` to confirm both
      screens render correctly at both breakpoints. `verifier:projection` reports the same 2
      pre-existing failures on the unrelated `/lecons/3/et-maintenant/la-suite/` screen,
      confirmed present on `main` before this edit (checked via `git stash`); the
      `autofocus`/`zone-af` screens themselves pass. `verifier:telephone`: 120/120 pass.
- [x] 2.3 Run `npm run build` to confirm the site builds clean. 121 pages built (up from
      120 pre-split), no errors.
- [x] 2.4 View both screens in the dev server at a projector-width viewport (1024×768):
      confirm `autofocus` shows only the AF-S/AF-C table plus the callout box with its
      warning icon, and `zone-af` shows its own table with no callout, and that navigating
      forward from `autofocus` lands on `zone-af` before `ou-le-point-a-ete-fait`. Verified
      via Playwright: both screens render with `scrollHeight` (768) matching viewport height
      exactly (no overflow), `autofocus`'s `next` link resolves to `.../zone-af/`, table
      contents on both screens match spec, `zone-af` has no encadre element, no console
      errors on either screen. Screenshots confirm layout visually (position indicator now
      reads 10/40 and 11/40, up from 10/39).
