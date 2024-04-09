export type HTTPValidationError = {
  detail?: Array<ValidationError>;
};

export type Team = {
  name: string;
  color?: string | null;
};

export type Teams = {
  dark: Team;
  light: Team;
};

export type ValidationError = {
  loc: Array<string | number>;
  msg: string;
  type: string;
};

export type VideoIn = {
  src: string;
  teams: Teams;
  event?: string | null;
};

export type VideoOut = {
  src: string;
  teams: Teams;
  event: string;
  perma_token: string;
};
