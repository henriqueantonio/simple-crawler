"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  interval: 300,
  maxConcurrency: 2,
  timeout: 20 * 1000,
  // 20 seconds
  maxResourceSize: 1024 * 2024 * 1,
  // 1mb
  customHeaders: {},
  acceptCookies: false,
  allowedUrlPatterns: ['/[^./]*$', // extension less
  '\\.(html|htm|aspx|php)$' // .html + .htm
  ]
};
exports.default = _default;