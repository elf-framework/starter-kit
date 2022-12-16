# elf framework starter kit 

This is a starter kit that allows you to easily start elf framework.


# What's inside?

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

# Apps and Packages

- `ssr-dev`: server-side development pages
- `client-dev`: client-side development pages
- `config`: config for monorepo (`eslint`, `tsconfig` , etc ...)

# Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

# Setup

```
git clone https://github.com/elf-framework/starter-kit
cd starter-kit
npm install

```

# Usage

## to start the development server

```
npm run client:dev
```

## multi client page application (MPA)

pages/**/xxxx.html 을 기준으로 jsx 를 로드 하는 방식으로 구현이 되어 있음. 
부가적으로 mdx 를 만들어서 페이지를 만들어 낼수도 있음. 

## auto generate pages - for mdx 

pages/ 하위에 xxx.mdx 를 만들면 자동으로 템플릿화 된 몇가지 페이지를 만들어 줌.

```
cd starter-kit
cd pages
cd blog
touch test.mdx
```

test.mdx 를 생성하는 순간 아래와 같은 페이지가 생성됨.

* /pages/blog/test.html -> 브라우저 시작 점 , test.jsx 를 로드 함.
* /pages/blog/test.jsx -> 어플리케이션 시작점이 되는 jsx 파일, mdx 를 로드해서 실행해줌
* /pages/blog/test.mdx -> content 가 될 mdx 파일, frontmatter 로 meta 정보를 제공함. frontmatter 에 수정된 정보는 meta.json 으로 저장 
* /pages/blog/test.meta.json -> mdx 에서 지정한 frontmatter 정보가 저장됨. 향후 다른 데이타 형태로 사용할 수 있음.

## auto generate pages - for jsx


pages/ 하위에 xxx.mdx 를 만들면 자동으로 템플릿화 된 몇가지 페이지를 만들어 줌.

```
cd starter-kit
cd pages
cd blog
touch test.jsx
```

test.jsx 를 생성하는 순간 아래와 같은 페이지가 생성됨.

* /pages/blog/test.html -> 브라우저 시작 점 , test.jsx 를 로드 함.
* /pages/blog/test.jsx -> 어플리케이션 시작점이 되는 jsx 파일
* /pages/blog/test.meta.json -> jsx 에서 지정하지 못한 메타 정보를 수동으로 기록 할 수 있음.

## 그 외 페이지 생성 방법

build/template 에 있는 index.html, page.jsx 를 참고해서 구조를 맞춤.



# Develop


## client-side development

To start the development server, run:

```
cd starter-kit
npm run client:dev
```

To build the project, run:

```
cd starter-kit
npm run client:build
```

This results in a production build of your application in the `docs` folder of root.


## server-side development

comming soon

```
cd starter-kit
npm run ssr:dev
```


### Update npm packages 

```sh
npm run npm-check
npm install
```

# LICENSE: MIT