# DT Web Components in Vue App

Created from the [Vue Quick Start Guide](https://vuejs.org/guide/quick-start.html#creating-a-vue-application)

## Run in Browser

```sh
npm install
npm link ../../../[name-of-project-directory]
npm run dev
```

Runs the app in the development mode.

## How Components Are Included

1. Add `@disciple.tools/web-components` package to your project (`npm install @disciple.tools/web-components`)

2. Include the web components package in the Vue component where you want to use them:

    ```
    import '@disciple.tools/web-components';
    ```
    
3. Follow [Vue Instructions](https://vuejs.org/guide/extras/web-components.html#using-custom-elements-in-vue) to configure custom component resolution. There is a code snippet that needs to be added to `vite.config.js` or `vue.config.js`.

4. Use the components as you would any normal Vue component:
    ```html
    <template> 
      <dt-tile title="My Tile" :expands="true">
        <dt-text name="myText" label="My Text Field" />
      </dt-tile>
    </template>
    ```
