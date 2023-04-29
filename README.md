# HeartBeat

HeartBeat is a website monitoring tool that allows you to monitor your website's uptime and performance. With HeartBeat, you can ensure that your website is always up and running, and that your visitors can access it without any problems.

<img width="1024" alt="image" src="https://user-images.githubusercontent.com/86217607/235305967-4e27c200-367b-497e-84f1-31e7ba166439.png">


## Features

- Monitor your website's uptime and performance
- Set up alerts for when your website goes down
- View detailed performance reports and analytics
- Easy to use and set up

## Getting Started

To get started with HeartBeat, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies by running `npm install`.
3. Start the server by running `npm start`.
4. Navigate to `http://localhost:3000` in your browser.

To Run on docker:

1. docker build -t heartbeat .
2. docker run -d --name heartbeat -p 3004:3004 heartbeat

## Usage

To use HeartBeat, simply enter your website's URL and set up the monitoring interval. HeartBeat will then ping your website at regular intervals and alert you if your website goes down.

You can also view detailed performance reports and analytics to help you optimize your website's performance.

## Contributing

If you would like to contribute to HeartBeat, feel free to submit a pull request or open an issue. We welcome all contributions and suggestions!
