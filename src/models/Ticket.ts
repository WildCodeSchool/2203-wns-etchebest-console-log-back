import { Schema, model } from 'mongoose';

const TicketSchema = new Schema({
  title: String,
  description: String,
});
const TicketModel = model('ticket', TicketSchema);

export default TicketModel;
