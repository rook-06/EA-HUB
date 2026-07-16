# Flutter / VSCode Extension — Jargon Notes

*Saved 2026-07-13*

- **Hot Reload** — Injects code changes into the running app and rebuilds the widget tree, keeping app state intact. Doesn't rerun `main()` or `initState()`. Fires automatically on save during a debug session (no compile errors). Shortcut: `Ctrl+F5`.
- **Hot Restart** — Reloads code and fully restarts the app, so state is lost. Slower than hot reload but still just a few seconds. Command Palette: "Flutter: Hot Restart", or `Ctrl+Shift+F5` (`Cmd+Shift+F5` on Mac).
- **DevTools** — Dart's suite of debugging/performance tools: source-level debugger, widget inspector, performance/memory profilers, network view, logging.
- **Widget Inspector** — Part of DevTools. Lets you browse the live widget tree and inspect layout/properties. Enable via "Flutter: Enable Widget Inspection".

Sources:
- [VS Code | Flutter docs](https://docs.flutter.dev/tools/vs-code)
- [Hot reload | Flutter docs](https://docs.flutter.dev/tools/hot-reload)
- [Debugging Commands - Dart Code](https://dartcode.org/docs/debugging-commands/)
