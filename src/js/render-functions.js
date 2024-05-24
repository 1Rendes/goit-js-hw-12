export function renderImages(input) {
  return Array.from({ length: input.hits.length }, (_, index) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.classList.add('gallery-link');
    a.href = input.hits[index].largeImageURL;
    const image = document.createElement('img');
    image.classList.add('gallery-image');
    image.src = input.hits[index].webformatURL;
    image.alt = input.hits[index].tags;
    const textDiv = document.createElement('div');
    textDiv.classList.add('text-div');
    a.appendChild(image);
    a.appendChild(textDiv);
    li.appendChild(a);
    textDiv.innerHTML += `<p><b>Likes</b><br>${input.hits[index].likes}</p><p><b>Views</b><br>${input.hits[index].views}</p><p><b>Comments</b><br>${input.hits[index].comments}</p><p><b>Downloads</b><br>${input.hits[index].downloads}</p>`;
    return li;
  });
}
