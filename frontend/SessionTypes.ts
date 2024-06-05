export interface SessionData {
  username: string;
  expiration: number;
}

export interface SessionContextType {
  session: SessionData | null;
  login: (username: string) => void;
  logout: () => void;
}
