#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/8ccbe013d4a7dded7088337e2fd6ebebdccdacbfe8da18b9d6587f837652e5a5/contract';
import endContract from '../../snapshots/8ccbe013d4a7dded7088337e2fd6ebebdccdacbfe8da18b9d6587f837652e5a5/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [];
  }
}

MigrationCLI.run(import.meta.url, M);
