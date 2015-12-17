### Small example of dom manipulation
The goal is using the js to realize a function that one plus button can be used to add new list item
#### review of the dom:
1. document.getElementById, document.getElementsByTagName, document.getElementsByClassName, document.getElementsByName
2. Notice the document.getElmentsByClassName has the compatibility issue. Not working under 9.
3. get the screen height and width:
    document.body.clientWidth|| document.documentElement.clientWidth
    document.body.clientHeight || document.documentElement.clientHeight
4. change the innerHTML will remove all the previous binding event.
5. DOM提供的那些方法:增加、删除等都存在映射机制,就是说如果DOM结构变化了事件还是存在的,而且相应的东西还是有映射,不需要重新获取,例如length
6. 重绘：修改样式：影响元素的外观，风格，而不会影响布局的
7. 回流: 重新布局：元素的规模尺寸，布局，隐藏等改变
8. innerHTML:是先将里面的原有东西拿出来，然后在加上新的东西，最后将最终的在重新的放到页面中，浏览器需要从新的渲染一边，原有绑定的事件就会消失了。
9. DOM方法：不管前面是什么，我只需要站在最后就可以了，而且DOM有映射机制，我只要进这个队伍里面，不需要在重新的获取，就可以得到最新的了。