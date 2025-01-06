export type RGB = {
  r: number;
  g: number;
  b: number;
};

export interface track {
  name: string;
  cover: string;
  artists: string[];
  albums: string[];
  duration: number;
  release: Date;
}

export interface playlist {
  cover: string;
  name: string;
  owner: string;
  duration: number;
  songs: track[];
}

export interface user {
  email: string;
  _id: string;
  iat: number;
  name: string;
  profile: string;
  access_token: string;
  refresh_token: string;
}
