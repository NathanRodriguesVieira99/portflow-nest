import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class RestrictionSchema {
  @Prop({ required: true, type: Boolean })
  acceptsDangerousCargo!: boolean;

  @Prop({ required: true, type: Boolean })
  acceptsRefrigeratedCargo!: boolean;

  @Prop({ required: true, type: Number, min: 0 })
  maxHeightInMeters!: number;

  @Prop({ required: true, type: Number, min: 0 })
  maxWeightInTons!: number;
}

export const RestrictionSchemaDefinition =
  SchemaFactory.createForClass(RestrictionSchema);
