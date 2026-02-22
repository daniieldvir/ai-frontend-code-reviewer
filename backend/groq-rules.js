export const rules = {
  react: `
    - CRITICAL: Check for missing imports (React, useState, useEffect, etc.).
    - CRITICAL: Verify all required dependencies are present (hooks, components, utilities).
    - CRITICAL: Check for undefined variables, methods, or properties that would cause compilation errors.
    - CRITICAL: Verify hooks are called in the correct order and not conditionally.
    - Check for missing dependency arrays in useEffect/useMemo/useCallback.
    - Look for expensive computations inside the render body.
    - Check for proper usage of Keys in lists.
    - Identify potential prop-drilling issues.
    - Suggest using React.memo or useMemo for performance optimization where applicable.
    - Check for direct state mutation.
    - Ensure hooks are called at the top level.
  `,
  angular: `
    - CRITICAL: Check for missing inject() calls when using inject() function or accessing services.
    - CRITICAL: Verify all required imports are present (Component, inject, signal, etc.).
    - CRITICAL: Check for undefined variables, methods, or properties that would cause compilation errors.
    - Check for potential memory leaks (missing Unsubscribe in OnDestroy).
    - Look for heavy logic inside the template or getters called frequently.
    - Suggest using the Async pipe instead of manual subscriptions.
    - Check for proper use of ChangeDetectionStrategy.OnPush.
    - Ensure proper usage of Signals if the code appears to be modern Angular.
    - Check for 'any' types and suggest better type safety.
    - Verify correct lifecycle hook implementations.
    - Verify that all dependencies are properly injected before use.
  `,
  vue: `
    - CRITICAL: Check for missing imports (Vue, ref, reactive, computed, etc.).
    - CRITICAL: Verify all required dependencies are present (composables, components, utilities).
    - CRITICAL: Check for undefined variables, methods, or properties that would cause compilation errors.
    - CRITICAL: Verify proper setup() function structure in Composition API.
    - Check for missing reactive declarations (ref, reactive, computed).
    - Look for expensive computations inside the template or render functions.
    - Check for proper usage of keys in v-for loops.
    - Verify proper lifecycle hook usage (onMounted, onUnmounted, etc.).
    - Check for memory leaks (missing cleanup in onUnmounted).
    - Suggest using computed properties instead of methods in templates where applicable.
    - Verify proper prop definitions and type safety.
    - Check for direct state mutation (should use reactive/ref setters).
  `
};