export interface ICRUD<T> {
  create (item: T): Promise<T | undefined>;
  read(id: string): Promise<T | undefined>;
  update (id: string, item: T): Promise<T | undefined>;
  delete (id: string): Promise<boolean>;
}
