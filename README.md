# elf framework starter kit 

This is a starter kit that allows you to easily start elf framework.


## What's inside?

You can easily develop web pages using the elf framework.
It includes the basic elf framework as below.

* @elf-framework/base-editor
* @elf-framework/color
* @elf-framework/design-system
* @elf-framework/design-tokens
* @elf-framework/icon
* @elf-framework/sapa
* @elf-framework/sapa-router
* @elf-framework/ui
* vite-plugin-sapa

### Apps and Packages

- `ssr-dev`: server-side development pages
- `client-dev`: client-side development pages
- `config`: config for monorepo (`eslint`, `tsconfig` , etc ...)

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Setup

```
git clone https://github.com/elf-framework/starter-kit
cd starter-kit
npm install

```

### Build

To build all apps and packages, run the following command:

```
cd starter-kit
npm run build
```

### Develop


#### client-side development
```
cd starter-kit
npm run client:dev
```

#### server-side development
```
cd starter-kit
npm run server:dev
```


### Update npm packages 

```sh
cd apps/xxxx or packages/xxx
npx npm-check-updates -u
npm install
```

# LICENSE: MIT