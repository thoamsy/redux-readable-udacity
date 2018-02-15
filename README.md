这个项目是 React 纳米学位的第二个项目

使用下面代码能就能运行了
```bash
yarn && yarn start
```

该项目主要用到了 [bulma](https://bulma.io/) 作为 css 库, 一些自定义样式使用 `scss` 编写.
Redux 的风格主要参考 redux 文档的内容。其中用到了一些第三方库，
像 `Ramda，react-modal, codemirror, markdown-it`等以提升开发体验。

代码存在一个可能需要运行两次 reducer 的问题，这不算 bug，这是为了前期开发的方便。
在后期会进行优化，以提高性能。
