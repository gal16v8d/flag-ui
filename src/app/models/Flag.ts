import { AppDb } from './AppDb';

export class Flag {
  constructor(
    public name: string,
    public app: AppDb,
    public value: boolean,
    public _id?: string
  ) {}
}
