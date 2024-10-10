import { model, Schema } from 'mongoose';

export const Event = model('Event', new Schema({
	tipo: {
		type: String,
		required: true,
	},
	data: {
		type: Date,
		required: true,
	},
	horario:  {
		type: String,
		required: true,
	},
	localizacao: {
		type: String,
		required: true,
	},
	numero_de_pessoas: {
		type: Number,
		required: true,
	},
	descricao: {
		type: String,
		required: true,
	},
	icon:{
		type: String,
		required: true,
	}
}));

