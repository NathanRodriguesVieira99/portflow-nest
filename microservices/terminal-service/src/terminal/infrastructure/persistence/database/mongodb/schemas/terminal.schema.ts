import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CapacitySchemaDefinition, CapacitySchema } from './capacity.schema';
import { ZoneSchemaDefinition, ZoneSchema } from './zone.schema';
import { RestrictionSchemaDefinition,  RestrictionSchema } from './restriction.schema';

import type { HydratedDocument } from 'mongoose';

/**
 *
 */
export type TerminalDocument = HydratedDocument<TerminalSchema>;

@Schema({ collection: 'terminals', timestamps: true, versionKey: false })
export class TerminalSchema {
  @Prop({ required: true, type: String, unique: true, index: true })
  domainId!: string;

  @Prop({ required: true, type: String, trim: true })
  terminalId!: string;

  @Prop({ required: true, type: String, trim: true })
  name!: string;

  @Prop({ required: true, type: Boolean })
  isActive!: boolean;

  @Prop({ required: true, type: [String] })
  acceptedCargoTypes!: string[];

  @Prop({ required: true, type: CapacitySchemaDefinition })
  capacity!: CapacitySchema;

  @Prop({ required: true, type: [ZoneSchemaDefinition] })
  zones!: ZoneSchema[];

  @Prop({ required: true, type: RestrictionSchemaDefinition })
  restrictions!: RestrictionSchema;

  @Prop({ required: true, type: [String] })
  equipments!: string[];
}

export const TerminalSchemaDefinition =
  SchemaFactory.createForClass(TerminalSchema);
