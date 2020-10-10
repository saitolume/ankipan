<h1 align="center">🍞 ankipan</h1>
<p align="center">A command line tool to save the full resources of any web page.</p>
<p align="center">
  <a href="https://github.com/saitoeku3/ankipan/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-green.svg" />
  </a>
  <a href="https://www.npmjs.com/package/ankipan">
    <img src="https://badge.fury.io/js/ankipan.svg" />
  </a>
</p>

## Requirements

- Node.js 10.x (LTS)

## Installation

```bash
$ npm i -g ankipan
```

## Usage

```bash
$ ankipan https://github.com
github.com/index.html
github.com/images/search-key-slash.svg
github.com/images/modules/site/home/globe-700.jpg
...
github.com/customer_stories/yyx990803/hero.jpg
github.com/customer_stories/kris-nova/hero.jpg
github.com/customer_stories/jessfraz/hero.jpg
✨ Done!

$ npx serve github.com # serve a saved web site
```
