---
name: tdd-workflow
description: Use this skill when writing new features, fixing bugs, or refactoring code. Enforces test-driven development.
---

# Test-Driven Development Workflow

This skill ensures all code development follows TDD principles with comprehensive test coverage.

## When to Activate

- Writing new features or functionality
- Fixing bugs or issues
- Refactoring existing code
- Creating new components

## Core Principles

### 1. Tests BEFORE Code
ALWAYS write tests first, then implement code to make tests pass.

### 2. Coverage Requirements
- Goal of 80% coverage
- All edge cases covered
- Error scenarios tested
- Boundary conditions verified

### 3. Test Types

#### Unit Tests
- Individual functions and utilities
- Component logic
- Pure functions
- Helpers and utilities

## TDD Workflow Steps

### Step 1: Determine Usage Scenarios
Considering the purpose of the component and the properties it accepts, identify the user journeys it supports and various scenarios that could occur based on its features.

### Step 2: Generate Test Cases
For each scenario or feature, create comprehensive test cases:

```javascript
import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import './dt-search-component.js';

describe('DT-Search-Component', () => {
  it('returns relevant results for query', async () => {
    const el = await fixture(html`<dt-search-component></dt-search-component>`);
    // Test implementation
    // expect(el.results).to.have.lengthOf(5);
  })

  it('handles empty query gracefully', async () => {
    const el = await fixture(html`<dt-search-component query=""></dt-search-component>`);
    // Test edge case
  })

  it('is accessible', async () => {
    const el = await fixture(html`<dt-search-component></dt-search-component>`);
    await expect(el).shadowDom.to.be.accessible();
  })
})
```

### Step 3: Run Tests (They Should Fail)
```bash
npm test
# Tests should fail - we haven't implemented yet
```

### Step 4: Implement Code
Write minimal code to make tests pass:

```javascript
import { LitElement, html } from 'lit';

export class DtSearchComponent extends LitElement {
  static properties = {
    query: { type: String },
    results: { type: Array }
  };

  render() {
    return html`<div>...</div>`;
  }
}
customElements.define('dt-search-component', DtSearchComponent);
```

### Step 5: Run Tests Again
```bash
npm test
# Tests should now pass
```

### Step 6: Refactor
Improve code quality while keeping tests green:
- Remove duplication
- Improve naming
- Optimize performance
- Enhance readability

## Common Testing Mistakes to Avoid

### ❌ WRONG: Testing Implementation Details
```javascript
// Don't test internal state
expect(component.__count).to.equal(5)
```

### ✅ CORRECT: Test User-Visible Behavior
```javascript
// Test what users see or public API
const input = el.shadowRoot.querySelector('input');
expect(input.value).to.equal('John Doe');
```

### ❌ WRONG: Brittle Selectors
```javascript
// Breaks easily
const button = el.shadowRoot.querySelector('.css-class-xyz')
```

### ✅ CORRECT: Semantic Selectors or IDs
```javascript
// Resilient to changes
const button = el.shadowRoot.querySelector('button[type="submit"]')
const field = el.shadowRoot.querySelector('#main-input')
```

### ❌ WRONG: No Test Isolation
```javascript
// Tests depend on each other
let sharedEl;
it('creates user', async () => { sharedEl = await fixture(html`<dt-user></dt-user>`) })
it('updates same user', async () => { /* depends on previous test */ })
```

### ✅ CORRECT: Independent Tests
```javascript
// Each test sets up its own data/fixture
it('creates user', async () => {
  const el = await fixture(html`<dt-user></dt-user>`)
  // Test logic
})

it('updates user', async () => {
  const el = await fixture(html`<dt-user></dt-user>`)
  // Update logic
})
```

## Continuous Testing

### Watch Mode During Development
```bash
npm test:watch
# Tests run automatically on file changes
```

## Best Practices

1. **Write Tests First** - Always TDD
2. **One Assert Per Test** - Focus on single behavior. Might require multiple assertions but should only test a single result
3. **Descriptive Test Names** - Explain what's tested
4. **Arrange-Act-Assert** - Clear test structure
5. **Mock External Dependencies** - Isolate unit tests
6. **Test Edge Cases** - Null, undefined, empty, large
7. **Test Error Paths** - Not just happy paths
8. **Keep Tests Fast** - Unit tests < 500ms each
9. **Clean Up After Tests** - No side effects (handled by @open-wc/testing fixtures)
10. **Review Coverage Reports** - Identify gaps (run with `--coverage` flag)

## Success Metrics

- All tests passing (green)
- No skipped or disabled tests
- Fast test execution (< 30s for unit tests)
- Tests catch bugs before production

---

**Remember**: Tests are not optional. They are the safety net that enables confident refactoring, rapid development, and production reliability.
