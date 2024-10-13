import { model, Schema } from 'mongoose';

export const Event = model('Event', new Schema({
	name:  {
		type: String,
		required: true,
	},
	date_time: {
		type: Date,
		required: true,
	},
	location:  {
		type: String,
		required: true,
	},
	number_people: {
		type: Number,
		required: true,
	},
	imagePath: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	category: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Category'
	}
}));

