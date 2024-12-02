const mongoose=require("mongoose")

const url=process.env.URL;
mongoose.connect(url)
const SigninSchema=new mongoose.Schema({
    username:{
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 10,
    unique: true
    },
    password:{
    type:String,
    required: true,
    trim: true,
    minlength: 8,
    maxlength: 20,
    }
})
const contentTypes = ['image', 'video', 'article', 'audio']; // Extend as needed

const contentSchema = new mongoose.Schema({
  title: String,
  link: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: async function(value) {
      const user = await User.findById(value);
      if (!user) {
        throw new Error('User does not exist');
      }
    }
  }
});

const tagSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true }
  });
  const linkSchema = new mongoose.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  });
const Tag = mongoose.model('Tag', tagSchema);
const User= mongoose.model('User',SigninSchema);
const Content= mongoose.model('Content',contentSchema);
const Link=mongoose.model('Link',linkSchema)

module.exports = {
	User,Content,Tag,Link
};
