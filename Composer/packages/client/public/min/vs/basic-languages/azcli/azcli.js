/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * monaco-languages version: 1.9.2(48bed9874ad53f221d1b60976b2ab3b964852472)
 * Released under the MIT license
 * https://github.com/Microsoft/monaco-languages/blob/master/LICENSE.md
 *-----------------------------------------------------------------------------*/
define('vs/basic-languages/azcli/azcli', ['require', 'exports'], function (e, t) {
  'use strict';
  Object.defineProperty(t, '__esModule', { value: !0 }),
    (t.conf = { comments: { lineComment: '#' } }),
    (t.language = {
      defaultToken: 'keyword',
      ignoreCase: !0,
      tokenPostfix: '.azcli',
      str: /[^#\s]/,
      tokenizer: {
        root: [
          { include: '@comment' },
          [
            /\s-+@str*\s*/,
            {
              cases: {
                '@eos': { token: 'key.identifier', next: '@popall' },
                '@default': { token: 'key.identifier', next: '@type' },
              },
            },
          ],
          [
            /^-+@str*\s*/,
            {
              cases: {
                '@eos': { token: 'key.identifier', next: '@popall' },
                '@default': { token: 'key.identifier', next: '@type' },
              },
            },
          ],
        ],
        type: [
          { include: '@comment' },
          [
            /-+@str*\s*/,
            { cases: { '@eos': { token: 'key.identifier', next: '@popall' }, '@default': 'key.identifier' } },
          ],
          [/@str+\s*/, { cases: { '@eos': { token: 'string', next: '@popall' }, '@default': 'string' } }],
        ],
        comment: [[/#.*$/, { cases: { '@eos': { token: 'comment', next: '@popall' } } }]],
      },
    });
});
