# eslint-plugin-no-hardcoded-query-params

ESLint plugin to prevent hardcoded query parameter names in URL construction.

## Installation

```bash
npm install --save-dev eslint-plugin-no-hardcoded-query-params
```

## Usage

### ESLint Flat Config (eslint.config.js)

```javascript
import noHardcodedQueryParams from 'eslint-plugin-no-hardcoded-query-params';

export default [
  {
    plugins: {
      'no-hardcoded-query-params': noHardcodedQueryParams,
    },
    rules: {
      'no-hardcoded-query-params/no-hardcoded-query-params': 'error',
    },
  },
];
```

### With Options

```javascript
export default [
  {
    plugins: {
      'no-hardcoded-query-params': noHardcodedQueryParams,
    },
    rules: {
      'no-hardcoded-query-params/no-hardcoded-query-params': [
        'error',
        {
          allowedPatterns: ['^utm_', '^test-'],
        },
      ],
    },
  },
];
```

### Disable for Test Files

```javascript
export default [
  {
    plugins: {
      'no-hardcoded-query-params': noHardcodedQueryParams,
    },
    rules: {
      'no-hardcoded-query-params/no-hardcoded-query-params': 'error',
    },
  },
  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    rules: {
      'no-hardcoded-query-params/no-hardcoded-query-params': 'off',
    },
  },
];
```

## Rule Details

This rule prevents hardcoded query parameter names in URL construction, encouraging the use of centralized enums or constants.

### ❌ Incorrect

```javascript
const url = process.env.SELF_URL + '?referral-code=' + code;
const link = `${baseUrl}?user-id=${userId}`;
searchParams.set('page-number', '1');
```

### ✅ Correct

```javascript
const url = process.env.SELF_URL + '?' + QueryParams.REFERRAL_CODE + '=' + code;
const link = `${baseUrl}?${QueryParams.USER_ID}=${userId}`;
searchParams.set(QueryParams.PAGE_NUMBER, '1');
```

## Options

### `allowedPatterns`

Array of regex patterns for query parameter names that are allowed to be hardcoded.

Example:
```javascript
{
  allowedPatterns: ['^utm_', '^fb_', '^test-']
}
```

This would allow parameters like `utm_source`, `utm_campaign`, `fb_clid`, `test-param`, etc.
