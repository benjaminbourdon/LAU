export const $HTTPValidationError = {
  properties: {
    detail: {
      type: "array",
      contains: {
        type: "ValidationError",
      },
    },
  },
} as const;

export const $Team = {
  properties: {
    name: {
      type: "string",
      isRequired: true,
      maxLength: 30,
    },
    color: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 15,
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const;

export const $Teams = {
  properties: {
    dark: {
      properties: {
        name: {
          type: "string",
          isRequired: true,
          maxLength: 30,
        },
        color: {
          type: "any-of",
          contains: [
            {
              type: "string",
              maxLength: 15,
            },
            {
              type: "null",
            },
          ],
        },
      },
      isRequired: true,
    },
    light: {
      properties: {
        name: {
          type: "string",
          isRequired: true,
          maxLength: 30,
        },
        color: {
          type: "any-of",
          contains: [
            {
              type: "string",
              maxLength: 15,
            },
            {
              type: "null",
            },
          ],
        },
      },
      isRequired: true,
    },
  },
} as const;

export const $ValidationError = {
  properties: {
    loc: {
      type: "array",
      contains: {
        type: "any-of",
        contains: [
          {
            type: "string",
          },
          {
            type: "number",
          },
        ],
      },
      isRequired: true,
    },
    msg: {
      type: "string",
      isRequired: true,
    },
    type: {
      type: "string",
      isRequired: true,
    },
  },
} as const;

export const $VideoIn = {
  properties: {
    src: {
      type: "string",
      isRequired: true,
      maxLength: 3000,
    },
    teams: {
      type: "Teams",
      isRequired: true,
    },
    event: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 50,
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const;

export const $VideoOut = {
  properties: {
    src: {
      type: "string",
      isRequired: true,
      maxLength: 3000,
    },
    teams: {
      type: "Teams",
      isRequired: true,
    },
    event: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 50,
        },
        {
          type: "null",
        },
      ],
    },
    perma_token: {
      type: "string",
      format: "uuid",
    },
  },
} as const;
