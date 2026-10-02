# chiv-pi visual assets

The README uses two captured screens from the published `@chivopic/chiv-pi@1.0.0` CLI. The brand renders are retained here as separate visual assets.

| Asset | Source |
|-------|--------|
| [Terminal mark](images/chiv-pi/logo.svg) | Repository SVG based on the CLI's coral and gold wordmark colors |
| [Brand hero](images/chiv-pi/brand-hero.jpg) | Built-in imagegen; JPEG quality 88 |
| [Terminal concept](images/chiv-pi/brand-terminal.jpg) | Built-in imagegen with the hero as a palette and wordmark reference; JPEG quality 88 |
| [Interactive screenshot](images/chiv-pi/interactive.png) | Real CLI output captured by tmux and rendered from ANSI text to PNG |
| [Model picker screenshot](images/chiv-pi/model-picker.png) | Real `/model` menu captured and rendered the same way |

The brand colors follow `src/modes/interactive/components/pi-logo.ts`: coral `#E48A7A` for the first letter and warm gold `#EAB65D` for the rest. The renders use a dark graphite background with restrained teal edge light. They are brand concepts, not application screenshots.

The screenshot was captured in an isolated temporary project with a `task.ts` file containing this function:

```ts
export function formatTask(title: string, done = false): string {
    return `${done ? "[x]" : "[ ]"} ${title.trim()}`;
}
```

The CLI ran with DeepSeek Flash, dark theme, low thinking, no saved session, and no project resources or extensions. The actual prompt was:

```text
Read task.ts. Briefly explain what it does and give one edge case to improve. Do not edit files. Keep your answer under 80 words.
```

The displayed response and tool calls came from that run. The `/model` command opened the model selector for the second screenshot. Both captures were made with `tmux capture-pane -p -e` at 108 columns by 32 rows and rendered with Menlo and the terminal's ANSI colors. A presentation title bar was added around the terminal content. No credentials are included in the images.

## Hero prompt

Built-in imagegen, opaque background:

```text
Use case: stylized-concept
Asset type: wide GitHub README brand hero for the terminal AI coding agent chiv-pi, approximately 2:1 landscape composition.
Primary request: a refined 3D studio render of the existing lowercase typographic brand wordmark, suitable as a developer tool's repository cover.
Scene/backdrop: near-black graphite studio with a subtle dark reflective surface and restrained terminal-like teal edge light. No physical computer, no people, no landscape.
Subject: the exact wordmark "chiv-pi" as substantial, softly bevelled monospaced 3D letters, arranged in one perfectly readable horizontal line. The first letter c has a soft coral finish (#E48A7A); all subsequent letters h i v - p i have a warm muted gold finish (#EAB65D), matching the real CLI wordmark. Typography is precise, clean and understated; the hyphen is clearly visible.
Composition/framing: wide hero banner; brand lettering is centered with generous breathing room on all sides, viewed from a very slight elevated perspective so the front faces remain plainly readable. Avoid extreme perspective. Make the wordmark occupy roughly the middle half of the image width, with ample dark negative space and no cropping.
Lighting/mood: premium industrial studio lighting, soft coral and warm gold material highlights, a very faint teal ambient rim light, realistic soft shadows, restrained reflections, matte anodized surfaces with subtle depth.
Text (verbatim): "chiv-pi". Spell exactly c h i v hyphen p i, all lowercase. No other words.
Constraints: editorial product rendering, high-quality crisp finish, readable at GitHub README width, no fake UI or screenshots, no trademark symbols, no extra emblems, no watermark, no floating code, no neon city or sci-fi clutter. This is a brand illustration, not an app interface.
```

## Terminal concept prompt

Built-in imagegen, using the hero as a visual reference, opaque background:

```text
Use case: product-mockup
Asset type: brand concept render for the chiv-pi GitHub README, approximately square composition.
Input images: Image 1 is a palette and typography reference only: use its exact lowercase chiv-pi spelling and coral first-letter / muted gold remaining-letter identity. Create a new composition, not a replacement for that banner.
Primary request: a minimal 3D brand object representing a terminal coding assistant: a single dark graphite rectangular plaque, with gently rounded corners and a machined, matte surface, standing at a slight angle on a near-black studio surface. This is a brand illustration rather than a real commercial device.
Subject details: a large engraved terminal prompt symbol ">_" in softly luminous warm muted gold; below it, the exact small lowercase monospaced label "chiv-pi", first c in soft coral #E48A7A, remaining letters in muted gold #EAB65D. Clean front face, generous space, shallow precise engraving, tasteful bevels, no buttons, no screen or invented interface.
Composition/framing: one plaque centered in a spacious square image, front face readable, subtle 3/4 view, full object visible, no cropping. Realistic depth and a soft grounded shadow.
Lighting/mood: restrained premium studio lighting with a very subtle teal rim light, coral and gold accents, graphite backdrop consistent with Image 1, mild reflections, high quality material rendering.
Text (verbatim): ">_" and "chiv-pi". No other words.
Constraints: no fake application UI, no dashboard, no laptop, no cables, no people, no extra props, no futuristic city, no watermark, no additional logos or badges. Readable silhouette at small README sizes. This is clearly a brand concept rendering.
```
