module.exports = (existingImages, newImages, indexes) => {
  const ops = {};
  indexes.forEach((idx, i) => {
    if (idx >= 0 && idx < existingImages.length) {
      ops[`images.${idx}`] = newImages[i];
    }
  });
  return ops;
}