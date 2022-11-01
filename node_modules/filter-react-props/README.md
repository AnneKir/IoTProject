<h1 align="center">
  ⚛️✔️ filter-react-props
  <br>
  <br>
</h1>

Filter allowed React & DOM props to avoid warnings and unnecessary attributes in HTML output.

It's only 1.3 kB *(gziped UMD version, it's even less when you uglify ES Modules verision)*.

## Installation

yarn
```
yarn add filter-react-props
```

npm
```
npm install --save filter-react-props
```

cdn
```
https://unpkg.com/filter-react-props
```

## Usage

```jsx
import filterReactProps from 'filter-react-props'

or

const filterReactProps = require('filter-react-props')

or

<script src="https://unpkg.com/filter-react-props"></script>
const { default: filterProps } = filterReactProps
```

## Use case

Consider this style component:

```jsx
const Button = props => (
  <button
    style={{ color: props.color }}
    {...props}
  />
)

<Button color="green">My Button</Button>
```

Button will render with unnecessary `color` attribute.

```html
<button color="green" style="color: green;">My Button</button>
```

It can be avoided by destructuring props object:
```jsx
const Button = ({ color, ...props }) => (
  <button
    style={{ color }}
    {...props} // Props without color
  />
)
```

But you can't apply this solution when you don't know what props will be passed. This is use case for this package:

```jsx
import filterReactProps from 'filter-react-props'

const Button = props => (
  <button
    style={getStylesFromProps(props)}
    {...filterReactProps(props)}
  />
)

<Button fontSize={24} color="green">My Button</Button>
```

## Full API

```js
import
// Get new object with allowd React & DOM props.
filterReactProps,
{
  // Array of allowed React & DOM props.
  // List borrowed from `react-emotion` package.
  allowedProps,

  // Regular expression for checkig if given string
  // is allowed React or DOM prop.
  // Necessary for checking data-* and aria-* attributes.
  allowedPropsRegExp,

  // Check if given prop is allowed React or DOM prop.
  isPropAllowed
} from 'filter-react-props'
```

## Package versions

Package comes in three versions:
- UMD - transpiled, bundled, minified (`main` field in `package.json`) - for use in browser or CommonJS.
- ES Modules - transpiled ES Modules (`module` field in `package.json`) - for tree shaking.
- ES Next - untranspiled ES Modules (`exnext` field in `package.json`) - [read why](http://2ality.com/2017/06/pkg-esnext.html).

## Used in

[📐 spaced-components](https://github.com/asistapl/spaced-components)
