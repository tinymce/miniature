# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Removed
- Removed support for TinyMCE 4.x. #TINY-10142

### Changed
- Made the VersionLoader.setup functions logs argument optional. #TINY-10394

## 5.0.1 - 2022-06-29

### Changed
- Bumped internal dependencies to pull in latest changes.

## 5.0.0 - 2022-03-03

### Removed
- Removed support for Microsoft Internet Explorer and anything that doesn't support ES2018.

## 4.0.0 - 2021-08-26

### Changed
- Upgraded to Katamari 8.0, which includes breaking changes to the `Optional` API used in this module.
- Upgraded to McAgar 7.0, which includes breaking changes to how tinymce is imported.

## 3.2.0 - 2021-05-28

### Added
- Added new `VersionHooks` module to support BDD style tests #TINY-7404
