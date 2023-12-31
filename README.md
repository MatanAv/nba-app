# NBA App

## Project Overview

This project is a React JS application built with TypeScript that pulls data of NBA players and allows you to set favorites that are added to a list. The application consists of two lists displayed side by side: the left side list shows the current NBA players fetched from the API, and the right side list displays the favorites players. the application includes a player profile component that provides detailed information about each NBA player. You can also search for players by name, mark them as favorites, and remove them from the favorites list. Additionally, you can change the background color of the favorites list.

## Key Features and Implementation

- **React JS**: The application is built using React JS with TypeScript, providing a scalable and state-managed architecture. State management is achieved using the useContext hook.

- **API Integration**: The application fetches data from the [balldontlie.io](https://www.balldontlie.io/api/v1/players) API to retrieve the list of current NBA players.

- **Search Functionality**: Users can perform a simple search on player names to filter the list of players.

- **Favorite Players**: Users can mark players as favorites by clicking a button/checkmark, and the selected players are added to the favorites list.

- **Remove from Favorites**: Users can remove players from the favorites list by clicking a button/checkmark.

- **Background Color Customization**: Users have the ability to change the background color of the favorites list.

- **Error Handling**: The application implements error handling by utilizing a custom service and the 'http-status-codes' library. When an error occurs during API requests, the service handles the error response. As a result, an Error component displays to provide feedback to the user.

- **Storage Service**: The application utilizes a Storage service that leverages the localStorage API to persist the user's favorite players. This ensures that the user's selections are saved even after refreshing or closing the page, providing a seamless and personalized experience.

- **Player Profile Component**: The application includes a player profile component that provides detailed information about each NBA player. This bonus feature enhances the user experience by providing additional insights into the players.
