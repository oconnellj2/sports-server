# Sports Server

> A sever solution to the BarstoolSports [fullstack-challenge](https://github.com/BarstoolSports/fullstack-challenge).

## Building and Deploying Locally

Building and running in your local dev environment is very easy. Be sure you have [Git](https://git-scm.com/downloads), [Node.js](https://nodejs.org/), and [npm](http://npmjs.com/) installed, then follow the directions below.

**1. Clone the source code via SSH:**

```
git clone git@github.com:BarstoolSports/fullstack-challenge.git
```

**2. (Optional) Install the correct node version using [nvm](https://github.com/nvm-sh/nvm):**

```
nvm install
```

**3. Install development dependencies (Note: Check the `package.json` engine for our tested and supported node versions):**

```
npm install
```

**4. Run a local development server:**

```
npm start
```

**5. The server is now running at:**

```
http://localhost:4000
```

## API Documentation

### GET `/box-score/:sport/:gameId`

> Retrieves detailed box score information.

#### Request Parameters

- `sport` _required_ - The sport abbreviation.
- `gameId` _required_ - The unique identifier of the game.

#### Response Body

<details>
<summary>Click to expand</summary>
<pre>
{
  "league": String, // MLB | NBA ...
  "away_team": {
    // Details about the away team
  },
  "home_team": {
    // Details about the home team
  },
  "away_period_scores": [ ],
  "home_period_scores": [ ],
  "away_stats": [ ],
  "home_stats": [ ],
  "officials": [ ],
  "event_information": {
    // General information about the game
  },
  "away_totals": {
    // Total statistics for the away team
  },
  "home_totals": {
    // Total statistics for the home team
  }
}
```
</pre>
</details>

#### Example Usage

```
curl http://localhost:4000/box-score/mlb/eed38457-db28-4658-ae4f-4d4d38e9e212
```

```
curl http://localhost:4000/box-score/nba/6c974274-4bfc-4af8-a9c4-8b926637ba74
```

## Contributing

[James O'Connell](https://github.com/oconnellj2) - [jdoconnell@pm.me](mailto:jdoconnell@pm.me)
