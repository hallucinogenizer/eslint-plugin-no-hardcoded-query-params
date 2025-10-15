import noHardcodedQueryParams from "./lib/rules/no-hardcoded-query-params.js";

export const rules = {
  "no-hardcoded-query-params": noHardcodedQueryParams,
};

// Add this line for default export:
export default {
  meta: {
    name: "eslint-plugin-no-hardcoded-query-params",
    version: "2.0.0",
  },
  rules,
};
