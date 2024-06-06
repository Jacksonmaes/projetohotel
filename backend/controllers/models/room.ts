import mongoose, { Schema, Document } from "mongoose";

export interface IImage extends Document {
    public_id: string;
    url: String;

}
export interface ILocation {
    type: String;
    coordinates: number[];
    formattedAddress: String;
    city: String;
    state: String;
    zipCode: String;
    country: String;

}

export interface IReview extends Document {
    user: mongoose.Schema.Types.ObjectId;
    rating: number;
    comment: String;
}

export interface IRoom extends Document {
    name: String;
    description: String;
    pricePerNight: number;
    address: String;
    location: ILocation;
    guestCapacity: number;
    isInternet: Boolean;
    numOfBeds: number;
    isBreakfast: Boolean;
    isAirConditioned: Boolean;
    isPetsAllowed: Boolean;
    ratings: number;
    numOfReviews: number;
    images: IImage[];
    category: String;
    reviews: IReview[];
    user: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    isRoomCleaning: Boolean;
}

const roomSchema: Schema<IRoom> = new Schema({
  name: {
    type: String,
    required : [true, "Please enter room name"],
    trim: true,
    maxLength:[200, "Room name cannot exceed 100 characters"],
 },
 description: {
   type: String,
   required: [true, "Please enter room description"],
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
      enum: ['Point'],
    }, 
    coordinates: {
      type:[Number],
      index: '2dsphere',
    },
    formattedAddress: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
 },
 guestCapacity: {
   type: Number,
   required: [true, "Please enter guest capacity"],
 },
 numOfBeds: {
   type: Number,
   required: [true, "Please enter number of beds in room"],
 },
 isInternet: {
   type: Boolean,
   default: false,
 },
 isAirConditioned:{
   type: Boolean,
   default: false,
 },
 isPetsAllowed:{
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
     public_id: {
       type: String,
       required: true
     },
     url: {
       type: String,
       required: true,
     },
    },
 ],
 
  category: {
   type: String,
   required: [true, "Please enter room category"],
   enum:{
     values: ["King", "Single", "Twins"],
     message: "Please select correct category for room",   
   },
 },      
 reviews: [
   {
     user:{
       type: mongoose.Schema.Types.ObjectId,
       ref: "User",
       required: true,
     },
     rating:{
       type: Number,
       required: true,
     },
     comment:{
       type: String,
       required: true,
     },
   },
 ],
 user: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "User",
   required: false,
 },
   createdAt:{
      type: Date,
      default: Date.now,
},
});

export default mongoose.models.Room ||
 mongoose.model<IRoom>("Room", roomSchema);