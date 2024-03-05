const mongoose = require("mongoose")
const bcrypt =require("bcryptjs")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please tell us your name"],
    },
    email:{
        type:String,
        required:[true,"Please provide your email"],
        unique:true,
        lowercase:true,
    },
    membershipType:{
        type:String,
        lowercase:true,
        default:"notMember",
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
    },
    password:{
        type:String,
        required:[true,"Please provide your password"],
    },
    passwordConfirm:{
        type:String,
        required:[true,"Please provide your password"],
        validate:{
            validator:function(el){
                return el===this.password;
            },
            message: "Passwords are not the same",
        }
    },
});


userSchema.pre("save",async function(next){
    // Only run this function if the password was actually modified
    if(!this.isModified("password")) return next();

    // Has the password with cost of 12
    this.password= await bcrypt.hash(this.password,12);

    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre("save",async function(next){
    // Only run this function if the password was actually modified or set new
    if(!this.isModified("password") || this.isNew) return next();

    this.passwordChangeAt = Date.now() - 1000;
    next();
});

userSchema.pre(/^find/, function (next){
    // This points to the current query
    this.find({active:{$ne: false}});
    next();
});

// To checking the correct password
userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
}

// To checking the password changing after
userSchema.methods.passwordChangeAfter =  function(JWTTimeStamp){
    if(this.passwordChangeAt){
        const changeTimestamp = parseInt(this.passwordChangeAt.getTime()/1000,10);
        return JWTTimeStamp < changeTimestamp;
    }

    // False means not change
    return false;
}

const User = mongoose.model("User",userSchema);

module.exports = User;