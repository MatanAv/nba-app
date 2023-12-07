import { TableData } from '@interfaces/storage';
import { Model } from '@interfaces/model';
import { ID } from '~types/model';

class Storage {
  static instance: Storage;

  init<T extends Model>(tableName: string) {
    if (!localStorage.getItem(tableName)) {
      const data: TableData<T> = {};
      localStorage.setItem(tableName, JSON.stringify(data));
    }
  }

  private getTable<T extends Model>(tableName: string): TableData<T> {
    const table = localStorage.getItem(tableName);

    if (!table) throw new Error(`Table not exist`);

    return JSON.parse(table);
  }

  getAll<T extends Model>(tableName: string): T[] {
    const table = this.getTable(tableName);

    return Object.values(table) as T[];
  }

  getOne<T extends Model>(tableName: string, id: ID): T | null {
    const table = this.getTable(tableName);
    const item = table[id];

    return item ? (item as T) : null;
  }

  createOne<T extends Model>(tableName: string, item: T): T[] {
    const table = this.getTable(tableName);

    if (table[item.id]) throw new Error(`Item with id ${item.id} already exist`);

    table[item.id] = item;

    localStorage.setItem(tableName, JSON.stringify(table));

    return Object.values(table) as T[];
  }

  updateOne<T extends Model>(tableName: string, updatedItem: T): T[] {
    const table = this.getTable(tableName);

    if (!table[updatedItem.id]) throw new Error(`No item found with id ${updatedItem.id}`);

    table[updatedItem.id] = updatedItem;

    localStorage.setItem(tableName, JSON.stringify(table));

    return Object.values(table) as T[];
  }

  deleteOne<T extends Model>(tableName: string, id: ID): T[] {
    const table = this.getTable(tableName);

    if (!table[id]) throw new Error(`No item found with id ${id}`);

    delete table[id];

    localStorage.setItem(tableName, JSON.stringify(table));

    return Object.values(table) as T[];
  }

  exists(tableName: string, id: ID): boolean {
    const table = this.getTable(tableName);

    return !!table[id];
  }

  public static getInstance() {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }
    return Storage.instance;
  }
}

export default Storage.getInstance();
