/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRank = `mutation CreateRank(
  $input: CreateRankInput!
  $condition: ModelRankConditionInput
) {
  createRank(input: $input, condition: $condition) {
    id
    name
    score
  }
}
`;
export const updateRank = `mutation UpdateRank(
  $input: UpdateRankInput!
  $condition: ModelRankConditionInput
) {
  updateRank(input: $input, condition: $condition) {
    id
    name
    score
  }
}
`;
export const deleteRank = `mutation DeleteRank(
  $input: DeleteRankInput!
  $condition: ModelRankConditionInput
) {
  deleteRank(input: $input, condition: $condition) {
    id
    name
    score
  }
}
`;
