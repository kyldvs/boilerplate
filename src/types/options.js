'use babel';
/* @flow */

export type Options = {
  babel?: Object,
  paths: {
    src: Array<string>,
    dest: string,

    dist: string,
    entry: string,
    name: string,
  },
};
