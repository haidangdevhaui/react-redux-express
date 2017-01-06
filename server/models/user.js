import mongoose from 'mongoose';
import hash from 'password-hash';

let userSchema = new mongoose.Schema({
	username: String,
    password: String,
    firstname: String,
    lastname: String,
    birthday: Date,
    age: {
        type: Number,
        default: 0
    },
    gender: {
        type: Number,
        default: 0 //0: male 1: famale
    },
    job: String,
    description: String,
    avatar: {
        type: String,
        default: 'public/user/avatar/default.png'
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
}, {
	collection: 'users'
});

userSchema.methods.hassPassword = function(pw){
    return hash.generate(pw);
}
userSchema.methods.authenticate = function (pw) {
	return hash.verify(pw, this.password);
};

export default mongoose.model('users', userSchema);