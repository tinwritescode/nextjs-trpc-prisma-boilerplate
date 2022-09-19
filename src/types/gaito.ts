export interface Review {
  title: string
  entityId: string
  userId: string
  score: string
  timeStamp: string
  active: string
  message: string
  upVoteCount: string
  downVoteCount: string
  survey: string
  id: string
  phone: string
  visiteTime: string
  location: string
  author: Author
}

export interface Author {
  urlInfo: UrlInfo
  userId: string
  src: string
  url: string
  title: string
  label: string
  labelColor: string
}

export interface UrlInfo {
  routeName: string
  vars: Vars
}

export interface Vars {
  username: string
}

export interface Gai {
  id: string
  name: string
  price: string
  locationId: string
  status: string
  expirationDate: any
  userId: string
  lastUpdateStamp: string
  meta: string
  lat: string
  lng: string
  districtId: string
  cityId: string
  cover: Cover
  ratingScore: string
  ratingCount: string
  ratingAvg: string
  photoCount: string
  timestamp: string
  viewCount: string
  address: string
  slug: string
}

export interface Cover {
  baseName: string
  dimensions: Dimensions
}

export interface Dimensions {
  small: Small
  original: Original
}

export interface Small {
  file: string
  width: number
  height: number
  url: string
}

export interface Original {
  file: string
  width: number
  height: number
  url: string
}
