export class Ordner {}

export class OrdnerA extends Ordner {
  type: string = 'A';
  a: string = 'a';
}
export class OrdnerB extends Ordner {
  type: string = 'B';
  b: string = 'b';
}

export function getOrdner(ordner: OrdnerA): string;
export function getOrdner(ordner: OrdnerB): string;
export function getOrdner(ordner: OrdnerA | OrdnerB): string {
  if (ordner instanceof OrdnerA) {
    return ordner.a;
  }
  if (ordner instanceof OrdnerB) {
    return ordner.b;
  }

  return 'what?';
}

// export function getOrdner2(ordner: Partial<OrdnerA>): void {
//   console.log(ordner.type);
// }

export function test() {
  const ordnerA = new OrdnerA();
  console.log(getOrdner(ordnerA)); // A

  const ordnerB = new OrdnerB();
  console.log(getOrdner(ordnerB)); // B

  // getOrdner2({ type: 'A' });
}
