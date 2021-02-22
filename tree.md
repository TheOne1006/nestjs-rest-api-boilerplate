nestjs-rest-api-boilerplate
├─.prettierrc
├─.sequelizerc
├─README.md
├─README_zh.md
├─tree.md
├─yarn.lock
├─test
├─src
|  ├─app.controller.ts
|  ├─main.ts
|  ├─users
|  |   └users.controller.ts
|  ├─system-configs
|  |       ├─system-configs.controller.ts
|  |       ├─dto
|  |       |  └index.ts
|  |       ├─__tests__
|  ├─i18n
|  |  ├─zh-cn
|  ├─core
|  |  ├─logger
|  |  |   └index.ts
|  |  ├─interceptors
|  |  |      ├─index.ts
|  |  |      ├─__tests__
|  |  ├─i18n
|  |  |  └index.ts
|  |  ├─filters
|  |  |    ├─index.ts
|  |  |    ├─__tests__
|  |  ├─database
|  |  |    └index.ts
├─databases
|     ├─migrations
|     ├─db
├─config
|   ├─config.default.ts
|   ├─config.development.ts
|   ├─config.production.ts
|   ├─config.unittest.ts
|   └index.ts