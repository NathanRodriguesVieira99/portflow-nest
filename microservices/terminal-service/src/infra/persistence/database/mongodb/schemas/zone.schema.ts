import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class ZoneSchema {
  @Prop({ required: true, type: String, trim: true })
  code!: string;

  @Prop({ required: true, type: String, trim: true })
  type!: string;
 
  @Prop({ required: true, type: Boolean })
  isAvailable!: boolean;

  @Prop({ required: true, type: String, trim: true })
  unavailableReason!: string;
}

export const ZoneSchemaDefinition = SchemaFactory.createForClass(ZoneSchema);
