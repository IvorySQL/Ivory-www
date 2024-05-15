- [前言](#前言)
- [结构调整](#结构调整)


# 前言
本次UI更新说明

# 结构调整
将`pages`下的一些组件移到`components`文件夹中.

之前结构:
```sh

```

新的结构:
```
./src
├── components
│   ├── HomepageFeatures
│   │   ├── index.js
│   │   └── index.module.css
│   ├── HomepageHeader
│   │   ├── index.js
│   │   └── index.module.css
│   ├── Slider
│   │   ├── index.js
│   │   └── silder.css
│   ├── SliderBug
│   │   ├── index.js
│   │   └── slider-bug.css
│   ├── SliderBugPhone
│   │   ├── index.js
│   │   └── slider-bug-phone.css
│   └── SliderPhone
│       ├── index.js
│       └── slider-phone.css
├── css
│   └── custom.css
└── pages
    ├── index.js
    ├── ...
    └── webinars-page.mdx
```
