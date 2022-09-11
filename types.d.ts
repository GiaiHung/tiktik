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

export interface UserI {
  _id: string
  _type: string
  userName: string
  image: string
}

export interface CommentI {
  comment: string
  postedBy: {
    _id?: string
    _ref?: string 
  }
  _key: string
}