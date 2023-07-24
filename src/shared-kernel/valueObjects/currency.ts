export class Currency {
  constructor(private id: string) {}

  public equalTo(other: Currency): boolean {
    return this.id === other.id;
  }
}
