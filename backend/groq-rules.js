export const rules = {
  react: `
    - Check for missing dependency arrays in useEffect/useMemo/useCallback.
    - Look for expensive computations inside the render body.
    - Check for proper usage of Keys in lists.
    - Identify potential prop-drilling issues.
    - Suggest using React.memo or useMemo for performance optimization where applicable.
    - Check for direct state mutation.
    - Ensure hooks are called at the top level.
  `,
  angular: `
    - Check for potential memory leaks (missing Unsubscribe in OnDestroy).
    - Look for heavy logic inside the template or getters called frequently.
    - Suggest using the Async pipe instead of manual subscriptions.
    - Check for proper use of ChangeDetectionStrategy.OnPush.
    - Ensure proper usage of Signals if the code appears to be modern Angular.
    - Check for 'any' types and suggest better type safety.
    - Verify correct lifecycle hook implementations.
  `
};

