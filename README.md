# Food Panda Website

### Public Website

http://foodpanda.us-west-1.elasticbeanstalk.com/

### Public API

http://foodpanda.us-west-1.elasticbeanstalk.com/api/foods

### API Query Example

http://foodpanda.us-west-1.elasticbeanstalk.com/api/foods?269=0&269=100&204=0&204=100&203=9&203=100&205=0&205=100

Multiple values are interpretted as range.

### Disclaimer

The provided information need not be accurate. This website is for demo purpose only.


## Project Scope Considerations:

### FontEnd
    1. Clean, pleasing and resonsive React UI based on Ant Design.
    2. UI background texture and random food icons for high touch feel.
    3. Slider for intuitive interface.
    4. PieChart for user feedback.
    5. Paginated list to display results.

### Backend
    1. Minimal Flask App to provide routing and API.
    2. Database in 2NF.
    3. REST API conforms to HATEOAS.

### Hosting
    1. Hosted using AWS Elastic Bean stalk.
    2. Topolgy is somewhat similar to this [topology](https://www.google.com/search?q=elastic+bean+webserver&sxsrf=ALeKk03IeedpR8CSJUZskndj7Te_pddAKg:1598063133577&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiy456L4a3rAhWrGTQIHRoGAxEQ_AUoAnoECA4QBA&biw=2327&bih=1236#imgrc=5p18qBHsLu6kNM).




# Developer 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
