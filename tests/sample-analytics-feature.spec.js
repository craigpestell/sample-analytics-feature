describe('sample-analytics-feature', () => {
  let data;

  beforeEach(() => {
    loadFixtures('main.html'); // fixtures/html/main.html becomes your DOM
    data = getJSONFixture('sample-analytics-feature.json');
  });

  it('should have tests', () => {
    expect(data).toEqual({ foo: 'bar', abc: 'xyz' });
  });

  it('might have async tests', (done) => {
    Promise.resolve('foobar').then((result) => {
      expect(result).toBe('foobar');
      done();
    });
  });
});
