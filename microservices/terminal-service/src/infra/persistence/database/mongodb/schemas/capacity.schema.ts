import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class CapacitySchema {
  @Prop({ required: true, type: Number, min: 0 })
  maxContainers!: number;

  @Prop({ required: true, type: Number, min: 0 })
  currentOccupation!: number;
}

export const CapacitySchemaDefinition =
  SchemaFactory.createForClass(CapacitySchema);
