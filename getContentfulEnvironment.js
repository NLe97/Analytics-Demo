const contentfulManagement = require('contentful-management');

const {
  CONTENTFUL_MANAGEMENT_TOKEN,
  NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
} = process.env;

module.exports = function () {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: CONTENTFUL_MANAGEMENT_TOKEN,
  });

  return contentfulClient
    .getSpace(NEXT_PUBLIC_CONTENTFUL_SPACE_ID)
    .then((space) => space.getEnvironment(NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT));
};
