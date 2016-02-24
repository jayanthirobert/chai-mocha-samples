var _ = require('lodash'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    assert = chai.assert;

chai.use(require('chai-string'));
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'));
chai.use(require('chai-catch-exception'));

describe('A Holidaycheck employee using chai', function () {
  // This is an exam about how to assert stuff using chai

  it('should be able to assert simple values', function () {
    var t = _.sample([ 0, 5, 7, 8 ]);

    // Assertion here -> t is not undefined or null
    assert.isDefined(t);
    assert.isNotNull(t);

    expect(t).to.not.be.a('undefined');
    expect(t).to.not.be.a('null');

    (t).should.not.be.a('undefined');
    (t).should.not.be.a('null');

    // Assertion here -> t is larger then -1
    assert.isAbove(t, -1, 't is strictly greater than -1');
    expect(t).to.be.above(-1);
    (t).should.be.above(-1);

    // Assertion here -> t is 0, 5, 7 or 8
    const randomValue = [ 0, 5, 7, 8 ];

    assert.oneOf(t, randomValue, 'found in randomValue');
    expect(t).to.be.oneOf(randomValue);
    (t).should.be.oneOf(randomValue);

    // Assertion here -> t is a number
    assert.isNumber(t);
    expect(t).to.be.a('number');
    (t).should.be.a('number');
  });

  it('should be able to assert objects', function () {
    var t = { some: { nested: { stuff: 15 } }, other: 'stuff' };

    // Assertion here -> for the other stuff property of t
    assert.propertyVal(t, 'other', 'stuff');
    expect(t).to.have.property('other', 'stuff');
    (t).should.have.property('other', 'stuff');

    // Assertion here -> t.some.nested.stuff == 15
    assert.deepProperty(t, 'some.nested.stuff', 15);
    expect(t).to.have.deep.property('some.nested.stuff', 15);
    (t).should.have.deep.property('some.nested.stuff', 15);

    // Assertion here -> t.some.nested.stuff > 12
    assert.deepProperty(t, 'some.nested.stuff');
    expect(t).to.have.deep.property('some.nested.stuff');
    (t).should.have.deep.property('some.nested.stuff');

    const result = t.some.nested.stuff;
    assert.isAbove(result, 12);

    // Assertion here -> Structure of the object in some.nested
    assert.deepProperty(t, 'some.nested');
    expect(t).to.have.deep.property('some.nested');
    (t).should.have.deep.property('some.nested');
  });

  it('should be able to assert arrays', function () {
    var t = _.sample([ [ 1, 2 ], [ 2, 3 ] ]);

    // Assertion here -> t length
    const count = t.length;

    assert.isOk(count);
    expect(count).to.be.ok;
    (count).should.be.ok;

    // Assertion here -> t always contains 2
    assert.lengthOf(t, 2);
    expect(t).to.have.length(2);
    (t).should.have.length(2);
  });


  it('should be able to assert errors', function () {
    var errorThrowingAdd = (arg1, arg2) => {
      if (!_.isNumber(arg1) || !_.isNumber(arg2)) {
        throw new Error("Some error with " + arg2 );
      }
      return arg1 + arg2;
    }

    // Assertion here -> Assert that it works fine for 2 + 2
    assert.equal(errorThrowingAdd(2, 2), 4);
    expect(errorThrowingAdd(2, 2)).to.equal(4);
    (errorThrowingAdd(2, 2)).should.equal(4);

    // Assertion here -> Assert that it throws an error when one or both arguments are missing
    expect(errorThrowingAdd).withParams([1,'']).to.throw(Error, 'Some error with undefined');
    expect(errorThrowingAdd).withParams(['','']).to.throw(Error, 'Some error with undefined');
    expect(errorThrowingAdd).withParams([]).to.throw(Error, 'Some error with undefined');

    // Assertion here -> Assert that it throws for non-number arguments
    expect(errorThrowingAdd).withParams(['sdfdsf','sd']).to.throw(Error, 'Some error with undefined');
    expect(errorThrowingAdd).withParams([1,'dwew']).to.throw(Error, 'Some error with undefined');
    expect(errorThrowingAdd).withParams(['cefe', 2]).to.throw(Error, 'Some error with undefined');
  });

  it('should be able to assert strings', function () {
    var str = _.sample([ 'abbbaaaba', 'abbaaabba', 'abaaabbba' ]);

    // Assertion here -> t begins with an a
    assert.startsWith(str, 'a');
    expect(str).to.startsWith('a');
    (str).should.startsWith('a');

    // Assertion here -> t ends with ba
    assert.endsWith(str, 'ba');
    expect(str).to.endsWith('ba');
    (str).should.endsWith('ba');

    // Assertion here -> somewhere in t the string aaa exists
    assert.entriesCount(str, 'aaa', 1);
    expect(str).to.have.entriesCount('aaa', 1);
    (str).should.have.entriesCount('aaa', 1);
  });

  it('should be able to assert arrays of things', function () {
    var aboveZero = _.sample.bind(null, [ 1, 2, 3 ]);
    var belowZero = _.sample.bind(null, [ -1, -2, -3 ]);
    var thingsA = [ aboveZero(), aboveZero(), belowZero() ];
    var thingsB = [ aboveZero(), aboveZero(), { a: 'b' }, { b: 'c' } ];

    // Assertion here -> thingsA should contain an element below 0
    expect(thingsA).to.include.one.below(0);
    (thingsA).should.include.one.below(0);

    // Assertion here -> thingsA should all be above -4
    expect(thingsA).to.include.one.above(-4);
    (thingsA).should.include.one.above(-4);

    // Assertion here -> thingsA should only contain numbers
    assert.typeOf(thingsA[0], 'number');
    assert.typeOf(thingsA[1], 'number');
    assert.typeOf(thingsA[2], 'number');

    expect(thingsA[0]).to.be.an('number');
    expect(thingsA[1]).to.be.an('number');
    expect(thingsA[2]).to.be.an('number');

    (thingsA[0]).should.be.an('number');
    (thingsA[1]).should.be.an('number');
    (thingsA[2]).should.be.an('number');

    // Assertion here -> thingsB should contain an object with a propery a of type string

    // Assertion here -> thingsB should contain some numbers
  });

  it('should be able to assert promises', function () {
    var rejectingPromise = Promise.reject(new Error('Test Error'));
    var resolvingPromise = Promise.resolve({ some: { deep: 'object' } });

    // Question: Why do we need Promise.all here to do multiple assertions?
    return Promise.all([
      // Assertion here -> resolvingPromise should be resolved
      resolvingPromise.should.be.fulfilled,

      // Assertion here -> rejectingPromise should be rejected with correct error
      rejectingPromise.should.be.rejectedWith(Error),

      // Assertion here -> resolvingPromise should resolve to the correct object
      resolvingPromise.should.eventually.deep.equal({ some: { deep: 'object' } }),

      // Assertion here -> resolvingPromises result should have property some.deep that is a string
      resolvingPromise.should.eventually.deep.property('some.deep')
    ]);
  });
});
