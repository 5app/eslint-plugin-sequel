## [1.12.1](https://github.com/5app/eslint-plugin-sequel/compare/v1.12.0...v1.12.1) (2024-08-01)


### Bug Fixes

* **no-shorthand-offset:** fix perf issue with lookbehind assertion, noissue ([8c62032](https://github.com/5app/eslint-plugin-sequel/commit/8c6203214c8792cd83eb5b814f63e234e6c386a9))

# [1.12.0](https://github.com/5app/eslint-plugin-sequel/compare/v1.11.0...v1.12.0) (2024-08-01)


### Features

* **no-shorthand-offset:** prevent 'LIMIT offset, count' syntax ([94e0409](https://github.com/5app/eslint-plugin-sequel/commit/94e04098c52133349acd3476fdc541e1dfe714dc))

# [1.11.0](https://github.com/5app/eslint-plugin-sequel/compare/v1.10.0...v1.11.0) (2024-07-15)


### Features

* **no-backticks:** new rule to prevent incompatible backticks, noissue ([0181fce](https://github.com/5app/eslint-plugin-sequel/commit/0181fce8ff78e595829f248e854d63cc608ded49))

# [1.10.0](https://github.com/5app/eslint-plugin-sequel/compare/v1.9.10...v1.10.0) (2024-07-08)


### Features

* **allowed-functions:** rule allowed-functions or rather disallowed, fixes [#86](https://github.com/5app/eslint-plugin-sequel/issues/86) ([d2be98c](https://github.com/5app/eslint-plugin-sequel/commit/d2be98c4766cb5f47b0ab9e8f41675a9c952409f))

## [1.9.10](https://github.com/5app/eslint-plugin-sequel/compare/v1.9.9...v1.9.10) (2023-07-19)


### Bug Fixes

* **deps:** npm audit fix ([2d0baa7](https://github.com/5app/eslint-plugin-sequel/commit/2d0baa7282da63e03f6e94c3ca783ac8c9e94946))

## [1.9.9](https://github.com/5app/eslint-plugin-sequel/compare/v1.9.8...v1.9.9) (2022-09-16)


### Bug Fixes

* **dictionary:** add EXISTS ([c8dc2a2](https://github.com/5app/eslint-plugin-sequel/commit/c8dc2a2de5b204c8a85da50ef7ee044eff4de15e))

## [1.9.8](https://github.com/5app/eslint-plugin-sequel/compare/v1.9.7...v1.9.8) (2021-09-03)


### Bug Fixes

* **ci:** update ci cimg, noissue ([#47](https://github.com/5app/eslint-plugin-sequel/issues/47)) ([d8c8688](https://github.com/5app/eslint-plugin-sequel/commit/d8c868855a325ac93f7258eb36e26db3dd75e737))

## [1.9.7](https://github.com/5app/eslint-plugin-sequel/compare/v1.9.6...v1.9.7) (2021-08-18)

### Bug Fixes

-   **parser:** include delete with alias ([44be945](https://github.com/5app/eslint-plugin-sequel/commit/44be945fe78ed2ae0c4546b8f0e522d79bc3f4c1))

## [1.9.6](https://github.com/5app/eslint-plugin-sequel/compare/v1.9.5...v1.9.6) (2021-08-18)

### Bug Fixes

-   **parser:** include delete with alias ([9abdaa6](https://github.com/5app/eslint-plugin-sequel/commit/9abdaa68c2322612f9daf8c7361cc5405a69cecc))

## [1.9.5](https://github.com/5app/eslint-plugin-sequel/compare/v1.9.4...v1.9.5) (2021-08-18)

### Bug Fixes

-   **sqlparser:** include INSERT tble, without INTO ([1e10703](https://github.com/5app/eslint-plugin-sequel/commit/1e10703f2a87a46c55d4d567291c9f77e645cd4f))

## [1.9.4](https://github.com/5app/eslint-plugin-sequel/compare/v1.9.3...v1.9.4) (2021-08-18)

### Bug Fixes

-   **sqlparser:** include INSERT...SELECT ([2776e70](https://github.com/5app/eslint-plugin-sequel/commit/2776e70de0fc06b6951591caba0bd5caa33a80be))

## [1.9.3](https://github.com/5app/eslint-plugin-sequel/compare/v1.9.2...v1.9.3) (2021-08-12)

### Bug Fixes

-   **deps:** update dev dependencies ([6a5e92d](https://github.com/5app/eslint-plugin-sequel/commit/6a5e92d0ad59326936cb4b0cdc058897d5f54216))

## [1.9.2](https://github.com/5app/eslint-plugin-sequel/compare/v1.9.1...v1.9.2) (2021-02-19)

### Bug Fixes

-   **no-eol-command:** fix order ([b644104](https://github.com/5app/eslint-plugin-sequel/commit/b644104f108594c7cbe0258ac1da2d8254e48c97))

## [1.9.1](https://github.com/5app/eslint-plugin-sequel/compare/v1.9.0...v1.9.1) (2021-02-19)

### Bug Fixes

-   **no-eol-command:** ignore DISTINCT, ASC... etc ([bfadc22](https://github.com/5app/eslint-plugin-sequel/commit/bfadc229d852a9ffa1315a047d5db19afb5a90e2))

# [1.9.0](https://github.com/5app/eslint-plugin-sequel/compare/v1.8.0...v1.9.0) (2021-02-19)

### Features

-   **rule:** no-eol-command ([b2d31af](https://github.com/5app/eslint-plugin-sequel/commit/b2d31afe495c998305b50c95092e2001a091ad2b))

# [1.8.0](https://github.com/5app/eslint-plugin-sequel/compare/v1.7.0...v1.8.0) (2020-07-05)

### Features

-   **rule:** indent ([#6](https://github.com/5app/eslint-plugin-sequel/issues/6)) ([88ebe6d](https://github.com/5app/eslint-plugin-sequel/commit/88ebe6d4c6d2c9feb84531cc3bb1a0ab34c77d73))

# [1.7.0](https://github.com/5app/eslint-plugin-sequel/compare/v1.6.0...v1.7.0) (2020-04-20)

### Features

-   **rules:** rename max-prepared to max-placeholders ([f4b9a8b](https://github.com/5app/eslint-plugin-sequel/commit/f4b9a8b31555ddd1837b399c3371538c21c151e6))

# [1.6.0](https://github.com/5app/eslint-plugin-sequel/compare/v1.5.3...v1.6.0) (2020-04-09)

### Features

-   **rules:** add max-prepared ([4ff450e](https://github.com/5app/eslint-plugin-sequel/commit/4ff450e68497a01118e46928afe40d6bf96638e1))

## [1.5.3](https://github.com/5app/eslint-plugin-sequel/compare/v1.5.2...v1.5.3) (2020-04-03)

### Bug Fixes

-   **discovery:** found some literals weren't covered ([c430964](https://github.com/5app/eslint-plugin-sequel/commit/c4309641b3b55cabc25fe6e86a214ed87ac6f2f8))

## [1.5.2](https://github.com/5app/eslint-plugin-sequel/compare/v1.5.1...v1.5.2) (2020-03-23)

### Bug Fixes

-   **sequel/no-shorthand-all:** ignore multiplication ([173d493](https://github.com/5app/eslint-plugin-sequel/commit/173d493aafe05f7aa3044bef742c80d48ee28641))

## [1.5.1](https://github.com/5app/eslint-plugin-sequel/compare/v1.5.0...v1.5.1) (2020-03-22)

### Bug Fixes

-   **rules:** do not match comments /\*\*/ ([1175f95](https://github.com/5app/eslint-plugin-sequel/commit/1175f9519599235bc5f0e98a4168e6bcc5c0c4a1))

# [1.5.0](https://github.com/5app/eslint-plugin-sequel/compare/v1.4.1...v1.5.0) (2020-03-21)

### Features

-   **sequel/no-shorthand-all:** new rule ([e3c601b](https://github.com/5app/eslint-plugin-sequel/commit/e3c601bfba768f2b96fb81b8d5bda40ed6ba6c98))

## [1.4.1](https://github.com/5app/eslint-plugin-sequel/compare/v1.4.0...v1.4.1) (2020-03-21)

### Bug Fixes

-   **sequel/spacing:** honour multilines ([f099acb](https://github.com/5app/eslint-plugin-sequel/commit/f099acbc2a504c2254fa7adc0c252c444690cd58))

# [1.4.0](https://github.com/5app/eslint-plugin-sequel/compare/v1.3.3...v1.4.0) (2020-03-20)

### Features

-   **rule/spacing:** Add new spacing rule ([3246fbe](https://github.com/5app/eslint-plugin-sequel/commit/3246fbe2c94cd75ddc42193ce7b8dc79c77815af))

## [1.3.3](https://github.com/5app/eslint-plugin-sequel/compare/v1.3.2...v1.3.3) (2020-03-17)

### Bug Fixes

-   **rules:** function-case ignore keywords in quotes ([75ac87f](https://github.com/5app/eslint-plugin-sequel/commit/75ac87f1c1c1b3b35ba153e93f8e074912fd1389))

## [1.3.2](https://github.com/5app/eslint-plugin-sequel/compare/v1.3.1...v1.3.2) (2020-03-17)

### Bug Fixes

-   **sql-detector:** ensures it's the first part of the string ([b799035](https://github.com/5app/eslint-plugin-sequel/commit/b799035b547627c1e2b2894017fb8b60c27585ad))

## [1.3.1](https://github.com/5app/eslint-plugin-sequel/compare/v1.3.0...v1.3.1) (2020-03-17)

### Bug Fixes

-   **rules:** function-case add 'NOT IN|IN|ASC|DESC|BETWEEN' ([b550fe5](https://github.com/5app/eslint-plugin-sequel/commit/b550fe5d1f6fef919af76a7adc61dd5eab83883c))

# [1.3.0](https://github.com/5app/eslint-plugin-sequel/compare/v1.2.0...v1.3.0) (2020-03-17)

### Features

-   **rules:** function-case group by order by ([51ad76a](https://github.com/5app/eslint-plugin-sequel/commit/51ad76a33e1632eef911f35072f952633c66841e))

# [1.2.0](https://github.com/5app/eslint-plugin-sequel/compare/v1.1.1...v1.2.0) (2020-03-17)

### Features

-   **rules:** update function-case to include functions ([ff30898](https://github.com/5app/eslint-plugin-sequel/commit/ff30898c3b0cbf41cf6b45ca6e1c5aa54d762d56))

## [1.1.1](https://github.com/5app/eslint-plugin-sequel/compare/v1.1.0...v1.1.1) (2020-03-12)

### Bug Fixes

-   **rule/function-case:** match tagged and non-tagged SQL statements ([ce832f9](https://github.com/5app/eslint-plugin-sequel/commit/ce832f9e7378f2a966179f75b535a20213f3bb55))

# [1.1.0](https://github.com/5app/eslint-plugin-sequel/compare/v1.0.5...v1.1.0) (2020-03-12)

### Features

-   **rules/function-case:** New rule for fomatting SQL special words ([7970c0a](https://github.com/5app/eslint-plugin-sequel/commit/7970c0afa4ce5f3b9b58ac80a386d15d6da88ad2))

## [1.0.5](https://github.com/5app/eslint-plugin-sequel/compare/v1.0.4...v1.0.5) (2020-03-12)

### Bug Fixes

-   **regression:** when node is empty ([a9b11c5](https://github.com/5app/eslint-plugin-sequel/commit/a9b11c5fb1b1ae7adcdc9aed45f780bd4c2181a7))

## [1.0.4](https://github.com/5app/eslint-plugin-sequel/compare/v1.0.3...v1.0.4) (2020-03-09)

### Bug Fixes

-   **regression:** missing util folder ([8ee64da](https://github.com/5app/eslint-plugin-sequel/commit/8ee64da6c84a0b7b0c676a9bd2367cc283770dcc))

## [1.0.3](https://github.com/5app/eslint-plugin-sequel/compare/v1.0.2...v1.0.3) (2020-03-09)

### Bug Fixes

-   **no-unsafe-query:** sql parser includes DELETE, UPDATE and INSERTs ([f1db361](https://github.com/5app/eslint-plugin-sequel/commit/f1db361d3de23321088b7be9c53b1a1ee72bb376))

## [1.0.2](https://github.com/5app/eslint-plugin-sequel/compare/v1.0.1...v1.0.2) (2020-03-06)

### Bug Fixes

-   **ci:** reduce npm bundle ([67ef46c](https://github.com/5app/eslint-plugin-sequel/commit/67ef46cd62906dabfbb9c42767d0e77b68bb8eac))

## [1.0.1](https://github.com/5app/eslint-plugin-sequel/compare/v1.0.0...v1.0.1) (2020-03-06)

### Bug Fixes

-   **ci:** Publish to npm ([ac94983](https://github.com/5app/eslint-plugin-sequel/commit/ac94983abe454d0199272dae5b27aac3197182c5))

# 1.0.0 (2020-03-06)

### Features

-   **rule:** Initiate the no-unsafe-query rule ([4f35c2d](https://github.com/5app/eslint-plugin-sequel/commit/4f35c2df8c4c96303a5ee2d216e8d74c43c1efac))

## [1.2.1](https://github.com/5app/js-template/compare/v1.2.0...v1.2.1) (2019-12-12)

### Bug Fixes

-   **deps:** npm audit ([ca738db](https://github.com/5app/js-template/commit/ca738dba9044e54931fab71afdee889a8acde958))

# [1.2.0](https://github.com/5app/js-template/compare/v1.1.1...v1.2.0) (2019-12-12)

### Features

-   **prettier:** format file commits using prettier ([#22](https://github.com/5app/js-template/issues/22)) ([7f6eee8](https://github.com/5app/js-template/commit/7f6eee8f884fa4b21a7799df4b6727ab0a430415))

## [1.1.1](https://github.com/5app/js-template/compare/v1.1.0...v1.1.1) (2019-11-06)

### Bug Fixes

-   **publish:** add scope for npm package ([4235eed](https://github.com/5app/js-template/commit/4235eed4a50b3ef4b7e8d1c949b25c1a8ce3ad11))

# [1.1.0](https://github.com/5app/js-template/compare/v1.0.0...v1.1.0) (2019-11-06)

### Features

-   **publish:** set publishConfig access public ([2584e1f](https://github.com/5app/js-template/commit/2584e1f3bc90827ecf98ec7ca7286facdf1d9baf))

# 1.0.0 (2019-06-27)

### Features

-   **release:** Add semantic release to the mix ([1f6caa6](https://github.com/5app/js-template/commit/1f6caa6))
