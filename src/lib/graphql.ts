import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://directus.devmed.cz/graphql",
  cache: new InMemoryCache(),
});

{
  /* Should be:  public_from: { _null: false },
      public_till: { _null: false, _lte: $today }, */
}

export const GET_BLOGS_LIST = gql`
  query GetBlogs($limit: Int, $offset: Int, $sort: [String!]) {
    contents(
      limit: $limit
      offset: $offset
      sort: $sort
      filter: {
        public_from: { _null: true }
        public_till: { _null: true }
        web: { shortcut: { _eq: "PL" } }
        translations: { language: { name: { _eq: "Čeština" } } }
      }
    ) {
      issue
      date_updated
      public_from
      public_till
      labels {
        label {
          name
        }
      }
      id
      section {
        name
      }
      specializations {
        specialization {
          name
        }
      }
      theme {
        name
      }
      type {
        name
      }
      language {
        name
      }
      web {
        shortcut
        name
      }
      translations {
        language {
          name
        }
        content
        name
        image {
          height
          width
          filename_download
          filename_disk
          folder
        }
        perex
      }
    }
  }
`;

export const GET_SECTIONS_LIST = gql`
  query GetSections($limit: Int!) {
    sections(limit: $limit) {
      id
      name
    }
  }
`;
export const GET_BLOGS_BY_ID = gql`
  query GetBlogsById($id: ID!) {
    contents_by_id(id: $id) {
      issue
      date_updated
      labels {
        label {
          name
        }
      }
      id
      section {
        name
      }
      specializations {
        specialization {
          name
        }
      }
      type {
        name
      }
      language {
        name
      }
      web {
        name
      }
      translations {
        content
        name
        image {
          height
          width
          filename_download
          filename_disk
          folder
        }
      }
    }
  }
`;

export { client };
