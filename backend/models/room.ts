import mongoose, { Document, Schema } from "mongoose";

export interface IReview extends Document {
  user: mongoose.Schema.Types.ObjectId;
  rating: number;
  comments: string;
}
export interface IImage extends Document {
  public_id: string;
  url: string;
}
export interface ILocation {
  type: string;
  coordinate: number[];
  formattedAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
export interface IRoom extends Document {
  name: string;
  description: string;
  pricePerNight: number;
  address: string;
  location: ILocation;
  guestCapacity: number;
  numOfBeds: number;
  isInternet: boolean;
  isBreakfast: boolean;
  isAirConditioned: boolean;
  isPetAllowed: boolean;
  isRoomCleaning: boolean;
  images: IImage;
  reviews: IReview;
  user: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const roomSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter room name"],
    trim: true,
    maxLength: [100, "Room name cannot excedd 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter room description"],
    trim: true,
    maxLength: [500, "Room description cannot excedd 500 characters"],
  },
  pricePerNight: {
    type: Number,
    required: [true, "Please enter room price per night"],
    default: 0.0,
  },
  address: {
    type: String,
    required: [true, "Please enter room address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinate: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  guestCapacity: {
    type: Number,
    required: [true, "Please enter room guest capacity"],
  },
  numOfBeds: {
    type: Number,
    required: [true, "Please enter number of beds"],
  },
  isInternet: {
    type: Boolean,
    default: false,
  },
  isBreakfast: {
    type: Boolean,
    default: false,
  },
  isAirConditioned: {
    type: Boolean,
    default: false,
  },
  isPetAllowed: {
    type: Boolean,
    default: false,
  },
  isRoomCleaning: {
    type: Boolean,
    default: false,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  category: {
    type: String,
    required: false,
    enum: {
      values: ["King", "Single", "Twins", "Adult", "Children"],
      message: "Please select correct category for room",
    },
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.models.Room ||
  mongoose.model<IRoom>("Room", roomSchema);
