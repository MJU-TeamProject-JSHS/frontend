const scrapped = new Set<number>();

export const isScrapped = (id: number) => scrapped.has(id);

export const toggleScrap = (id: number) => {
  scrapped.has(id) ? scrapped.delete(id) : scrapped.add(id);
};

export const getScrappedIds = () => [...scrapped];
