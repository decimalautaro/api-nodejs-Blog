const { Schema, model } = require("mongoose");

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: ["user", "admin"],
      default: "user",
    },
    articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", UserSchema);
