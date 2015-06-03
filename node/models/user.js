var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var utility = require('utility');

var UserSchema = new Schema({
  name: { type: String},
  loginname: { type: String},
  pass: { type: String },
  email: { type: String},
  real_name: {type: String},   //added, 真实姓名
  user_type:　{type: String},  //added, 账号类型：教师，学生
  student_id: {type: String},  //added, 学号
  school: {type: String},      //added, 学校
  specialty: {type: String},   //added, 专业
  url: { type: String },
  profile_image_url: {type: String},
  location: { type: String },
  signature: { type: String },
  profile: { type: String },
  weibo: { type: String },
  avatar: { type: String },
  githubId: { type: String},
  githubUsername: {type: String},
  githubAccessToken: {type: String},
  is_block: {type: Boolean, default: false},

  score: { type: Number, default: 0 },
  topic_count: { type: Number, default: 0 },
  reply_count: { type: Number, default: 0 },
  follower_count: { type: Number, default: 0 },
  following_count: { type: Number, default: 0 },
  collect_tag_count: { type: Number, default: 0 },
  collect_topic_count: { type: Number, default: 0 },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  is_star: { type: Boolean },
  level: { type: String },
  active: { type: Boolean, default: false },

  receive_reply_mail: {type: Boolean, default: false },
  receive_at_mail: { type: Boolean, default: false },
  from_wp: { type: Boolean },

  retrieve_time: {type: Number},
  retrieve_key: {type: String},

  accessToken: {type: String},
});

UserSchema.virtual('avatar_url').get(function () {
  var url = this.avatar || ('https://gravatar.com/avatar/' + utility.md5(this.email.toLowerCase()) + '?size=100');

  // www.gravatar.com 被墙
  url = url.replace('//www.gravatar.com', '//gravatar.com');

  // 让协议自适应 protocol，使用 `//` 开头
   if (url.indexOf('http:') === 0) {
     url = url.slice(5);
   }

  // 如果是 github 的头像，则限制大小
  if (url.indexOf('githubusercontent') !== -1) {
    url += '&s=120';
  }

  // 通过服务器代理访问
  url = '/agent?url=' + encodeURIComponent(url);

  return url;
});

UserSchema.virtual('isAdvanced').get(function () {
  // 积分高于 700 则认为是高级用户
  return this.score > 700 || this.is_star;
});

UserSchema.index({loginname: 1}, {unique: true});
UserSchema.index({email: 1}, {unique: true});
UserSchema.index({score: -1});
UserSchema.index({githubId: 1});
UserSchema.index({accessToken: 1});

mongoose.model('User', UserSchema);