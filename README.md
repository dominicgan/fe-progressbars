# Frontend Test: Progressbars Solution

## Start project

`npm install`

`npm start` to start dev server

`npm build` to build production code

`npm test` to start test runner in watcher mode

See here for all available [create-react-app scripts](https://github.com/dominicgan/fe-progressbars/blob/master/create-react-app-readme.md#available-scripts)

## Stack

- `create-react-app`
  - react
  - webpack
  - sass (`create-react-app` ejected to include `sass-loader`)
  - `enzyme`/`jest` for tests

## Requirements

- Must read data from the endpoint
- Multiple bars
- One set of controls that can control each bar on the fly
- Can't go under 0
- Can go over *limit* (defined in API), but limit the bar itself and change its
	colour
- Display usage amount, centered
- Write tests for your code (hint: TDD strongly preferred)
- Implement a responsive solution: testing it on mobile, tablet, etc. Getting it
	working nicely.
- Version control (git)

## Bonus

- Setting it up as a project
- Setting up some automated tools
- Linting, code quality, etc
- Javascript/CSS minification, packaging, etc
- Using a CSS preprocessor like SASS/SCSS
- Styling it to a production quality level

## Endpoint

**Endpoint url:** [https://pb-api.herokuapp.com/bars](https://pb-api.herokuapp.com/bars)

Example structure from the endpoint:

    {
    	"buttons": [10, 38, -13, -18],
    	"bars": [62, 45, 62],
    	"limit": 230
    }

## Breakdown

|Key|Description|
|-|-|
|buttons|The amount of buttons to display and what value they increment or decrement the selected bar. Randomly generates between 4 and 6 buttons.|
|bars|The number of progress bars to display and their default values. Randomly generates between 2 and 5 progress bars.|
|limit|The equivalent to 100% of each bar. For example, the bar should be 100% filled when the progress hits 230.|

