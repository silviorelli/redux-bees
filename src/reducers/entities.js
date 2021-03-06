import immutable from 'object-path-immutable';

const initialState = {};

export default function reducer(state = initialState, action) {
  if (!action.meta || !action.meta.api) {
    return state;
  }

  const { type: metaType } = action.meta;

  if (metaType === 'response' && action.payload) {
    let newState = state;
    const { data, included } = action.payload;

    let items = [];

    if (Array.isArray(data)) {
      items = items.concat(data);
    } else {
      items = items.concat([data]);
    }

    if (Array.isArray(included)) {
      items = items.concat(included);
    }

    newState = items.reduce((acc, item) => (
      immutable.set(
        acc,
        [item.type, item.id],
        item,
      )
    ), newState);

    return newState;
  }

  return state;
}

