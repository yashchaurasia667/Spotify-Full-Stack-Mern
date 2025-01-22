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

export type externalUrl = {
  spotify: string;
};

export type spotifyObject = {
  external_urls: externalUrl;
  href: string;
  id: string;
  name: string;
  uri: string;
  type: string;
};

export type image = {
  height: number;
  width: number;
  url: string;
};

export interface trackDetails {
  album: {
    name: string;
    href: string;
    images: image[];
    release_date: string;
  };
  artists: {
    name: string;
    href: string;
  }[];
  duration_ms: number;
  name: string;
  type: string;
}
