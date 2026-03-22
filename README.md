# Analytics Dev Data

The `analytics-dev-data-website` app is a next.js application hosted on vercel.
It is linked to Contentful organization `0589c7TzIUSc9aTZqLJ7b5` [Analytics QA Organization](https://app.contentful.com/spaces/wmpgxw7csg5l/environments/master/apps/app_installations/contentful-personalization/overview) and generates realistic usage data for A7s and P13n through fake traffic from `analytics-dev-data-traffic`.
For access, reach out to Philipp or Sean.

The website is currently deployed at https://analytics-dev-data-website.vercel.app/ and uses Ninetailed `organizationId` (also called API key) `fb2f8d4c-bfc5-4aed-a92d-94511abe4c06`.

## How to develop it

Run `pnpm run develop` to start a local development server.
Run `pnpm run contentful-typescript-codegen` to generate typescript types from the Contentful ContentTypes `@types/generated/contentful.d.ts`.

## How to deploy it

You can deploy manually by running

1. `doppler setup`.
1. Run `vercel pull --environment=production --scope=ninetailed`. In the menu, select the `Ninetailed` scope, then the `analytics-dev-data-website` vercel project. Then, proceed pulling.
1. Run `vercel build --prod`
1. Run `vercel deploy --prebuilt --prod`
