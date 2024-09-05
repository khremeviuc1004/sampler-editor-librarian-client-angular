import { NotePipe } from './note.pipe';

describe('NotePipe', () => {
  it('create an instance', () => {
    const pipe = new NotePipe();
    expect(pipe).toBeTruthy();
  });

  it('Convert 21 to A-1', () => {
    const pipe = new NotePipe();
    expect(pipe.transform(21)).toBe('A-1');
  });

  it('Convert 23 to B-1', () => {
    const pipe = new NotePipe();
    expect(pipe.transform(23)).toBe('B-1');
  });

  it('Convert 24 to C0', () => {
    const pipe = new NotePipe();
    expect(pipe.transform(24)).toBe('C0');
  });

  it('Convert 127 to G8', () => {
    const pipe = new NotePipe();
    expect(pipe.transform(127)).toBe('G8');
  });

  it('Convert 40 to E1', () => {
    const pipe = new NotePipe();
    expect(pipe.transform(40)).toBe('E1');
  });

  it('Convert 66 to F#3', () => {
    const pipe = new NotePipe();
    expect(pipe.transform(66)).toBe('F#3');
  });

  it('Convert 97 to C#6', () => {
    const pipe = new NotePipe();
    expect(pipe.transform(97)).toBe('C#6');
  });

  it('Convert 110 to D7', () => {
    const pipe = new NotePipe();
    expect(pipe.transform(110)).toBe('D7');
  });

  it('Convert 21 to 21', () => {
    const pipe = new NotePipe();
    expect(pipe.transform(21, false)).toBe(21);
  });

  it('Convert 127 to 127', () => {
    const pipe = new NotePipe();
    expect(pipe.transform(127, false)).toBe(127);
  });

  it('Convert 127 to G8', () => {
    const pipe = new NotePipe();
    expect(pipe.transform(127, true)).toBe('G8');
  });

  it('Convert 40 to 40', () => {
    const pipe = new NotePipe();
    expect(pipe.transform(40, false)).toBe(40);
  });

  it('Convert 66 to 66', () => {
    const pipe = new NotePipe();
    expect(pipe.transform(66, false)).toBe(66);
  });

  it('Convert 97 to 97', () => {
    const pipe = new NotePipe();
    expect(pipe.transform(97, false)).toBe(97);
  });

  it('Convert 110 to 110', () => {
    const pipe = new NotePipe();
    expect(pipe.transform(110, false)).toBe(110);
  });
});
