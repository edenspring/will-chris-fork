'use strict';
const {Model, Validator} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // -------------------------instance methods-------------------------
    // provide user info save to send in a jwt
    toSafeObject(){
      const {id,username,email} = this;
      return {id,username,email};
    }
    // bcrypt password check
    validatePassword(password){
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    // applying currentUser scope
    static getCurrentUserById(id){
      return User.scope("currentUser").findByPk(id);
    }
    // search active users for username, validate w/ bcrypt
    static async login({credential, password}){
      const {Op} = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if(user && user.validatePassword(password)){
        return await User.scope('currentUser').findByPk(user.id);
      }
    }
    static async signup({username, email, password}){
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
       len: [4,30],
       isNotEmail(val){
         if(Validator.isEmail(val)){
           throw new Error('Cannot be an email.')
         }
       }
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [3,256],
        isEmail:true,
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate:{
        len: [60,60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    // ------------------------SCOPES------------------------
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    },
    scopes:{
      currentUser: {
        attributes: {
          exclude : ["hashedPassword"]
        }
      },
      loginUser: {
        attributes: {}
      }
    },
  });
  return User;
};
