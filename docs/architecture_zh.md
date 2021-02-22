# architecture 目录结构

- [目录结构](#architecture)
  - [`.vscode`](#vscode)
  - [`documentation`](#documentation)
  - [`.vuepress`](#vuepress)
  - [`src`](#src)
    - [`core`](#core)
    - [`i18n`](#i18n)
    - [`system-configs`](#system-configs)
    - [`users`](#users)
    - [`snake-naming.strategy.ts`](#snake-namingstrategyts)
  - [`config`](#config)
  - [`databases`](#databases)
  - [`test`](#test)
  - [`.eslintrc.json`](#eslintrcjson)
  - [`tsconfig.json`](#tslintjson)

## `.vscode`

Visual Studio Code 配置目录

## `documentation`

`compodoc` 生成的文档目录

## `src`

### `core`

核心文件

#### `filters`

##### `exception-filters`

不同级别的错误处理 [exception-filters](https://docs.nestjs.com/exception-filters).

#### `database`

数据库模块

#### `i18n`

国际化模块


## `app.module.ts`

root application module.

## `databases`

数据库相关, 修改 `.sequelizerc` 文件可自定义具体目录

### `migrations`

数据迁移文件目录

## `db`

sqlite 文件

## `config`

`config.*.ts` 不同环境的配置文件

## `.eslintrc.json`

Eslint 配置文件, 详见 [the eslint doc](https://eslint.org/).

## `tsconfig.json`

typescript 配置文件
