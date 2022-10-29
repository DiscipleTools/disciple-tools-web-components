# DT Web Components in Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Run in Browser

```
npm link ../../../[name-of-project-directory]
npm install
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## How Components Are Included

1. Add `wc-react` package to your project (`npm install wc-react`)
This is needed in order to wrap the basic web components for how React interacts with components. See [WC React](https://github.com/nmetulev/wc-react) for details.

2. Add `dt-web-components` package to your project (`npm install [tbd]`)

3. Include above packages in the React component where you want to use them:

    ```
    import 'dt-web-components';
    import { wrapWc } from 'wc-react';
    ```

4. For each DT component you want to use, wrap it with the `wrapWc` function:
    ```
    const DtText = wrapWc('dt-text');
    const DtTile = wrapWc('dt-tile');
    ```
    
5. Use the wrapped components as you would any normal React component:
    ```
    function App() {
      [...]
      return (
        <div>
          <DtTile title="My Tile" expands>
            <DtText name="myText" label="My Text Field" />
          </DtTile>
        </div>
      );
    }
    ```
