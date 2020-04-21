# Text Web Component [![CircleCI](https://circleci.com/gh/Rise-Vision/rise-text/tree/master.svg?style=svg)](https://circleci.com/gh/Rise-Vision/rise-text/tree/master) [![Coverage Status](https://coveralls.io/repos/github/Rise-Vision/rise-text/badge.svg?branch=master)](https://coveralls.io/github/Rise-Vision/rise-text?branch=master)

## Introduction

`rise-text` is a Polymer 3 Web Component that renders text

#### Example

```
  <rise-text id="rise-text-greeting" value="Hello World!">
  </rise-text>
```

### Labels

The component may define a 'label' attribute that defines the text that will appear for this instance in the template editor.

This attribute holds a literal value, for example:

```
  <rise-text
    id="rise-text-greeting"
    label="Greeting"
    value="Hello World!">
  </rise-text>
```

If it's not set, the label for the component defaults to "Text", which is applied via the [generate_blueprint.js](https://github.com/Rise-Vision/html-template-library/blob/master/generate_blueprint.js) file for a HTML Template build/deployment.

The component provides an additional numeric property, `fontsize`, which can be used to specify a size in pixel units. This property exists mainly to allow users customization of `rise-text` instances on Attribute Editor. If not provided in the template, the size of the text component will depend on external styling (it can still be customized on Attribute Editor).

Also, by setting `multiline` attribute to `true`, the component is capable of handling line breaks from `value` and present them in multiple lines. Line breaks can be simulated locally by adding a line break to the value attribute in the HTML:

```
<rise-text value="Hello
   World!" fontsize="100" multiline="true">
</rise-text>
```

### Attributes

This component receives the following list of attributes:

- **id**: ( string / required ): Unique HTMLElement id.
- **value**: ( string / required ): The text value that is rendered.
- **fontsize**: ( numeric / optional ): The size in pixels of the component to be rendered. If not provided, it relies on external styling.
- **minfontsize**: (numeric / optional ): The minimum value the fontsize attribute can accept. Defaults to 1.
- **maxfontsize**: (numeric / optional ): The maximum value the fontsize attribute can accept. Defaults to 200.
- **multiline**: (boolean / optional ): If set to `true`, the component will preserve `value` line breaks and show them in multiple lines. Defaults to `false`.
- **label**: ( string / optional ): An optional label key for the text that will appear in the template editor. See 'Labels' section above.
- **non-editable**: ( empty / optional ): If present, it indicates this component is not available for customization in the template editor.

### Events

The component sends the following events:

- **configured**: The component has initialized what it requires to and is ready to handle a _start_ event.
- **data-update**: Event is sent when text value changes. Here is an example of event consumption:
```
  element.addEventListener('data-update', function (event) {
    console.log(event.type); // prints 'data-update'
    console.log(event.detail.newValue); // prints new text value
    console.log(event.detail.oldValue); // prints old (previous) text value. If the changed property is fontsize, newValue will be equal to oldValue
    console.log(event.detail.fontsize); // prints fontsize
  });
```
- **data-error**: An event indicating there have been invalid attribute values provided. An error object is provided in `event.details`. This event will be sent once only. The reasons for failure are limited to:
  - `fontsize` being out of bounds
  - `minfontsize` being lower than 1
  - `maxfontsize` being lower than 1 or lower than `minfontsize`

## Built With
- [Polymer 3](https://www.polymer-project.org/)
- [Polymer CLI](https://github.com/Polymer/tools/tree/master/packages/cli)
- [WebComponents Polyfill](https://www.webcomponents.org/polyfills/)
- [npm](https://www.npmjs.org)

## Development

### Local Development Build
Clone this repo and change into this project directory.

Execute the following commands in Terminal:

```
npm install
npm install -g polymer-cli@1.9.7
npm run build
```

**Note**: If EPERM errors occur then install polymer-cli using the `--unsafe-perm` flag ( `npm install -g polymer-cli --unsafe-perm` ) and/or using sudo.

### Testing
You can run the suite of tests either by command terminal or interactive via Chrome browser.

#### Command Terminal
Execute the following command in Terminal to run tests:

```
npm run test
```

In case `polymer-cli` was installed globally, the `wct-istanbul` package will also need to be installed globally:

```
npm install -g wct-istanbul
```

#### Local Server
Run the following command in Terminal: `polymer serve`.

Now in your browser, navigate to:

```
http://127.0.0.1:8081/components/rise-text/demo/src/rise-text-dev.html
```

## Submitting Issues
If you encounter problems or find defects we really want to hear about them. If you could take the time to add them as issues to this Repository it would be most appreciated. When reporting issues, please use the following format where applicable:

**Reproduction Steps**

1. did this
2. then that
3. followed by this (screenshots / video captures always help)

**Expected Results**

What you expected to happen.

**Actual Results**

What actually happened. (screenshots / video captures always help)

## Contributing
All contributions are greatly appreciated and welcome! If you would first like to sound out your contribution ideas, please post your thoughts to our [community](https://help.risevision.com/hc/en-us/community/topics), otherwise submit a pull request and we will do our best to incorporate it. Please be sure to submit test cases with your code changes where appropriate.

## Resources
If you have any questions or problems, please don't hesitate to join our lively and responsive [community](https://help.risevision.com/hc/en-us/community/topics).

If you are looking for help with Rise Vision, please see [Help Center](https://help.risevision.com/hc/en-us).

**Facilitator**

[Stuart Lees](https://github.com/stulees "Stuart Lees")
