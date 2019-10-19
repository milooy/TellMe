import forEach from "lodash/forEach";
import reverse from "lodash/fp/reverse";
import flow from "lodash/fp/flow";
import values from "lodash/fp/values";

export const getFilteredPhraseList = (phraseList: Object) => {
  const polishedPhraseList = forEach(
    phraseList,
    (value: Object, key: string) => (value["key"] = key),
  );

  return flow(
    values,
    reverse,
  )(polishedPhraseList);
};
