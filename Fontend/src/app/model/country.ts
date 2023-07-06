export class Country {



  id: number | undefined;
  name: string | undefined;
  code: string | undefined;

  constructor(id: number | undefined, name: string | undefined, code: string | undefined) {
    this.id = id;
    this.name = name;
    this.code = code;
  }
}
