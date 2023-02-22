'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.belongsTo(models.User, {foreignKey: 'ownerId'});
      Spot.hasMany(models.SpotImage, {foreignKey: 'spotId', onDelete: 'CASCADE'});
      Spot.hasMany(models.Booking, {foreignKey: 'spotId', onDelete: 'CASCADE'});
      Spot.hasMany(models.Review, {foreignKey: 'spotId', onDelete: 'CASCADE'});
    }
  }
  Spot.init({
    ownerId:{ type: DataTypes.INTEGER },
    address:{ type: DataTypes.STRING },
    city: { type: DataTypes.STRING } ,
    state:{  type: DataTypes.STRING } ,
    country: {type: DataTypes.STRING},
    lat: {type: DataTypes.DECIMAL},
    lng: {type: DataTypes.DECIMAL},
    name: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    price: {type: DataTypes.DECIMAL},
    avgRating: {
      type: {type: DataTypes.DECIMAL},
    },
    previewImage:{
      type: {type: DataTypes.STRING},
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
