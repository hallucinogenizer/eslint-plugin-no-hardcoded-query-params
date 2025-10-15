const noHardcodedQueryParams = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow hardcoded query parameter names in URL construction",
      category: "Best Practices",
      recommended: true,
      url: "https://github.com/yourusername/eslint-plugin-no-hardcoded-query-params#readme",
    },
    messages: {
      hardcodedQueryParam:
        'Query parameter name "{{param}}" should come from a centralized enum or constant',
    },
    schema: [
      {
        type: "object",
        properties: {
          allowedPatterns: {
            type: "array",
            items: {
              type: "string",
            },
            description:
              "Array of regex patterns for query params that are allowed to be hardcoded",
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const options = context.options[0] || {};
    const allowedPatterns = (options.allowedPatterns || []).map(
      (pattern) => new RegExp(pattern)
    );
    const queryParamPattern = /[?&]([a-zA-Z0-9_-]+)=/g;

    function isAllowed(paramName) {
      return allowedPatterns.some((pattern) => pattern.test(paramName));
    }

    function checkForHardcodedParams(node, value) {
      if (typeof value !== "string") return;

      const matches = [...value.matchAll(queryParamPattern)];

      matches.forEach((match) => {
        const paramName = match[1];

        if (!isAllowed(paramName)) {
          context.report({
            node,
            messageId: "hardcodedQueryParam",
            data: { param: paramName },
          });
        }
      });
    }

    return {
      // Check string literals in binary expressions (+ operator)
      BinaryExpression(node) {
        if (node.operator === "+") {
          if (
            node.left.type === "Literal" &&
            typeof node.left.value === "string"
          ) {
            checkForHardcodedParams(node.left, node.left.value);
          }
          if (
            node.right.type === "Literal" &&
            typeof node.right.value === "string"
          ) {
            checkForHardcodedParams(node.right, node.right.value);
          }
        }
      },

      // Check template literals
      TemplateLiteral(node) {
        node.quasis.forEach((quasi) => {
          checkForHardcodedParams(quasi, quasi.value.raw);
        });
      },

      // Check regular string literals (for cases like URLSearchParams)
      Literal(node) {
        if (typeof node.value === "string") {
          checkForHardcodedParams(node, node.value);
        }
      },
    };
  },
};

export default noHardcodedQueryParams;
