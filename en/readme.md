# Dialog plugin based on vue3

>  proste： Polish, it means simple, really can not find any fun words, originally wanted to use tiga (an Ultraman), but feel too naive...

# init plugin

| Param |  Type     | Description       |
| :---- | :----:    | :---------------  |
| theme?  | String   | button background color |
| color?   | String    | button text color    |


``` vue

<template>
  <HelloWorld />
</template>

<script lang="ts">
import HelloWorld from './components/HelloWorld.vue';

import {provideDialog} from 'proste-dialog';

export default ({
  name: 'App',
  components: {
    HelloWorld,
  },
  setup() {
    // Provide dialog-hook
    provideDialog({color: 'white', theme: 'red'});
  },
});
</script>

```

### use plugin

| Param |  Type     | Description       |
| :---- | :----:    | :---------------  |
| type   | Number    | 0：success，1：warning，2：error    |
| duration?  | Number   |             |
| title? | String |  |
| content? | String |  |
| confirmText? | String |  |
| showCancel? | Boolean |  |
| cancelText? | String |  |
| callback? | (res: Boolean) => void | Click the button to trigger the callback method |

``` vue

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>

import {useDialog} from '../plugin/proste-dialog/dist';

export default {
  name: 'HelloWorld',
  setup() {
    // inject to use hook
    const dialog = useDialog();
    dialog({
      type: 1,
      content: '询问内容',
      confirmText: '确定',
      showCancel: true,
      cancelText: '关闭',
      callback: res => console.log(res),
    });
  },
};
</script>


```

![avatar](../preview/dialog.png)