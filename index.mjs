import noHardcodedQueryParams from "./lib/rules/no-hardcoded-query-params.js";

export const rules = {
  "no-pl-pr-tailwind": noPlPrTailwindRule,
};

// Add this line for default export:
export default {
  meta: {
    name: "eslint-plugin-no-hardcoded-query-params",
    version: "1.0.0",
  },
  rules,
};
