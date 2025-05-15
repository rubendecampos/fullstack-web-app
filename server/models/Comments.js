module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
      commentBody: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,250],
        }      
      },
  });

  return Comments;
};