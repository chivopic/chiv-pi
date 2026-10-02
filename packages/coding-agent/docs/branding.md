# chiv-pi visual assets

The README uses two captured screens from the published `@chivopic/chiv-pi@1.0.0` CLI.

| Asset | Source |
|-------|--------|
| [Terminal mark](images/chiv-pi/logo.svg) | Repository SVG based on the CLI's coral and gold wordmark colors |
| [Interactive screenshot](images/chiv-pi/interactive.png) | Real CLI output captured by tmux and rendered from ANSI text to PNG |
| [Model picker screenshot](images/chiv-pi/model-picker.png) | Real `/model` menu captured and rendered the same way |

The brand colors follow `src/modes/interactive/components/pi-logo.ts`: coral `#E48A7A` for the first letter and warm gold `#EAB65D` for the rest.

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
