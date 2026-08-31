/*
 * Arquivo que roda antes de cada suit de testes responsável por subir e derrubar o PrismaService.
 * Limpa as tabelas do banco de dados no beforeEach().
 * Cada arquivo de teste é responsável por injetar o PrismaService no beforeEach().
 * Exporta uma instancia do PrismaService específica para o ambiente de testes de integração.
 * O sinon.restore() limpa os test doubles (stub,spy,etc.) após cada suit de testes.
 * O nock.cleanAll() limpa todas as requests HTTP mockadas.
 */

import sinon from 'sinon';
import nock from 'nock';
import { PrismaService } from '@/external/persistence/database/prisma/prisma.service';

export let testPrismaService: PrismaService;

beforeEach(async () => {
  testPrismaService = new PrismaService();
  await testPrismaService.$connect();
  await testPrismaService.container.deleteMany();
});

afterEach(async () => {
  await testPrismaService.$disconnect();
  sinon.restore();
  nock.cleanAll();
});
