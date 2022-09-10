export interface Video {
  _id: string
  caption: string
  comments: {
    comment: string
    postedBy: {
      _type: string,
      _ref: string
    }
    _key: string
  }[]
  likes: {
    _key: string
    _ref: string
    _type: string
    postedBy: {
      _id: string
      userName: string
      image: string
    }
  }[]
  postedBy: {
    _id: string
    userName: string
    image: string
  }
  userId: string
  video: {
    asset: {
        _id: string
        url: string
    }
  }
}
