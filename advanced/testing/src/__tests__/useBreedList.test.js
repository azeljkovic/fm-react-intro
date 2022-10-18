/**
 * @jest-environment jsdom
 */
import { expect, test } from "@jest/globals";
import { renderHook } from "@testing-library/react-hooks";
import useBreedList from "../useBreedList";

// without @testing-library/react-hooks
// function getBreedList(animal){
//   let list;
//
//   function TestComponent() {
//     list = useBreedList(animal);
//     return null;
//   }
//
//   render(<TestComponent />);
//   return list;
// }


test("gives an empty list with no animal", async () => {
  // without @testing-library/react-hooks
  // const [breedList, status] = getBreedList();

  const {result} = renderHook(() => useBreedList());
  const [breedList, status] = result.current;

  expect(breedList).toHaveLength(0);
  expect(status).toBe("unloaded");
})
