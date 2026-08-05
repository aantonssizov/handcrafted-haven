import mongoose, { ObjectId } from "mongoose";
import { UserRole } from "@/lib/models/roles";
import bcrypt from "bcrypt";

export interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  role: UserRole;
  password: string;
}

export interface IUserClient {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  password: string;
}

export const UserSchema = new mongoose.Schema<IUser>(
  {
    name: String,
    email: {
      type: String,
      uniquie: true,
      required: true,
      validate: {
        validator: (v) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/.test(v),
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
    },
    password: {
      type: String,
      minLength: 6,
    },
  },
  {
    timestamps: true,
    methods: {
      async comparePassword(candidatePassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, this.password);
      },
    },
  },
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

export interface ISessionData {
  userId: ObjectId;
  userRole: UserRole;
}

export default mongoose.models.User || mongoose.model("User", UserSchema);
