# Extend DT Web Components with Lit

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Run in Browser

```sh
npm link ../../../[name-of-project-directory]
npm install
npm start
```

Runs the demo for your component.

## How Components Are Included

1. Add `@disciple.tools/web-components` package to your project (`npm install @disciple.tools/web-components`)

2. Include the individual web components classes in the Lit component where you want to use them:

    ```
    import { DtBase, DtFormBase, DtText } from '@disciple.tools/web-components';
    ```
    
3. Use the component class as the base class for your new Lit component:
    ```js
    export class DtColor extends DtFormBase {     
      constructor() {
        super();
      }
   
      [...]
    }
    ```
    
