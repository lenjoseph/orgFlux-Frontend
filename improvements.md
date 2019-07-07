This UI can be optimized by taking the following actions:

1. Increase modularization: Given the time constraint for this project, it was faster to create the UI using a flat architecture. However, this is not maintainable, and given more time this UI would be further broken out such that components assume single responsibility.

2. State management integration: Currently this UI only leverages state management to persist darkmode status and the current selected module (i.e., organizations, locations, or events). An optimal approach would use state management as a means to preserve the single source of truth for component data, and reduce local storage of data within components. Instead the store would use actions to make async calls to graphql, and components would use getters to take what they need from state.

3. Cross-browser compatibility: There may be javascript features and/or CSS features present that are not supported in all browsers. This UI was developed in Google Chrome, so optimal performance should be expected in that browser.

4. Styling consolidation: A lot of the styling present is inefficient as it relies too heavily upon unique id styling, instead of class-based styling. A next step would be to identify repeated styling and consolidate to classes.
