var _ = require('lodash'),
    chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon');

chai.use(require('sinon-chai'));

describe('A Holidaycheck employee using sinon', function () {
  // This is kind of a mixture of an exam between sinon and the according expectations

  it('should be able to use spies', function () {
    var functionToTest = (arg, callback) => callback(null, arg);

    // Assertion here -> functionToTest should call callback with correct argument
    var callback = sinon.spy();

    functionToTest(3, callback);
    expect(callback.calledWith(null, 3)).to.equal(true);

    functionToTest('foo', callback);
    expect(callback.calledWith(null, 'foo')).to.equal(true);
  });

  it('should be able to attach spies to objects', function () {
    var functionToTest = (arg) => {
      arg.method(12);
      return arg.method(24);
    };
    var arg = {
      method: (val) => val * 2
    };

    // Assertion here -> functionToTest should call arg.method with
    // correct arg
    var stub = sinon.stub();
    var xy = {
      method: stub
    };

    stub.withArgs(12).returns(24);
    stub.withArgs(24).returns(48);

    var result = functionToTest(xy);

    expect(xy.method).to.have.been.calledTwice;

    // Assertion here -> the return value of functionToTest should be 48
    expect(result).to.equal(48);
  });

  it('should be able to assert a partial argument', function () {
    var functionToTest = (fn) => {
      var randomSample = _.sample([
        { a: 'a', b: 'b' },
        { a: 'a', b: 'c' }
      ]);
      return fn(randomSample);
    };

    var spy = sinon.spy();
    functionToTest(spy);

    // Assertion here -> fn has been called with a object that as an a property set to 'a'
    expect(spy).have.been.calledWithMatch({ a: 'a'});
  });

  it('should be able to assert the context of a spy', function () {
    var functionToTest = (ctx, fn) => {
      return fn.bind(ctx)();
    };

    const ctx = {};
    var spy = sinon.spy();
    functionToTest(ctx, spy);

    // Assertion here -> The this value inside functionToTest should be ctx
    expect(spy).always.have.been.calledOn(ctx);

  });

  it('should be able to use stubs', function () {
    var functionToTest = (fn) => {
      return fn('oneArg') * 2 - fn('otherArg');
    };

    var stub = sinon.stub();
    stub.withArgs('a', 'b').returns('a * 2 - b');

    functionToTest(stub);

    // Assertion here -> For fixed return values of fn return the correct
    // calculation result
  });

  it('should be able to use stubs with objects', function () {
    var functionToTest = (obj) => {
      return obj.method('oneArg') * 2 - obj.method('otherArg');
    };

    // Assertion here -> For fixed return values of obj.method return the correct
    // calculation result
  });

  it('should be able to throw stuff from stubs', function () {
    var functionToTest = (fn, arg) => {
      try {
        return fn(arg);
      } catch (e) {
        return e.message;
      }
    };

    var stub = sinon.stub();
    stub.withArgs('a').returns('a');
    stub.withArgs('b').throws();

    // Assertion here -> functionToTest with argument 'a' returns some value
    functionToTest(stub, 'a');
    expect(stub).have.returned('a');

    // Assertion here -> functionToTest with argument 'b' returns an error message
    functionToTest(stub, 'b');
    expect(stub).have.thrown();
  });

  it('should be able to call callbacks from stubs', function (done) {
    var functionToTest = (fn, arg, callback) => {
      return fn(arg, function (err, result) {
        if (err) {
          return callback(err);
        }
        callback(null, result * 2);
      });
    };

    // Assertion here -> An error that occurs in fn is handled and
    // a missing result from it is ok

    // Assertion here -> If no error occurs in obj.method the result is correct
  });

  it('should be able to stub global stuff', function () {
    var functionToTest = () => {
      console.log('Hallo');
    };

    var functionToTest = sinon.stub();
    functionToTest.returns('foo');

    var result = functionToTest();

    // Assertion here -> The logging works correctly
    expect(result).to.equal('foo');

  });

  it('should be able to stub away dates', function () {
    var functionToTest = (date) => {
      return date > new Date();
    };

    // Assertion here -> passed date is before now

    // Assertion here -> passed date is after now
  });
});
