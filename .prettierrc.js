module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react'],
  singleQuote: true, // 使用单引号
  printWidth: 80, // 超过最大值换行
  htmlWhitespaceSensitivity: 'ignore',
  tabWidth: 2, // 缩进字节数
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  useTabs: false, // 缩进不使用tab，使用空格
  semi: true, // 结尾不用分号
  arrowParens: 'avoid', //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  disableLanguages: ['vue'], // 不格式化vue文件，vue文件的格式化单独设置
  trailingComma: 'all' // 函数最后不需要逗号
};
