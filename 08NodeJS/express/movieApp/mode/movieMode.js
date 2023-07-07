const { Schema, model } = require("mongoose");

// class MovieMode {
//   constructor(
//     id,
//     title,
//     actors,
//     imgSr,
//     director,
//     score,
//     release,
//     movieType,
//     language,
//     region,
//     desc,
//     duration,
//     posterSrc,
//     trailerLink,
//     comments
//   ) {
//     // 编号
//     this.id = id;
//     // 名称
//     this.title = title;
//     // 演员
//     this.actors = actors;
//     // 图片
//     this.imgSr = imgSr;
//     // 导演
//     this.director = director;
//     // 评分
//     this.score = score;
//     // 公映时间
//     this.release = release;
//     // 电影类型
//     this.movieType = movieType;
//     // 语言
//     this.language = language;
//     // 上映区域
//     this.region = region;
//     // 描述
//     this.desc = desc;
//     // 时长
//     this.duration = duration;
//     // 海报
//     this.posterSrc = posterSrc;
//     // 预告片
//     this.trailerLink = trailerLink;
//     // 评论
//     this.comments = comments;
//   }
// }

let nowPlayingSchema = new Schema({
  id: String,
  title: String,
  actors: String,
  imgSr: String,
  director: String,
  score: String,
  release: String,
  movieType: String,
  language: String,
  region: String,
  desc: String,
  duration: String,
  posterSrc: String,
  trailerLink: String,
  comments: Array,
},{
  versionKey:false
});

model("nowPlayingModel", nowPlayingSchema, "nowPlaying");
model("upComingModel", nowPlayingSchema, "upComing");
