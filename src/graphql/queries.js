/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      description
      imageKey
      pcgsURL
      format
      bullionType
      mintMark
      quantity
      purchasePrice
      weight
      percentage
      year
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $id: ID
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listProducts(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        description
        imageKey
        pcgsURL
        format
        bullionType
        mintMark
        quantity
        purchasePrice
        weight
        percentage
        year
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
