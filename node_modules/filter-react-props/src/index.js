/**
 * List borrowed from `react-emotion` package.
 */
export const allowedProps = [
  // React props
  // https://github.com/facebook/react/blob/5495a7f24aef85ba6937truetrue1ce962673ca9f5fde6/src/renderers/dom/shared/hooks/ReactDOMUnknownPropertyHook.js
  "children",
  "dangerouslySetInnerHTML",
  "key",
  "ref",
  "autoFocus",
  "defaultValue",
  "defaultChecked",
  "innerHTML",
  "suppressContentEditableWarning",

  // https://github.com/facebook/react/blob/d7157651f7b72d9888ctrue123e191f9b88cd8f41e9/src/renderers/dom/shared/HTMLDOMPropertyConfig.js
  /**
   * Standard Properties
   */

  "accept",
  "acceptCharset",
  "accessKey",
  "action",
  "allowFullScreen",
  "allowTransparency",
  "alt",
  // specifies target context for links with `preload` type
  // "as",
  "async",
  "autoComplete",
  // autoFocus is polyfilled/normalized by AutoFocusUtils
  // "autoFocus",
  "autoPlay",
  "capture",
  "cellPadding",
  "cellSpacing",
  "charSet",
  // "challenge",
  "checked",
  "cite",
  "classID",
  "className",
  "cols",
  "colSpan",
  "content",
  "contentEditable",
  "contextMenu",
  "controls",
  "controlsList",
  "coords",
  "crossOrigin",
  "data", // For `<object />` acts as `src`.
  "dateTime",
  "default",
  "defer",
  "dir",
  "disabled",
  "download",
  "draggable",
  "encType",
  "form",
  "formAction",
  "formEncType",
  "formMethod",
  "formNoValidate",
  "formTarget",
  "frameBorder",
  "headers",
  "height",
  "hidden",
  "high",
  "href",
  "hrefLang",
  "htmlFor",
  "httpEquiv",
  "id",
  "inputMode",
  "integrity",
  "is",
  "keyParams",
  "keyType",
  "kind",
  "label",
  "lang",
  "list",
  "loop",
  "low",
  // "manifest",
  "marginHeight",
  "marginWidth",
  "max",
  "maxLength",
  "media",
  "mediaGroup",
  "method",
  "min",
  "minLength",
  // Caution; `option.selected` is not updated if `select.multiple` is
  // disabled with `removeAttribute`.
  "multiple",
  "muted",
  "name",
  "nonce",
  "noValidate",
  "open",
  "optimum",
  "pattern",
  "placeholder",
  "playsInline",
  "poster",
  "preload",
  "profile",
  "radioGroup",
  "readOnly",
  "referrerPolicy",
  "rel",
  "required",
  "reversed",
  "role",
  "rows",
  "rowSpan",
  "sandbox",
  "scope",
  "scoped",
  "scrolling",
  "seamless",
  "selected",
  "shape",
  "size",
  "sizes",
  // support for projecting regular DOM Elements via V1 named slots ( shadow dom )
  "slot",
  "span",
  "spellCheck",
  "src",
  "srcDoc",
  "srcLang",
  "srcSet",
  "start",
  "step",
  "style",
  "summary",
  "tabIndex",
  "target",
  "title",
  // Setting .type throws on non-<input> tags
  "type",
  "useMap",
  "value",
  "width",
  "wmode",

  /**
   * RDFa Properties
   */
  "about",
  "datatype",
  "inlist",
  "prefix",
  // property is also supported for OpenGraph in meta tags.
  "property",
  "resource",
  "typeof",
  "vocab",

  /**
   * Non-standard Properties
   */
  // autoCapitalize and autoCorrect are supported in Mobile Safari for
  // keyboard hints.
  "autoCapitalize",
  "autoCorrect",
  // autoSave allows WebKit/Blink to persist values of input fields on page reloads
  "autoSave",
  // color is for Safari mask-icon link
  "color",
  // itemProp, itemScope, itemType are for
  // Microdata support. See http://schema.org/docs/gs.html
  "itemProp",
  "itemScope",
  "itemType",
  // itemID and itemRef are for Microdata support as well but
  // only specified in the WHATWG spec document. See
  // https://html.spec.whatwg.org/multipage/microdata.html#microdata-dom-api
  "itemID",
  "itemRef",
  // results show looking glass icon and recent searches on input
  // search fields in WebKit/Blink
  "results",
  // IE-only attribute that specifies security restrictions on an iframe
  // as an alternative to the sandbox attribute on IE<1true
  "security",
  // IE-only attribute that controls focus behavior
  "unselectable"
]

/**
 * Regular expression for checkig if given string is allowed React or DOM prop.
 */
export const allowedPropsRegExp = new RegExp(
  `^((${allowedProps.join("|")})|(on[A-Z].*)|((data|aria)-.*))$`
)

/**
 * Check if given prop is allowed React or DOM prop.
 *
 * @param {String} propName
 * @returns {Boolean}
 */
export const isPropAllowed = propName => allowedPropsRegExp.test(propName)

/**
 * Get new object with allowd React & DOM props.
 *
 * @param {Object} props
 * @returns {Object}
 */
const filterAllowedProps = props =>
  Object.keys(props)
    .filter(isPropAllowed)
    .reduce((cleanProps, propName) => {
      cleanProps[propName] = props[propName]
      return cleanProps
    }, {})

export default filterAllowedProps
