# Remix Project

Welcome to my Remix project! This project is designed to provide a modern web development experience, utilizing Remix to manage various aspects of the application from development to deployment.

## Project Description

This project aims to create a scalable and efficient web application using the Remix framework. By leveraging Remix, we ensure that my application is optimized for both server-side and client-side rendering, providing a seamless user experience. The project is structured to facilitate easy development, testing, and deployment, making it suitable for both small and large-scale applications.

## Documentation

- 📖 [Remix Documentation](https://remix.run/docs)
- 📦 [Tippy.js Documentation](https://atomiks.github.io/tippyjs/) - Used for creating tooltips.
- 📦 [React Masonry CSS](https://github.com/paulcollett/react-masonry-css) - Used for creating responsive masonry layouts.
- 📦 [Intersection Observer](https://github.com/w3c/IntersectionObserver) - Used for observing changes in the intersection of a target element.

## Installation

To set up the project from a ZIP file, follow these steps:

1. **Extract the ZIP File**:

   - Download the ZIP file containing the project.
   - Extract the contents to your desired directory.

2. **Install Dependencies**:
   - Open a terminal and navigate to the project directory.
   - Run the following command to install all necessary dependencies:
     ```shell
     npm install
     ```

## Development

To run the development server, use the following command:

```shell
npm run dev
```

This will start the server on `http://localhost:3000` by default.

## Deployment

To deploy your application, first build it for production:

```shell
npm run build
```

Then, run the application in production mode:

```shell
npm start
```

Now you'll need to choose a host to deploy your application.

### DIY Deployment

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`:

- `build/server`
- `build/client`

## Styling

This project uses [Vanilla Extract CSS](https://vanilla-extract.style/) for styling, providing a type-safe, zero-runtime CSS-in-TypeScript approach. This allows for a highly customizable and maintainable styling solution. You can explore the [Vanilla Extract documentation](https://vanilla-extract.style/documentation) for more information on how to utilize it effectively in your project.

## Contributing

We welcome contributions from the community. If you would like to participate, please read my contribution guidelines and submit a pull request.

## Contact

If you have any questions, feel free to contact DuyNH via email: [hoangduytn1703@gmail.com](mailto:hoangduytn1703@gmail.com).
