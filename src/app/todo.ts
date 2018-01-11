export class Todo {
    id: number;
    pri:string;
    name: string;
    date: Date;
    todoDone:false

    constructor(values: Object = {}) {
        Object.assign(this, values);
      }
}

