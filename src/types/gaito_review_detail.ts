export interface ReviewDetailResponse {
  data: Data
  type: string
  message: string
}

export interface Data {
  review: Review
  author: Author
}

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
  survey: Survey
  id: string
  phone: string
  visiteTime: string
  location: string
  photos: Photo[]
}

export interface Survey {
  '18b4f70e0523f4910eca3f7c3053ec4a': N18b4f70e0523f4910eca3f7c3053ec4a
  '1fbb6de66b3fddf79fdf743cc56a9ce3': N1fbb6de66b3fddf79fdf743cc56a9ce3
  cdd461e20fd08c45214b19173fa3575c: Cdd461e20fd08c45214b19173fa3575c
  '0cee655a93fc58fe1c6b9db7b460c883': N0cee655a93fc58fe1c6b9db7b460c883
  '8264a86d5b794420e232b5a429f1631e': N8264a86d5b794420e232b5a429f1631e
  '3ad828c5a89502a7c79f1e1c25f1cf73': N3ad828c5a89502a7c79f1e1c25f1cf73
  '8c634b757cfc4a1405108c35c1eadb19': N8c634b757cfc4a1405108c35c1eadb19
  b9f51a3e27ffc67cf869e88753def16f: B9f51a3e27ffc67cf869e88753def16f
  '3c8377a88207516606aa1b9a1d866431': N3c8377a88207516606aa1b9a1d866431
  '47f214767062999c714fc4e30d2c1ff1': N47f214767062999c714fc4e30d2c1ff1
  e3f0231c99a875a63e0ac31d2198ffc8: E3f0231c99a875a63e0ac31d2198ffc8
  c340beda676599337f8beaac4fe05593: C340beda676599337f8beaac4fe05593
  '1eace194d2918ab358f61548163a253e': N1eace194d2918ab358f61548163a253e
  '70d0d64e3ab4f20fcd11e9913516a75c': N70d0d64e3ab4f20fcd11e9913516a75c
}

export interface N18b4f70e0523f4910eca3f7c3053ec4a {
  answer: number
}

export interface N1fbb6de66b3fddf79fdf743cc56a9ce3 {
  answer: number
}

export interface Cdd461e20fd08c45214b19173fa3575c {
  answer: number
}

export interface N0cee655a93fc58fe1c6b9db7b460c883 {
  answer: number
}

export interface N8264a86d5b794420e232b5a429f1631e {
  answer: number
}

export interface N3ad828c5a89502a7c79f1e1c25f1cf73 {
  answer: number
}

export interface N8c634b757cfc4a1405108c35c1eadb19 {
  answer: number
}

export interface B9f51a3e27ffc67cf869e88753def16f {
  selectedAnswer: string
}

export interface N3c8377a88207516606aa1b9a1d866431 {
  selectedAnswer: string
}

export interface N47f214767062999c714fc4e30d2c1ff1 {
  answer: number
}

export interface E3f0231c99a875a63e0ac31d2198ffc8 {
  answer: number
}

export interface C340beda676599337f8beaac4fe05593 {
  answer: number
}

export interface N1eace194d2918ab358f61548163a253e {
  selectedAnswer: string
}

export interface N70d0d64e3ab4f20fcd11e9913516a75c {
  answer: string
}

export interface Photo {
  id: string
  entityId: any
  entity: string
  type: string
  userId: string
  data: Data2
  stamp: string
}

export interface Data2 {
  baseName: string
  dimensions: Dimensions
}

export interface Dimensions {
  original: Original
  small: Small
}

export interface Original {
  width: number
  height: number
  file: string
  url: string
}

export interface Small {
  width: number
  height: number
  file: string
  url: string
}

export interface Author {
  avatar: Avatar
  online: boolean
  allowChat: boolean
}

export interface Avatar {
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
