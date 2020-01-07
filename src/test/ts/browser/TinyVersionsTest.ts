import { Pipeline } from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock-client';
import { sLoad, sWithVersion } from '../../../main/ts/loader/Versions';
import { sAssertVersion } from '../module/AssertVersion';

UnitTest.asynctest('TinyVersionsTest', (success, failure) => {
  Pipeline.async({}, [
    sLoad('4.5.x'),
    sAssertVersion(4, 5),
    sLoad('4.8.x'),
    sAssertVersion(4, 8),
    sWithVersion('4.5.x', sAssertVersion(4, 5)),
    sWithVersion('4.8.x', sAssertVersion(4, 8))
  ], () => success(), failure);
});
