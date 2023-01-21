const getNextId = () => idGenerator().next.value;

export default getNextId;

function* idGenerator() {
  for (let i = 1; ; i += 1) {
    yield `id-${i}`;
  }
}
