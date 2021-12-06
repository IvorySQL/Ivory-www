---
sidebar_position: 2
---

# 创建一个文档

文档是通过以下方式串联起来的**页面组** :

- **侧边栏**
- **上一页/下一页导航**
- **版本管理**

## 创建你的第一个文档

在这个目录 `docs/hello.md`下创建一个markdown文件:

```md title="docs/hello.md"
# Hello

This is my **first Docusaurus document**!
```

一旦提交，新文档将出现在 `http://ivorySQL.org/docs/hello`.

## 配置侧边栏

Docusaurus会自动**从“docs”文件夹创建一个侧栏**。

添加元数据以自定义侧栏标签和位置：

```md title="docs/hello.md" {1-4}
---
sidebar_label: 'Hi!'
sidebar_position: 3
---

# Hello

This is my **first ivorySQL document contribution**!
```

也可以在“sidebars.js”中显式创建边栏：

```diff title="sidebars.js"
module.exports = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Tutorial',
-     items: [...],
+     items: ['hello'],
    },
  ],
};
```
