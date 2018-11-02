import { TinyVer } from '../../main/ts/api/Main';

/* tslint:disable:no-console */

const fakeTiny = {
  majorVersion: '4',
  minorVersion: '8.5'
};

const fakeTiny2 = {
  majorVersion: '4',
  minorVersion: '7.5'
};

console.log(TinyVer.getVersion(fakeTiny));
console.log(TinyVer.isLessThan(fakeTiny, '4.8.0'));
console.log(TinyVer.isLessThan(fakeTiny2, '4.8.0'));
