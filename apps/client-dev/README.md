# Development static site

It is developed in the form of a multipage application.

# Usage

## git clone 

The project simply clones the starter-kit and uses it.
After that, delete the git information.

```
git clone https://github.com/elf-framework/starter-kit
cd starter-kit
rm -rf .git # remove git repository
npm install
npm run client:dev
```

## create project by template 

Create a project repo in the form of a template.
This way you don't have to clear git information

```
gh repo create <project-name> --template elf-framework/starter-kit
```


# Structure

## pages

The pages directory is the entry point of the application.

```
pages
├── index.tsx
├── index.mdx
├── index.html
├── about
│   ├── index.tsx
│   ├── index.mdx
│   └── index.html
└── contact
    ├── index.tsx
    ├── index.mdx
    └── index.html
```

## layouts

The layouts directory is the layout of the application.

Establish the basic structure that makes up the site.

```

layouts
├── items
│   ├── ApplicationReadLayout.tsx
│   ├── ApplicationWriteLayout.tsx
│   ├── BlogLayout.tsx
│   ├── BlankLayout.tsx
│   ├── EmbededLayout.tsx
│   ├── SimpleLayout.tsx
│   └── SimpleReadLayout.tsx
└── LayoutManager.tsx
```

## components

The components directory is the component of the application.

```
component
├── hooks
│   ├── useScrollStatus.tsx
│   ├── useTheme.tsx
├── layout
│   ├── application
│   ├── blank
│   ├── blog
│   ├── document
│   ├── embeded
│   ├── home
│   ├── page
│   ├── simple
├── site
│   ├── Header.tsx
│   ├── Body.tsx
├── utils


```

## data 

The data directory is the data of the application.

It collects meta data that can be used throughout the site.

```
data
├── current-blog-list.js

```

## public 

The public directory is the public directory of the application.

It is used to store static files that are not processed by vite.

```
public
├── favicon.ico
├── images
│   ├── logo.png
│   └── logo.svg
└── robots.txt
```

## constants

The constants directory is the constants directory of the application.

It is used to store constants that can be used throughout the site.

```
constants
├── menu
│   ├── main-menu.js
├── github.js
└── layouts.js
```





# How to make router(xxx.html) 

Create and use xxx.html based on pages directory.

```

/directory/index.html 
```


## xxxx.html file 

```
/directory/index.html 
```

If there is index.html in a specific directory, it is used directly as an entry.


### xxxx.tsx file 

```
/directory/index.tsx 
```

If there are only tsx files in a specific directory, create an html file with the same name and use it as an entry.

### xxxx.mdx file 

```
/directory/index.mdx
```

If there is only mdx file in a specific directory, create html and tsx files with the same name and use them as entry.


# How to make auto generate pages

Automatically updates additional files when creating xxx.page.tsx and xxx.mdx files based on the pages directory.

## create xxx.mdx file 

mdx file is a format that allows you to use markdown and tsx syntax together.

At the moment of creation, a total of three additional information files are created.

```sh
# user create or update 
/directory/index.mdx

# auto generate
/directory/index.tsx
/directory/index.html
/directory/index.meta.json
```

## create xxx.page.tsx file

page.tsx file is a format that allows you to use tsx syntax.

It is useful when creating a view page with tsx syntax.

At the moment of creation, a total of two additional information files are created.

```sh
# user create or update
/directory/index.page.tsx

# auto generate
/directory/index.tsx
/directory/index.html
/directory/index.meta.json
```

All xxx.html files created in this way are used as routers.

## file name for title 

The name specified when creating the file is set as the default title .

```sh
/directory/create-a-template-by-starterkit.mdx
```

This automatically generates the following information.

```mdx
---
title: Create a template by starterkit
layout: BlankLayout
---
```

```json
// /directory/create-a-template-by-starterkit.meta.json
{
  "title": "Create a template by starterkit"
}
```

## Automatic layout selection 

The layout specified when creating the file is set as the default layout.

The predefined layout based on the path is in the file below.

```js, /constants/layouts.js
/**
 * Predefined layouts for pages
 */
export const layouts = {
  "pages/article": "ArticleReadLayout",
  "pages/dashboard": "DashboardReadLayout",
  "pages/markdown": "MarkdownReadLayout",
  "pages/blog": "BlogReadLayout",
  "pages/main": "HomeLayout",
  "pages/document": "DocumentReadLayout",
  "pages/page": "PageReadLayout",
  "pages/simple": "SimpleReadLayout",
  "pages/embeded": "EmbededReadLayout",
  "pages/application": "ApplicationReadLayout",
};
```

Use the Layout managed by the LayoutManager specified here.

LayoutManagers are managed in /layouts/LayoutManager.js file.
If you specify a layout in /layouts/items/ in the form below, it is automatically loaded in LayoutManager.

```sh
/layouts/items/ArticleReadLayout.tsx
```

# Contribute

## How to contribute

If you want to contribute to this project, please follow the steps below.

1. Fork this repository
2. modify the code
3. push PR


# License: MIT
