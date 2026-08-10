import { Injectable } from '@nestjs/common';
import { Terminal } from '@/domain/entities/terminal';
import { InjectModel } from '@nestjs/mongoose';
import { TerminalSchema } from '../../database/mongodb/schemas/terminal.schema';
import { MongooseTerminalMapper } from '../../mappers/mongodb/mongoose-terminal.mapper';
import { databaseError, notFound } from '@/application/exceptions/exceptions';
import { err, ok, type Result } from '@/@types/result';

import type { Model } from 'mongoose';
import type { MongooseTerminalRepositoryContract } from './mongoose-terminal.repository.contract';
import type { Pagination } from '@/@types/pagination';

@Injectable()
export class MongooseTerminalRepositoryImplementation implements MongooseTerminalRepositoryContract {
  constructor(
    @InjectModel(TerminalSchema.name)
    private readonly terminal: Model<TerminalSchema>,
  ) {}

  async save(input: Terminal): Promise<Result<Terminal>> {
    try {
      const raw = MongooseTerminalMapper.toMongoose(input);
      const document = await this.terminal.create(raw);
      return ok(MongooseTerminalMapper.toDomain(document));
    } catch {
      return err(databaseError('Failed to save Terminal'));
    }
  }

  async findAll(
    queryParams: Pagination.Input,
  ): Promise<Result<Pagination.Output<Terminal>>> {
    const { page = 1, perPage = 10 } = queryParams;

    const skip = (page - 1) * perPage;

    try {
      const [terminals, totalItems] = await Promise.all([
        this.terminal
          .find()
          .sort({ createdAt: 'asc' })
          .skip(skip)
          .limit(perPage)
          .exec(),

        this.terminal.countDocuments().exec(),
      ]);

      const data = terminals.map(MongooseTerminalMapper.toDomain);
      const totalPages = Math.ceil(totalItems / perPage);
      const hasNextPage = Boolean(page * perPage < totalItems);
      const hasPreviousPage = Boolean(page > 1);

      return ok({
        data,
        meta: {
          totalItems,
          page: Number(page),
          perPage: Number(perPage),
          totalPages,
          hasNextPage,
          hasPreviousPage,
        },
      });
    } catch {
      return err(databaseError('Failed to find terminals'));
    }
  }

  async findTerminalById(terminalId: string): Promise<Result<Terminal>> {
    try {
      const terminalExists = await this.terminal.findOne({ terminalId });
      if (!terminalExists) return err(notFound('Terminal'));
      return ok(MongooseTerminalMapper.toDomain(terminalExists));
    } catch {
      return err(databaseError('Failed to find terminal'));
    }
  }
}
