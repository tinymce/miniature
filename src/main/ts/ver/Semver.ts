export interface Version {
  major: number;
  minor: number;
  patch: number;
}

export const enum Comparison {
  EQ = 0,
  GT = 1,
  LT = -1
}

const toInt = (str: string) => {
  return parseInt(str, 10);
};

const cmp = (a: Comparison, b: Comparison): Comparison => {
  const delta = a - b;

  if (delta === 0) {
    return Comparison.EQ;
  }

  return delta > 0 ? Comparison.GT : Comparison.LT;
};

export const nu = (major: number, minor: number, patch: number) => {
  return { major, minor, patch };
};

export const parse = (versionString: string): Version => {
  const parts = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(versionString);
  return parts ? nu(toInt(parts[1]), toInt(parts[2]), toInt(parts[3])) : nu(0, 0, 0);
};

export const compare = (version1: Version, version2: Version): Comparison => {
  const cmp1 = cmp(version1.major, version2.major);
  if (cmp1 !== Comparison.EQ) {
    return cmp1;
  }

  const cmp2 = cmp(version1.minor, version2.minor);
  if (cmp2 !== Comparison.EQ) {
    return cmp2;
  }

  const cmp3 = cmp(version1.patch, version2.patch);
  if (cmp3 !== Comparison.EQ) {
    return cmp3;
  }

  return Comparison.EQ;
};