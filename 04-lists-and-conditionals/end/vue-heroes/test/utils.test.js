const utils =  require('../src/lib/utils');

const sectionsInput1 = [
    {id: "123", order: 1},
    {id: "122", order: 2},
    {id: "128", order: 3},
    {id: "129", order: 10000},
    {id: "312", order: 20000},
    {id: "100", order: 10001}
]

const newSection = {
    id: "1",
    order: 2
}

const addNewSectionOutput = [
    {id: "123", order: 1},
    {id: "1", order: 2},
    {id: "122", order: 3},
    {id: "128", order: 4},
    {id: "129", order: 10000},
    {id: "312", order: 20000},
    {id: "100", order: 10001}
]

test('add new section', () => {
  expect(utils.sortArray(sectionsInput1, newSection, 'add')).toEqual(addNewSectionOutput);
});