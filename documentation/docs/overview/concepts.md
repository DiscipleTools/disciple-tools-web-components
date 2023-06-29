# Main Concepts in Component Architecture

- **HTML/Framework Support**: Components should work in a standard HTML form, via events and API requests, and by including in other javascript frameworks.
- **Javascript Events**: Communication outside the components happens by dispatching javascript events
- **Loose Coupling**: Components do not implement specific Disciple.Tools APIs directly within their functionality. Events are dispatched for coupling to APIs or other data sources, and the `ComponentService` provides coupling to standard APIs when needed.
