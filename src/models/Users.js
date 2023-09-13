import { Schema, model } from "mongoose";

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
    articles: [{ type: Schema.Types.ObjectId, ref: "Article" }],
  },
  {
    timestamps: true,
  }
);

const User = model("User", UserSchema);

export { User };
